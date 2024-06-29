import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const LightboxCarousel = ({ images, startIndex }) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  console.log("images", images);

  useEffect(() => {
    setActiveIndex(startIndex);
  }, [startIndex]);

  return (
    <Carousel
      opts={{
        loop: true,
        align: "center",
        containScroll: false,
        startIndex: activeIndex,
      }}
    >
      <CarouselContent>
        {images.map((item) => (
          <CarouselItem key={item._uid}>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src={`${item.image?.filename}/m/`}
                className="w-full h-full object-contain"
              />
              <div className="text-center font-bold text-primary">
                {item.name}
              </div>
              {item.link && (
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-0 text-slate-500" />
      <CarouselNext className="absolute top-1/2 right-0 text-slate-500" />
    </Carousel>
  );
};
