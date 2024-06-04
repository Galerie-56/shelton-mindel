import { storyblokEditable, renderRichText } from "@storyblok/react";
import { ProjectStoryblok } from "~/types";
import { SlideShow } from "../SlideShow";

export const Project = ({ blok }: { blok: ProjectStoryblok }) => {
  const {
    headline,
    architect,
    awards,
    brief,
    category,
    photographer,
    press,
    project_code,
    slideshow,
    solution,
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
          <h1>{headline}</h1>
          <div dangerouslySetInnerHTML={{ __html: renderRichText(brief) }} />
          <div dangerouslySetInnerHTML={{ __html: renderRichText(solution) }} />
        </div>
        <div className="w-1/2">
          <div className="flex gap-10">
            <div className="w-1/2">
              <div>
                <h4>Category</h4>
                <div className="uppercase">{category?.name}</div>
              </div>
              <div>
                <h4>Project Code</h4>
                <div className="uppercase">{project_code}</div>
              </div>
              {architect && (
                <div>
                  <h4>Architect</h4>
                  <div className="uppercase">{architect}</div>
                </div>
              )}
              {photographer && (
                <div>
                  <h4>Photographer</h4>
                  <div className="uppercase">{photographer}</div>
                </div>
              )}
              {press && (
                <div>
                  <h4>Press</h4>
                  <div className="uppercase">{press.map((p) => p.title)}</div>
                </div>
              )}

              {awards && (
                <div>
                  <h4>Awards</h4>
                  <div className="uppercase">
                    {awards.map((award) => award.title)}
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/2">
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
                <div className="uppercase">projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlideShow images={slideshow} />
    </article>
  );
};
