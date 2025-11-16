export type SchemaType =
  | "service"
  | "article"
  | "faq"
  | "organization"
  | "breadcrumbs";

/* ---------- DEFINE TYPES ---------- */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface OrganizationSchemaData {
  name: string;
  url: string;
  logo: string;
  telephone?: string;
  sameAs?: string[];
}

export interface ServiceSchemaData {
  name: string;
  serviceType: string;
  description: string;
  price: string | number;
  url: string;
  areaServed?: string;
}

export interface ArticleSchemaData {
  title: string;
  description: string;
  datePublished: string;
  author?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// Union type untuk data yang dioper ke generateSchema
export type SchemaInputData =
  | OrganizationSchemaData
  | BreadcrumbItem[]
  | ServiceSchemaData
  | ArticleSchemaData
  | FAQItem[];

/* ---------- MAIN GENERATOR ---------- */
export function generateSchema(type: SchemaType, data: SchemaInputData) {
  const siteUrl = "https://penyalurkerja.com";

  switch (type) {
    case "organization": {
      const d = data as OrganizationSchemaData;
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: d.name,
        url: d.url,
        logo: d.logo,
        telephone: d.telephone,
        sameAs: d.sameAs ?? [],
      };
    }

    case "breadcrumbs": {
      const d = data as BreadcrumbItem[];
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: d.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${siteUrl}${c.path}`,
        })),
      };
    }

    case "service": {
      const d = data as ServiceSchemaData;
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: d.name,
        serviceType: d.serviceType,
        description: d.description,
        provider: {
          "@type": "Organization",
          name: "PT Jasa Mandiri",
          url: siteUrl,
        },
        areaServed: {
          "@type": "Place",
          name: d.areaServed ?? "Jakarta dan sekitarnya",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: d.price,
          url: `${siteUrl}${d.url}`,
        },
      };
    }

    case "article": {
      const d = data as ArticleSchemaData;
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: d.title,
        description: d.description,
        datePublished: d.datePublished,
        author: {
          "@type": "Organization",
          name: d.author ?? "PT Jasa Mandiri",
        },
      };
    }

    case "faq": {
      const d = data as FAQItem[];
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: d.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };
    }

    default:
      return null;
  }
}
