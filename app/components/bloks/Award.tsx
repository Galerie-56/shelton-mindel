import { storyblokEditable } from "@storyblok/react";
import type { AwardStoryblok } from "~/types";

export const Award = ({ blok }: AwardStoryblok) => {
  const { _uid, title, year, link, thumbnail, description } = blok;

  return (
    <div
      {...storyblokEditable(blok)}
      key={_uid}
      className="flex flex-col md:flex-row justify-between items-start border-t border-gray-300 py-4"
    >
      {year ? (
        <div className="text-sm mb-2 md:mb-0 md:w-1/6">{year}</div>
      ) : (
        <div className="w-1/6" />
      )}
      <div className="mb-2 md:mb-0 md:w-1/6 md:mr-20">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={`${thumbnail.filename}/m/166x0/`}
            alt={thumbnail.alt}
            className="w-full h-auto"
          />
        </a>
      </div>
      <div className="md:w-4/6">
        <a
          href={link.cached_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          {title}
        </a>
        <div
          className="mt-2 text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};
