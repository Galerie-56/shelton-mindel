import type { ProjectStoryblok, ProductStoryblok } from "~/types";
export function getProjectCardData(p: ProjectStoryblok) {
  return {
    id: p.id,
    headline: p.content.headline,
    full_slug: p.full_slug,
    image: p.content.slideshow[0],
    category: p.content.category,
    project_code: p.content.project_code,
  };
}

export function getProductCardData(p: ProductStoryblok) {
  return {
    id: p.id,
    headline: p.content.headline,
    subtitle: p.content.subtitle,
    full_slug: p.full_slug,
    image: p.content.image,
  };
}
