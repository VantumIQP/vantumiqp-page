import type { Metadata } from "next"

import { LegalPage } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for using the VantumIQP website and requesting demo access.",
  alternates: {
    canonical: "/terms",
  },
}

const termsSections = [
  {
    title: "Operator",
    body: [
      "These Terms and Conditions apply to the VantumIQP website and demo access process. VantumIQP is currently operated by Adnan Crnovršanin as an individual.",
      "Questions about these terms can be sent to office@actaer.com.",
    ],
  },
  {
    title: "Use of the website",
    body: [
      "You may use the website to learn about VantumIQP and request demo access. You agree to use the website only for lawful purposes and in a way that does not interfere with its operation or security.",
      "You may not attempt to disrupt the website, probe it for vulnerabilities, submit malicious content, scrape it in an abusive way, or misrepresent your identity when requesting demo access.",
    ],
  },
  {
    title: "Demo access",
    body: [
      "Submitting a request does not guarantee access, availability, support, custom implementation, or a commercial relationship. We may accept, decline, delay, or stop demo access at our discretion.",
      "If demo access is provided, it is intended for evaluation only unless a separate written agreement says otherwise.",
    ],
  },
  {
    title: "No professional advice",
    body: [
      "The website and demo materials are provided for general product information. They are not legal, financial, security, tax, or professional advice.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The VantumIQP name, website content, product materials, design, copy, screenshots, and related assets are owned by or licensed to Adnan Crnovršanin unless otherwise stated.",
      "You may not copy, modify, distribute, or use those materials for commercial purposes without permission, except where allowed by law.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "The website and demo flow may rely on third-party services, including hosting, analytics, form handling, email, and infrastructure providers. These third-party services are governed by their own terms and policies.",
      "We are not responsible for third-party services that we do not control, but we choose providers to support the website and demo process.",
    ],
  },
  {
    title: "Availability and changes",
    body: [
      "The website is provided on an as-available basis. We may update, suspend, remove, or change any part of the website, product description, demo process, or these terms without prior notice.",
    ],
  },
  {
    title: "Disclaimers",
    body: [
      "To the maximum extent allowed by law, the website and any demo materials are provided without warranties of any kind, whether express, implied, or statutory.",
      "We do not promise that the website will be uninterrupted, error-free, secure, or suitable for your specific requirements.",
    ],
  },
  {
    title: "Liability",
    body: [
      "To the maximum extent allowed by law, Adnan Crnovršanin will not be liable for indirect, incidental, special, consequential, punitive, or loss-of-profit damages arising from your use of the website or demo process.",
      "Nothing in these terms limits liability that cannot legally be limited.",
    ],
  },
  {
    title: "Governing terms",
    body: [
      "If a separate written agreement is signed for VantumIQP, that agreement controls over these website terms for the subject it covers.",
      "If any part of these terms is found invalid or unenforceable, the remaining parts will continue to apply.",
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      description="These Terms and Conditions explain the basic rules for using the VantumIQP website and requesting demo access."
      updated="May 21, 2026"
      sections={termsSections}
    />
  )
}
