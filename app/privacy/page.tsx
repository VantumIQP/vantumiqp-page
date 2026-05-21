import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for VantumIQP, including demo requests, analytics, hosting, and contact details.",
  alternates: {
    canonical: "/privacy",
  },
}

const privacySections = [
  {
    title: "Who operates VantumIQP",
    body: [
      "VantumIQP is currently operated by Adnan Crnovršanin as an individual. References to VantumIQP, we, us, or our mean Adnan Crnovršanin in connection with this website and the VantumIQP demo experience.",
      "You can contact us about privacy questions at office@actaer.com.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "When you request demo access, we collect the information you choose to submit, such as your name, work email, company, and the use case or message you provide.",
      "When you visit the website, technical information may be processed automatically, including pages viewed, referrer information, approximate location derived from network data, device type, browser, operating system, timestamps, and basic diagnostic information.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "We use demo request information to respond to you, understand whether VantumIQP is a good fit, provide requested access or follow-up, and keep a practical record of the conversation.",
      "We use technical and analytics information to understand site performance, improve the landing page and demo flow, diagnose issues, and protect the website from misuse.",
    ],
  },
  {
    title: "Formspree",
    body: [
      "The demo request form is submitted through Formspree. Formspree processes the form fields you submit so the request can be delivered and managed.",
      "Do not send confidential, sensitive, or regulated data through the demo request form unless we have agreed in writing to handle that information.",
    ],
  },
  {
    title: "Vercel hosting and Vercel Analytics",
    body: [
      "The website may be hosted on Vercel. Hosting providers process technical data needed to serve the site, secure the service, and maintain logs.",
      "We use or may use Vercel Analytics to understand aggregate website traffic. Vercel describes its Web Analytics as privacy-focused, cookie-free, and based on anonymized or aggregated measurements such as page views, referrers, country, device, browser, and operating system.",
    ],
  },
  {
    title: "Microsoft Clarity",
    body: [
      "We may add Microsoft Clarity to understand how visitors interact with the website. Clarity can process interaction data such as clicks, scrolling, page activity, browser diagnostics, and session playback data.",
      "If Microsoft Clarity is enabled, it may use cookies or similar technologies. Where required by law, we will use an appropriate consent mechanism before enabling non-essential analytics cookies.",
    ],
  },
  {
    title: "Sharing and processors",
    body: [
      "We do not sell your personal information. We share information only with service providers that help us operate the site, process demo requests, provide analytics, host infrastructure, secure the service, or comply with legal obligations.",
      "Current or expected service providers include Formspree, Vercel, and Microsoft Clarity if Clarity is enabled.",
    ],
  },
  {
    title: "Retention",
    body: [
      "We keep demo request information for as long as needed to respond, manage the relationship, improve the product, resolve disputes, or comply with legal obligations.",
      "Analytics and technical records are kept according to the retention settings and limits of the relevant providers, unless we need to preserve information for security or legal reasons.",
    ],
  },
  {
    title: "Your choices and rights",
    body: [
      "Depending on where you live, you may have rights to request access, correction, deletion, restriction, portability, or objection to certain processing of your personal information.",
      "To make a privacy request, contact office@actaer.com. We may need to verify your request before acting on it.",
    ],
  },
  {
    title: "Changes",
    body: [
      "We may update this Privacy Policy as the website, analytics setup, demo process, or legal requirements change. The effective date above shows when this version applies.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This Privacy Policy explains how VantumIQP handles information collected through the website, demo request form, hosting infrastructure, and analytics tools."
      updated="May 21, 2026"
      sections={privacySections}
    />
  )
}
