import type { Metadata } from "next"

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantumiqp.com"
).replace(/\/$/, "")

export const siteConfig = {
  name: "VantumIQP",
  url: siteUrl,
  description:
    "VantumIQP is a calm BI workspace for dashboards, SQL exploration, and decision-ready reporting built on Apache Superset.",
  ogImage: "/images/vantumiqp/dashboard-screenshot.png",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VantumIQP | Calm BI workspace for dashboards and SQL",
    template: "%s | VantumIQP",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "VantumIQP",
    "business intelligence workspace",
    "Apache Superset dashboards",
    "SQL exploration",
    "governed dashboards",
    "decision-ready reporting",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VantumIQP | Calm BI workspace for dashboards and SQL",
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "VantumIQP dashboard interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VantumIQP | Calm BI workspace for dashboards and SQL",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export const faqItems = [
  {
    question: "What is VantumIQP?",
    answer:
      "VantumIQP is a BI workspace for dashboards, SQL exploration, and decision-ready reporting. It is built on Apache Superset and shaped for teams that want a calmer path from data questions to shared answers.",
  },
  {
    question: "Who is VantumIQP for?",
    answer:
      "VantumIQP is for teams that need governed dashboards, reusable datasets, SQL exploration, and reporting workflows that business stakeholders can understand quickly.",
  },
  {
    question: "How does VantumIQP use Apache Superset?",
    answer:
      "VantumIQP keeps core Apache Superset strengths such as charts, dashboards, SQL workflows, and dataset exploration, then presents them through a guided landing and demo experience.",
  },
]

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/vantumiqp/vantumiqp_logo.png`,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
      description: "Demo access available by request.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  },
]
