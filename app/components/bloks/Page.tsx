import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { PageStoryblok } from "~/types";

export const Page = ({ blok }: { blok: PageStoryblok }) => {
  const { body, _uid, headline } = blok;
  console.log("body", body);

  return (
    <div key={_uid} {...storyblokEditable(blok)}>
      <h1> {headline}</h1>
      {body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
