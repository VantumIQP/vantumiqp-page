import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import { DemoAccessForm } from "./demo-access-form"

describe("DemoAccessForm", () => {
  test("renders a Formspree action fallback and submission metadata", () => {
    const html = renderToStaticMarkup(
      <DemoAccessForm formspreeEndpoint="https://formspree.io/f/demo123" />
    )

    expect(html).toContain('action="https://formspree.io/f/demo123"')
    expect(html).toContain('method="post"')
    expect(html).toContain('name="_subject"')
    expect(html).toContain("New VantumIQP demo request")
    expect(html).toContain('name="source"')
    expect(html).toContain("VantumIQP landing page")
  })
})
