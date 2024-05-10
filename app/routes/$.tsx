import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

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
      console.log("e", e);
      return { data: null };
    });

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ story: data?.story });
};
export default function Page() {
  const data = useLoaderData<typeof loader>();

  const story = useStoryblokState(data.story);
  return (
    <>
      <StoryblokComponent blok={story?.content} />
    </>
  );
}
