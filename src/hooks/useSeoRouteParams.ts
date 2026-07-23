import { useLocation, useParams } from "react-router-dom";
import { SEO_CATEGORY_SLUGS } from "@/seo/categories";

/**
 * Resolves SEO category + second segment from route props and/or URL.
 * Routes are defined as `/jcb/:district` (category not in useParams),
 * so we fall back to the first path segment.
 */
export function useSeoRouteParams(categoryProp?: string) {
  const params = useParams<{ category?: string; district?: string }>();
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  const fromPath = parts[0] && SEO_CATEGORY_SLUGS.includes(parts[0]) ? parts[0] : undefined;
  const category = categoryProp || params.category || fromPath;
  const district = params.district || parts[1];

  return { category, district, pathname };
}
