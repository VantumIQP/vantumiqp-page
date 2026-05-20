import { describe, expect, test } from "bun:test"

import {
  type FormspreeFetcher,
  resolveFormspreeEndpoint,
  submitFormspreeRequest,
} from "./formspree"

describe("Formspree integration", () => {
  test("prefers an explicit endpoint over a form id", () => {
    expect(
      resolveFormspreeEndpoint({
        endpoint: " https://formspree.io/f/explicit ",
        formId: "fallback",
      })
    ).toBe("https://formspree.io/f/explicit")
  })

  test("builds a Formspree endpoint from a form id", () => {
    expect(resolveFormspreeEndpoint({ formId: " demo123 " })).toBe(
      "https://formspree.io/f/demo123"
    )
  })

  test("posts FormData to Formspree with a JSON response preference", async () => {
    const formData = new FormData()
    formData.set("email", "ada@company.com")

    let requestedInput: Parameters<FormspreeFetcher>[0] | undefined
    let requestedInit: Parameters<FormspreeFetcher>[1] | undefined

    const fetcher: FormspreeFetcher = async (input, init) => {
      requestedInput = input
      requestedInit = init

      return new Response("{}", { status: 200 })
    }

    await submitFormspreeRequest({
      endpoint: "https://formspree.io/f/demo123",
      formData,
      fetcher,
    })

    expect(requestedInput).toBe("https://formspree.io/f/demo123")
    expect(requestedInit?.method).toBe("POST")
    expect(requestedInit?.headers).toEqual({ Accept: "application/json" })
    expect(requestedInit?.body).toBe(formData)
  })

  test("throws the first Formspree error message when the submission fails", async () => {
    const fetcher: FormspreeFetcher = async () =>
      new Response(
        JSON.stringify({
          errors: [{ message: "Email is required" }],
        }),
        { status: 422 }
      )

    await expect(
      submitFormspreeRequest({
        endpoint: "https://formspree.io/f/demo123",
        formData: new FormData(),
        fetcher,
      })
    ).rejects.toThrow("Email is required")
  })
})
