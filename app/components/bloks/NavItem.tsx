import { NavLink } from "@remix-run/react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { NavItemStoryblok } from "~/types";

export const NavItem = ({ blok }: NavItemStoryblok) => {
  const { label, link, sub_menu, _uid, isSubmenu } = blok;

  const hasSubmenu = sub_menu && sub_menu.length > 0;
  return (
    <>
      {link.linktype === "story" ? (
        <NavLink
          key={_uid}
          prefetch="intent"
          to={`/${link.cached_url}`}
          {...storyblokEditable(blok)}
          className="menu-item"
        >
          {label}
        </NavLink>
      ) : (
        <a
          key={_uid}
          href={link.url}
          target={link.target}
          {...storyblokEditable(blok)}
          className="menu-item"
        >
          {label}
        </a>
      )}
    </>
  );
};
