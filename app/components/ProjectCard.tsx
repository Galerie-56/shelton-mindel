import { Link } from "@remix-run/react";
import { ProjectStoryblok } from "~/types";

export const ProjectCard = ({ project }: { project: ProjectStoryblok }) => {
  const { headline, image, project_code, full_slug, category } = project;

  return (
    <div>
      <Link to={`/${full_slug}`} className="text-black">
        <img src={image?.filename} alt={image?.alt_text} />
        <h2>{headline}</h2>
        <div>{project_code}</div>
        <div>{category?.name}</div>
      </Link>
    </div>
  );
};
