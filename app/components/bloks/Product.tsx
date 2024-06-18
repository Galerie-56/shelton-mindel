import { useLoaderData } from "@remix-run/react";
import { storyblokEditable, renderRichText } from "@storyblok/react";
import { ProductStoryblok } from "~/types";


export const Product = ({ blok }: { blok: ProductStoryblok }) => {
  const { productName } = useLoaderData();
  const {

    image,
    text,
    product_series: series,
    brochures,
    seo,
  } = blok;

  return (
    <article
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="prose max-w-full"
    >
      <div className="flex gap-20">
        <div className="w-1/2">
          <h1>{productName}</h1>
          <div dangerouslySetInnerHTML={{ __html: renderRichText(text) }} />
        </div>
        <div className="w-1/2">
          <div className="gap-10">
            <div>
              <h4>Next</h4>
              <div className="uppercase">Next project</div>
            </div>
            <div>
              <h4>Previous</h4>
              <div className="uppercase">Previous project</div>
            </div>
            <div>
              <h4>View all</h4>
              <div className="uppercase">products</div>
            </div>
            <div>
              {brochures?.map((brochure) => (
                <a
                  href={brochure.link?.cached_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={brochure._uid}
                >
                  <img src={`${brochure.image?.filename}/m/135x203`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        {series?.map((serie) => (
          <div key={serie._uid}>
            <h2>{serie.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: renderRichText(serie.text) }}
            />
            <div>
              {serie.images?.map((item) => (
                <a
                  href={item.link?.cached_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`${item.image?.filename}/m/135x203`} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};
