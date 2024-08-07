import { Link } from '@remix-run/react';
import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';

export const LightboxCarousel = ({
  images,
  startIndex,
  location = 'product',
}) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  useEffect(() => {
    setActiveIndex(startIndex);
  }, [startIndex]);

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'center',
        containScroll: false,
        startIndex: activeIndex,
      }}
    >
      <CarouselContent>
        {images.map((item) => {
          console.log('item', item); // Log the item
          return (
            <CarouselItem key={item._uid}>
              <div className="flex flex-col justify-center items-center h-full">
                <div className="flex justify-center items-center  py-10">
                  <img
                    src={`${
                      location === 'product' || location === 'space'
                        ? item?.image?.filename
                        : item?.filename
                    }/m/0x1600`}
                    className="max-h-[750px] w-auto object-contain"
                  />
                </div>
                {item.name && (
                  <div className="text-center font-bold text-primary">
                    {item.name}
                  </div>
                )}
                {location === 'project' && item.link && (
                  <a
                    href={item.link?.cached_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uppercase text-sm"
                  >
                    Product Link
                    <ArrowRight className="w-4 h-4 inline" />
                  </a>
                )}
                {location === 'space' && item?.link && (
                  <Link to={`/${item.link?.cached_url}`}>Link to project</Link>
                )}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-0 text-slate-500" />
      <CarouselNext className="absolute top-1/2 right-0 text-slate-500" />
    </Carousel>
  );
};
