import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";
import { getPerPage, getProjectCardData, getTotal } from "~/lib";
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
      console.log("e", e);
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

  return json({ story: data?.story, total, projects, perPage });
};

const ProjectsPage = () => {
  const data = useLoaderData<typeof loader>();
  const story = useStoryblokState(data.story);
  return <StoryblokComponent blok={story?.content} />;
};

export default ProjectsPage;
