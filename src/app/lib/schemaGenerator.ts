export type SchemaType =
  | "service"
  | "article"
  | "faq"
  | "organization"
  | "breadcrumbs"
  | "jobPosting";

/* ---------- DEFINISI TIPE UNTUK DATA MASUKAN ---------- */

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  telephone?: string;
  sameAs?: string[];
}

interface ServiceData {
  name: string;
  serviceType: string;
  description: string;
  price: string | number;
  url: string;
  areaServed?: string;
}

interface ArticleData {
  title: string;
  description: string;
  datePublished: string; // ISO 8601 format
  author?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface JobPostingData {
  title: string;
  description: string;
  datePosted?: string;
  validThrough?: string;
  employmentType?: string;
  hiringOrganizationName?: string;
  sameAs?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  minValue?: number;
  maxValue?: number;
  currency?: string;
  unitText?: string;
  status?: string;
  isEvergreen?: boolean;
}

// Union type untuk semua kemungkinan data masukan
export type SchemaInputData =
  | OrganizationData
  | BreadcrumbItem[]
  | ServiceData
  | ArticleData
  | FAQItem[]
  | JobPostingData;

/* ---------- GENERATOR UTAMA ---------- */

export function generateSchema(type: SchemaType, data: SchemaInputData) {
  const siteUrl = "https://penyalurkerja.com"; // Base URL

  switch (type) {
    case "organization": {
      const org = data as OrganizationData;
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: org.name,
        url: org.url,
        logo: org.logo,
        telephone: org.telephone,
        sameAs: org.sameAs ?? [],
      };
    }

    case "breadcrumbs": {
      const breadcrumbs = data as BreadcrumbItem[];
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((c: BreadcrumbItem, i: number) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${siteUrl}${c.path}`,
        })),
      };
    }
    
    case "service": {
      const service = data as ServiceData;
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        serviceType: service.serviceType,
        provider: {
          "@type": "Organization",
          name: "PT Jasa Mandiri Agency",
          url: siteUrl,
        },
        areaServed: {
          "@type": "Place",
          name: service.areaServed ?? "Jakarta dan sekitarnya",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: service.price,
          url: `${siteUrl}${service.url}`,
        },
        description: service.description,
      };
    }

    case "article": {
      const article = data as ArticleData;
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.datePublished,
        author: {
          "@type": "Organization",
          name: article.author ?? "PT Jasa Mandiri Agency",
        },
      };
    }

    case "faq": {
      const faq = data as FAQItem[];
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item: FAQItem) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };
    }

    case "jobPosting": {
      const job = data as JobPostingData;
      // DILARANG menyajikan schema JobPosting jika status lowongan 'Tutup' untuk mencegah penalti Spam Google Jobs
      if (job.status && job.status.toLowerCase() === 'tutup') {
        return null;
      }

      // Hitung rolling validThrough untuk lowongan evergreen (default: 60 hari ke depan)
      const now = new Date();
      let validThroughDate = job.validThrough;
      if (job.isEvergreen !== false || !validThroughDate) {
        const futureDate = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
        validThroughDate = futureDate.toISOString().split('T')[0];
      }

      const datePostedStr = job.datePosted 
        ? new Date(job.datePosted).toISOString().split('T')[0] 
        : now.toISOString().split('T')[0];

      return {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.description,
        hiringOrganization: {
          "@type": "Organization",
          name: job.hiringOrganizationName || "PT Jasa Mandiri Agency",
          sameAs: job.sameAs || siteUrl
        },
        employmentType: job.employmentType || "FULL_TIME",
        datePosted: datePostedStr,
        validThrough: validThroughDate,
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            streetAddress: job.streetAddress || "Jl. Gunung Balong III No. 78, Lebak Bulus, Cilandak",
            addressLocality: job.addressLocality || "Jakarta Selatan",
            addressRegion: job.addressRegion || "DKI Jakarta",
            postalCode: job.postalCode || "12440",
            addressCountry: job.addressCountry || "ID"
          }
        },
        baseSalary: (job.minValue || job.maxValue) ? {
          "@type": "MonetaryAmount",
          currency: job.currency || "IDR",
          value: {
            "@type": "QuantitativeValue",
            minValue: job.minValue || 2500000,
            maxValue: job.maxValue || 5000000,
            unitText: job.unitText || "MONTH"
          }
        } : undefined
      };
    }

    default:
      return null;
  }
}