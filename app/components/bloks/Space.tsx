import { useState } from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import { SpaceStoryblok } from '~/types';
import { Link, useLoaderData } from '@remix-run/react';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { LightboxCarousel } from '~/components/LightBoxCarousel';
import { loader } from '~/routes/spaces.$';

export const Space = ({ blok }: { blok: SpaceStoryblok }) => {
  const { landscape_image, images } = blok;
  const { spaceName, prevSpace, nextSpace } = useLoaderData<typeof loader>();
  const [activeIndex, setActiveIndex] = useState(0);
  console.log('images', images);
  return (
    <article {...storyblokEditable(blok)} key={blok._uid} className="">
      <h1>{spaceName}</h1>
      <div className="md:flex gap-20 uppercase justify-between">
        {nextSpace && (
          <div>
            <h4 className="text-[12px]">Next</h4>
            <Link
              prefetch="intent"
              to={`/${nextSpace?.full_slug}`}
              className="uppercase"
            >
              {nextSpace?.headline}
            </Link>
          </div>
        )}
        {prevSpace && (
          <div>
            <h4 className="text-[12px]">Previous</h4>
            <Link
              prefetch="intent"
              to={`/${prevSpace?.full_slug}`}
              className="uppercase"
            >
              {prevSpace?.headline}
            </Link>
          </div>
        )}
        <div>
          <h4 className="text-[12px]">View all</h4>
          <Link to="/spaces" prefetch="intent" className="uppercase">
            spaces
          </Link>
        </div>
      </div>

      <div className="mt-7">
        <Dialog>
          <DialogTrigger asChild>
            <a
              onClick={() => setActiveIndex(0)}
              className="block cursor-pointer"
            >
              <img
                src={`${landscape_image?.filename}/m/1600x0`}
                alt={landscape_image?.alt}
                className="w-full hover:opacity-60 transition duration-300"
              />
            </a>
          </DialogTrigger>
          <DialogContent className="!w-full h-full flex-col justify-center items-center border-none shadow-none">
            <LightboxCarousel
              images={images}
              startIndex={activeIndex}
              location="space"
            />
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 md:gap-4 gap-2 mt-4">
          {images?.map((image, index) => (
            <Dialog key={image._uid}>
              <DialogTrigger asChild>
                <a
                  onClick={() => setActiveIndex(index + 1)}
                  className="block aspect-square cursor-pointer"
                >
                  <img
                    src={`${image.image?.filename}/m/300x300`}
                    alt={image.image?.alt}
                    className="w-full h-full object-cover hover:opacity-60 transition duration-300"
                  />
                </a>
              </DialogTrigger>
              <DialogContent className="!w-full h-full flex-col justify-center items-center border-none shadow-none">
                <LightboxCarousel
                  images={images}
                  startIndex={index + 1}
                  location="space"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </article>
  );
};
