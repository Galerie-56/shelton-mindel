import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { PublicationStoryblok, PublicationsStoryblok } from "~/types";

export const Publications = ({ blok }: PublicationsStoryblok) => {
  const { items, _uid, book_cover, purchase_link } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <div>
        {items.map((nestedBlok: PublicationStoryblok) => (
          <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
        ))}
      </div>
      <div>
        <a href={purchase_link} target="_blank" rel="noopener noreferrer">
          <img src={`${book_cover.filename}/m/352x0/`} alt={book_cover.alt} />
        </a>
        <div>
          <button>
            <a href={purchase_link} target="_blank" rel="noopener noreferrer">
              Purchase
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};
