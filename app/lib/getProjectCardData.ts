import type { ProjectStoryblok } from "~/types";
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
