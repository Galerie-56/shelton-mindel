import { storyblokEditable } from "@storyblok/react";
import { SlideshowStoryblok } from "~/types";
import { SlideShow } from "../SlideShow";
import { Link } from "@remix-run/react";

const HomeSlideShow = ({ blok }: { blok: SlideshowStoryblok }) => {
  const { images, _uid } = blok;
  return (
    <Link to="/projects" {...storyblokEditable(blok)} key={_uid}>
      <h1>Hello</h1>
      <SlideShow images={images} />
    </Link>
  );
};

export default HomeSlideShow;
