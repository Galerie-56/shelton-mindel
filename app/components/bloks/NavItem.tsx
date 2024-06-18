import { NavLink } from "@remix-run/react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { NavItemStoryblok } from "~/types";
import Collapse from "~/components/Collapse";



export const NavItem = ({ blok }: NavItemStoryblok) => {
  const { label, link, sub_menu, _uid, is_submenu } = blok;

  const hasSubmenu = sub_menu && sub_menu.length > 0;


const SubMenu = ({ mobile }: { mobile: boolean }) => {
  if (mobile) {
    return (
      <Collapse trigger={label} className="sub-menu-collapse">
        <ul className="sub-menu max-w-[180px]">
          {sub_menu.map((nestedBlok: NavItemStoryblok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </ul>
      </Collapse>
    );
  } else {
    return (
      <ul className="sub-menu max-w-[180px]">
        {sub_menu.map((nestedBlok: NavItemStoryblok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </ul>
    );
  }
};
  return (
    <>
      {link.linktype === "story" ? (
        <NavLink
          key={_uid}
          prefetch="intent"
          to={`/${link?.cached_url}`}
          {...storyblokEditable(blok)}
          className={`menu-item ${is_submenu && "sub-menu-item"}`}
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
