import { Link } from "@remix-run/react";
import { ProductStoryblok } from "~/types";

export const ProductCard = ({ product }: { product: ProductStoryblok }) => {
  const { headline, image, full_slug, subtitle } = product;

  return (
    <div>
      <Link to={`/${full_slug}`} className="text-black">
        <img src={image?.filename} alt={image?.alt_text} />
        <h2>{headline}</h2>
        <div>{subtitle}</div>
      </Link>
    </div>
  );
};
