import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { ProfileStoryblok, ProfilesStoryblok } from "~/types";

export const Profiles = ({ blok }: ProfilesStoryblok) => {
  let { items, title, _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <h2>{title}</h2>
      {items.map((nestedBlok: ProfileStoryblok) => (
        <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
      ))}
    </div>
  );
};
