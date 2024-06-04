import { useMatches } from "@remix-run/react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export const useStoryblokData = (
  route: string,
  resolveRelations: string[] = []
) => {
  const matches = useMatches();
  const { data } = matches?.find((m) => m?.id === `routes/${route}`) ?? {};

  const story = useStoryblokState(data.story, {
    resolveRelations,
  });

  return <StoryblokComponent blok={story?.content} />;
};
