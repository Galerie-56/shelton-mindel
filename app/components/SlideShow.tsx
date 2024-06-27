import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

export const SlideShow = ({
  images,
  size = "1920x1080",
  location = "project",
  ...props
}) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
        Fade(),
      ]}
      opts={{
        loop: true,
        align: "center",
        containScroll: false,
      }}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem
            key={image.url}
            className={`flex justify-center ${props.className}`}
          >
            <img
              src={`${image.filename}/m/${size}`}
              alt={image.alt_text}
              className="w-full h-auto object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {location != "home" && (
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
      )}
      {location != "home" && (
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
      )}
    </Carousel>
  );
};
