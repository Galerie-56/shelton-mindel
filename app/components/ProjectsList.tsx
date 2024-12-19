import { useState, useEffect } from 'react';
import { getStoryblokApi } from '@storyblok/react';
import { useMatches } from '@remix-run/react';
import type { ProjectStoryblok } from '~/types';
import { getProjectCardData } from '~/lib';
import { ProjectCard } from './ProjectCard';

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

  const [projects, setProjects] = useState<ProjectStoryblok[]>([]);

  // Reset projects when uuid changes or when initial projects change
  useEffect(() => {
    setProjects(firstsProjects || []);
    setCurrentPage(1);
  }, [uuid, firstsProjects]);

  interface GlobalData {
    perPage: number;
  }

  const sbApi = getStoryblokApi();
  const resolveRelations = ['project.category'];
  const perPage = (globalData as GlobalData)?.perPage;

  const fetchProjects = async (page: number, categoryUuid?: string) => {
    const params: any = {
      version: 'draft',
      starts_with: 'projects/',
      per_page: perPage,
      page,
      is_startpage: false,
      resolve_relations: resolveRelations,
      sort_by: 'content.project_code:asc',
    };

    if (categoryUuid) {
      params.filter_query = {
        category: {
          in: categoryUuid,
        },
      };
    }

    const { data: projects } = await sbApi.get(`cdn/stories`, params);

    const nextProjects = projects.stories.map((p: ProjectStoryblok) =>
      getProjectCardData(p)
    );

    setProjects((prevProjects) => [...prevProjects, ...nextProjects]);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProjects(nextPage, uuid);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects?.map((project: ProjectStoryblok) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {total && projects.length < total && (
        <div className="flex justify-center mt-4">
          <button className="button py-4 px-7" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
