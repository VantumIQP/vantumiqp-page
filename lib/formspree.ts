type FormspreeEndpointConfig = {
  endpoint?: string
  formId?: string
}

export type FormspreeFetcher = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>

type SubmitFormspreeRequestArgs = {
  endpoint: string
  formData: FormData
  fetcher?: FormspreeFetcher
}

type FormspreeErrorPayload = {
  error?: string
  errors?: Array<{
    message?: string
  }>
}

const FORMSPREE_BASE_URL = "https://formspree.io/f"
const FALLBACK_ERROR_MESSAGE =
  "We could not send your request. Please try again."

export function resolveFormspreeEndpoint({
  endpoint,
  formId,
}: FormspreeEndpointConfig = {}) {
  const normalizedEndpoint = endpoint?.trim()

  if (normalizedEndpoint) {
    return normalizedEndpoint
  }

  const normalizedFormId = formId?.trim()

  if (!normalizedFormId) {
    return ""
  }

  return `${FORMSPREE_BASE_URL}/${normalizedFormId}`
}

export async function submitFormspreeRequest({
  endpoint,
  formData,
  fetcher = fetch,
}: SubmitFormspreeRequestArgs) {
  const normalizedEndpoint = endpoint.trim()

  if (!normalizedEndpoint) {
    throw new Error("Demo request form is not configured yet.")
  }

  const response = await fetcher(normalizedEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  })

  if (response.ok) {
    return
  }

  throw new Error(await getFormspreeErrorMessage(response))
}

async function getFormspreeErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as FormspreeErrorPayload
    const fieldError = payload.errors?.find((error) => error.message)?.message

    return fieldError ?? payload.error ?? FALLBACK_ERROR_MESSAGE
  } catch {
    return FALLBACK_ERROR_MESSAGE
  }
}
