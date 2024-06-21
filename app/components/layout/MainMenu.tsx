import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useLoaderData } from "@remix-run/react";
import type { NavItemStoryblok } from "~/types";
import { type loader } from "~/root";

export const MainMenu = () => {
  let { headerNav: nav } = useLoaderData<typeof loader>();

  return (
    <nav
      className="menu hidden lg:block"
      aria-label="main"
      {...storyblokEditable(nav)}
    >
      <ul role="menu" className="flex">
        {nav.map((nestedBlok: NavItemStoryblok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </ul>
    </nav>
  );
};
