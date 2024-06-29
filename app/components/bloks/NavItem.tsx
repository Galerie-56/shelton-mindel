import { NavLink } from "@remix-run/react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import type { NavItemStoryblok } from "~/types";
import { FaCaretDown } from "react-icons/fa";
import { Collapsible } from "~/components/Collapse";

export const NavItem = ({ blok, mobile }: NavItemStoryblok) => {
  const { label, link, sub_menu, _uid, is_submenu } = blok;
  const hasSubmenu = sub_menu && sub_menu.length > 0;

  const SubMenu = ({ mobile }: { mobile: boolean }) => {
    if (mobile) {
      return (
        <Collapsible trigger={label} className="font-semibold text-primary ">
          <ul className="sub-menu max-w-[180px] text-lg ml-3 space-y- 1 mobile-sub-menu">
            {sub_menu.map((nestedBlok: NavItemStoryblok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </ul>
        </Collapsible>
      );
    } else {
      return (
        <ul className="sub-menu absolute opacity-0 left-0  group-hover:block group-hover:opacity-100  bg-white mt-3 transition-all duration-500 -translate-y-[10px] group-hover:-translate-y-[0px] text-sm border border-gray-300 p-2 z-50">
          {sub_menu.map((nestedBlok: NavItemStoryblok) => (
            <li key={nestedBlok._uid} className="mb-2 text-sm leading-tight ">
              <StoryblokComponent blok={nestedBlok} />
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      {link.linktype === "story" ? (
        <li
          {...storyblokEditable(blok)}
          key={_uid}
          className={`menu-item ${hasSubmenu ? "relative group" : ""} ${
            is_submenu !== true ? "not-sub-menu" : "is-sub-menu"
          } ${mobile ? "mb-2" : ""}`}
        >
          {hasSubmenu && mobile ? (
            <SubMenu mobile={mobile} />
          ) : (
            <NavLink
              prefetch="intent"
              to={link.cached_url}
              className={`inline-flex items-center hover:text-black ${
                hasSubmenu ? "" : ""
              }`}
            >
              {label}
              {hasSubmenu && <FaCaretDown className="ml-1" />}
            </NavLink>
          )}
          {hasSubmenu && !mobile && <SubMenu mobile={mobile} />}
        </li>
      ) : (
        <li className={`menu-item`} key={_uid} {...storyblokEditable(blok)}>
          <a
            href={link.url}
            target={link.target}
            className="inline-flex items-center hover:text-black"
          >
            {label}
          </a>
        </li>
      )}
    </>
  );
};
