import { storyblokEditable } from "@storyblok/react";
import type { AwardStoryblok } from "~/types";

export const Award = ({ blok }: AwardStoryblok) => {
  const { _uid, title, year, link, thumbnail, description } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <div>{year}</div>
      <div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={`${thumbnail.filename}/m/228x114/`} alt={thumbnail.alt} />
        </a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div>{title}</div>
      </a>
    </div>
  );
};
