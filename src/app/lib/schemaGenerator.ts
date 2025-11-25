export type SchemaType =
  | "service"
  | "article"
  | "faq"
  | "organization"
  | "breadcrumbs";

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

// Union type untuk semua kemungkinan data masukan
export type SchemaInputData =
  | OrganizationData
  | BreadcrumbItem[]
  | ServiceData
  | ArticleData
  | FAQItem[];

/* ---------- GENERATOR UTAMA ---------- */

// Ganti 'any' dengan union type yang lebih spesifik
export function generateSchema(type: SchemaType, data: SchemaInputData) {
  const siteUrl = "https://penyalurkerja.com"; // Base URL

  switch (type) {
    case "organization":
      data = data as OrganizationData;
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: data.name,
        url: data.url,
        logo: data.logo,
        telephone: data.telephone,
        sameAs: data.sameAs ?? [],
      };

    case "breadcrumbs":
      data = data as BreadcrumbItem[];
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.map((c: BreadcrumbItem, i: number) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${siteUrl}${c.path}`,
        })),
      };
    
    case "service":
      data = data as ServiceData;
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: data.name,
        serviceType: data.serviceType,
        provider: {
          "@type": "Organization",
          name: "PT Jasa Mandiri Agency",
          url: siteUrl,
        },
        areaServed: {
          "@type": "Place",
          name: data.areaServed ?? "Jakarta dan sekitarnya",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: data.price,
          url: `${siteUrl}${data.url}`,
        },
        description: data.description,
      };

    case "article":
      data = data as ArticleData;
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        datePublished: data.datePublished,
        author: {
          "@type": "Organization",
          name: data.author ?? "PT Jasa Mandiri Agency",
        },
      };

    case "faq":
      data = data as FAQItem[];
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.map((item: FAQItem) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };

    default:
      return null;
  }
}