import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["*"] ?? "home";

  let sbParams = {
    version: "draft",
  };

  const sbApi = getStoryblokApi();
  let { data } = await sbApi
    .get(`cdn/stories/${slug}`, sbParams)
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
  let { story } = useLoaderData();
  story = useStoryblokState(story);

  return (
    <>
      <StoryblokComponent blok={story.content} />
    </>
  );
}
