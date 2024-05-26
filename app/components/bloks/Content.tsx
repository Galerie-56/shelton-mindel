import { storyblokEditable, renderRichText } from "@storyblok/react";
import type { ContentStoryblok } from "~/types";

export const Content = ({ blok }: { blok: ContentStoryblok }) => {
  const { _uid, text, image } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <div dangerouslySetInnerHTML={{ __html: renderRichText(text) }} />
      <div>
        <img
          src={`${image.filename}/m/600x0/filters:quality(80)`}
          alt={image.alt}
        />
      </div>
    </div>
  );
};
