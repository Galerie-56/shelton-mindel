import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { getStoryblokApi } from "@storyblok/react";
import { getPerPage, getProjectCardData, getTotal } from "~/lib";
import { useStoryblokData } from "~/lib";
import { ProjectStoryblok } from "~/types";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";
  const resolveRelations = ["project.category"];

  const sbApi = getStoryblokApi();
  let { data }: { data: any } = await sbApi
    .get(`cdn/stories/projects/${slug}`, {
      version: "draft",
    })
    .catch((e) => {
      return { data: null };
    });

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  const page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);
  const perPage = await getPerPage(sbApi);
  const { data: projectsData } = await sbApi.get(`cdn/stories`, {
    //all posts data for the Blog page
    version: "draft",
    starts_with: "projects/",
    per_page: perPage,
    page,
    is_startpage: false,
    resolve_relations: resolveRelations,
  });

  const total = await getTotal();
  const projects = projectsData.stories.map((p: ProjectStoryblok) =>
    getProjectCardData(p)
  );

  // Find current project index
  const currentIndex = projects.findIndex(p => p.id === data.story.id);

  // Determine previous and next projects
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  console.log("prevProject", prevProject);
  console.log("nextProject", nextProject);


  return json({ story: data?.story, total, projects, perPage, projectName: data?.story?.name, prevProject,
    nextProject });
};

const ProjectsPage = () => useStoryblokData("projects.$", ["project.category"]);

export default ProjectsPage;
