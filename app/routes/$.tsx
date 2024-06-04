import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { getStoryblokApi } from "@storyblok/react";
import { useStoryblokData } from "~/lib/useStoryblokData";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";

  const sbApi = getStoryblokApi();
  let { data }: { data: any } = await sbApi
    .get(`cdn/stories/${slug}`, {
      version: "draft",
    })
    .catch((e) => {
      // console.log("e", e);
      return { data: null };
    });

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ story: data?.story });
};
export default function Page() {
  const params = useParams();
  const routeFile = params["*"] === undefined ? "_index" : "$";
  return useStoryblokData(routeFile);
}
