import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"

import BlogPage, { metadata } from "./page"

describe("blog index page", () => {
  test("renders starter posts and a demo access CTA", async () => {
    const html = renderToStaticMarkup(await BlogPage())

    expect(html).toContain("VantumIQP Blog")
    expect(html).toContain("Why Teams Outgrow Screenshot Reporting")
    expect(html).toContain("What Apache Superset Gives a Modern BI Workspace")
    expect(html).toContain("Governed Dashboards Without Slowing Analysts Down")
    expect(html).toContain('href="/#demo"')
  })

  test("defines blog index metadata", () => {
    expect(metadata.title).toEqual({ absolute: "Blog | VantumIQP" })
    expect(metadata.description).toContain("business intelligence")
    expect(metadata.alternates?.canonical).toBe("/blog")
  })
})
