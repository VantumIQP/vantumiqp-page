export const SITE_NAME = "VantumIQP"
export const SITE_URL = "https://vantumiqp.com"
export const SITE_DESCRIPTION =
  "A calm BI workspace for dashboards, SQL exploration, and decision-ready reporting built on Apache Superset."

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString()
}
