import { storyblokEditable } from "@storyblok/react";
import { ArchitectEyeStoryblok } from "~/types";

export const ArchitectEye = ({ blok }: ArchitectEyeStoryblok) => {
  const { _uid, date, image, description, link, title } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <div>{date}</div>
      <div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={`${image.filename}/m/166x0/`} alt={image.alt} />
        </a>
      </div>
      <div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};
