import { storyblokEditable } from "@storyblok/react";
import { PublicationStoryblok } from "~/types";

export const Publication = ({ blok }: PublicationStoryblok) => {
  const { _uid, title, thumbnail, author, year, url } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <div>{year}</div>
      <div>
        <img src={`${thumbnail.filename}/m/166x0/`} alt={thumbnail.alt} />
      </div>
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
        <br />
        <div>by {author}</div>
      </div>
    </div>
  );
};
