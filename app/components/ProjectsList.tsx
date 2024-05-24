import { useState } from "react";
import { getStoryblokApi } from "@storyblok/react";
import { useMatches } from "@remix-run/react";
import type { ProjectStoryblok } from "~/types";
import { getProjectCardData } from "~/lib";
import { ProjectCard } from "./ProjectCard";

interface RouteData {
  total: number;
  projects: ProjectStoryblok[];
}

interface ProjectsListType {
  uuid?: string;
}

export const ProjectsList = ({ uuid }: ProjectsListType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const matches = useMatches();
  const globalData = matches[0].data;
  const { total, projects: firstsProjects } = matches[1].data as RouteData;
  const [projects, setProjects] = useState(firstsProjects);

  interface GlobalData {
    perPage: number;
  }

  const sbApi = getStoryblokApi();
  const resolveRelations = ["project.category"];

  const perPage = (globalData as GlobalData)?.perPage;

  const fetchProjects = async (page: number, uuid: string) => {
    const { data: projects } = await sbApi.get(`cdn/stories`, {
      version: "draft",
      starts_with: "projects/",
      per_page: perPage,
      page,
      is_startpage: false,
      resolve_relations: resolveRelations,
      search_term: uuid,
    });

    const nextProjects = projects.stories.map((p: ProjectStoryblok) =>
      getProjectCardData(p)
    );

    setProjects((prevProjects: ProjectStoryblok[]) => [
      ...prevProjects,
      ...nextProjects,
    ]);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProjects(nextPage, uuid || "");
  };
  return (
    <div>
      {projects.map((project: ProjectStoryblok) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {total && projects.length < total && (
        <div className="">
          <button className="button mx-auto py-4 px-7" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};