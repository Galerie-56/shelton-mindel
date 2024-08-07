import { Link } from '@remix-run/react';
import { SpaceStoryblok } from '~/types';

export const SpaceCard = ({ space }: { space: SpaceStoryblok }) => {
  const { headline, image, full_slug } = space;

  return (
    <div className="relative overflow-hidden">
      <Link to={`/${full_slug}`} className="block h-full">
        <img src={`${image?.filename}/m/1200x800`} alt={image?.alt_text} />
        <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col p-5 uppercase">
          <h2 className="text-xl mb-3">{headline}</h2>
        </div>
      </Link>
    </div>
  );
};
