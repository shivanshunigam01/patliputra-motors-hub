const API_BASE = "https://api.patliputragroup.com";

export function getImageUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE}/${url}`;
}
