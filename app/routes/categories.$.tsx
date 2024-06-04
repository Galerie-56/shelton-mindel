import { GeneralErrorBoundary } from "~/components/GeneralErrorBoundary";
import { NotFoundPage } from "~/components/NotFoundPage";
import {
  json,
  type HeadersFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { getStoryblokApi } from "@storyblok/react";
import type { ProjectStoryblok } from "~/types";
import {
  getPerPage,
  getProjectCardData,
  getTotal,
  invariantResponse,
  cacheControl,
  useStoryblokData,
} from "~/lib";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params["*"] ?? "home";
  const sbApi = getStoryblokApi();
  const resolveRelations = ["project.category"];

  const { data } = await sbApi
    .get(`cdn/stories/categories/${slug}`, {
      version: "draft",
    })
    .catch((e) => {
      //   console.log("e", e);
      return { data: null };
    });
  invariantResponse(data, `there is no page with slug ${slug}`, {
    status: 404,
  });

  const story = data?.story;

  //   const seo = story?.content?.seo[0];

  const page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);

  const perPage = await getPerPage(sbApi);
  const { uuid } = story;

  const { data: postsByContentType } = await sbApi.get(`cdn/stories/`, {
    version: "draft",
    starts_with: "projects/",
    is_startpage: false,
    per_page: perPage,
    page,
    resolve_relations: resolveRelations,
    search_term: uuid,
  });

  const total = await getTotal(uuid);

  const headers = {
    ...cacheControl,
  };

  const projects = postsByContentType?.stories.map((p: ProjectStoryblok) =>
    getProjectCardData(p)
  );
  console.log("projects", projects);

  return json(
    {
      story,
      uuid: uuid,
      name: story.name,
      projects,
      perPage,
      total,
    },
    { headers }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { "Cache-Control": loaderHeaders.get("Cache-Control") };
};

const CategoryPage = () =>
  useStoryblokData("categories.$", ["project.category"]);

export default CategoryPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
