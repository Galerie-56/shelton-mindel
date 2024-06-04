import { storyblokEditable } from "@storyblok/react";
import { SlideshowStoryblok } from "~/types";
import { SlideShow } from "../SlideShow";
import { Link } from "@remix-run/react";

export const HomeSlideShow = ({ blok }: { blok: SlideshowStoryblok }) => {
  const { images, _uid } = blok;
  return (
    <div className="container h-[763px]">
      <Link to="/projects" {...storyblokEditable(blok)} key={_uid}>
        <SlideShow images={images} className="h-[763px]" size="1220x763" />
      </Link>
    </div>
  );
};
