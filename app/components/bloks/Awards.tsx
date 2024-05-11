import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { AwardStoryblok, AwardsStoryblok } from "~/types";

export const Awards = ({ blok }: AwardsStoryblok) => {
  let { items, _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      {items.map((nestedBlok: AwardStoryblok) => (
        <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
      ))}
    </div>
  );
};
