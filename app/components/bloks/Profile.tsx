import { storyblokEditable } from "@storyblok/react";
import type { ProfileStoryblok } from "~/types";
import { renderRichText } from "@storyblok/react";

export const Profile = ({ blok }: ProfileStoryblok) => {
  const { _uid, description, photo } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <div dangerouslySetInnerHTML={{ __html: renderRichText(description) }} />
      <div>
        <img
          src={`${photo.filename}/m/197x197/filters:quality(80)`}
          alt={photo.alt}
        />
      </div>
    </div>
  );
};
