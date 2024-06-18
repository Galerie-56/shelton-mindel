import { useState, useRef, useEffect } from "react";
import { storyblokEditable, renderRichText } from "@storyblok/react";
import { ProjectStoryblok } from "~/types";
import { SlideShow } from "../SlideShow";
import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

export const Project = ({ blok }: { blok: ProjectStoryblok }) => {
  const {

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
  const { projectName } = useLoaderData();

  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : "10rem"; // Adjust this value to match the height of 5 lines
    }
  }, [isExpanded]);

  return (
    <article {...storyblokEditable(blok)} key={blok._uid} className="">
      <div className="flex gap-20">
        <div className="w-1/2">
          <h1>{projectName}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: `Problem: ${renderRichText(brief)}`,
            }}
            className="prose mb-5"
          />
          <div
            className="relative overflow-hidden transition-max-height duration-500 ease-in-out"
            style={{ maxHeight: isExpanded ? "none" : "10rem" }} // Adjust this value to match the height of 5 lines
            ref={contentRef}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `Solution: ${renderRichText(solution)}`,
              }}
              className="prose text-primary"
            />
          </div>
          <button
            onClick={toggleReadMore}
            className=" bg-transparent hover:bg-transparent capitalize my-5 text-primary p-0 font-bold"
          >
            {isExpanded ? "Close" : "Read More"}
          </button>
        </div>
        <div className="w-1/2 uppercase">
          <div className="flex gap-10">
            <div className="w-1/2 space-y-5">
              <div>
                <h4 className="text-[12px]">Category</h4>
                <div className="uppercase">{category?.name}</div>
              </div>
              <div>
                <h4 className="text-[12px]">Project Code</h4>
                <div className="uppercase">{project_code}</div>
              </div>

              {photographer && (
                <div>
                  <h4 className="text-[12px]">Photographer</h4>
                  <div className="uppercase">{photographer}</div>
                </div>
              )}
              {architect && (
                <div>
                  <h4 className="text-[12px]">Architect</h4>
                  <div className="uppercase">{architect}</div>
                </div>
              )}
              {awards && (
                <div>
                  <h4 className="text-[12px]">Awards</h4>
                  <div className="uppercase">
                    {awards.map((award) => (
                      <div className="mb-5">
                        {award.year} <br /> {award.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {press && (
                <div>
                  <h4 className="text-[12px]">Press</h4>
                  <div className="uppercase">
                    {press.map((p) => (
                      <div className="mb-5">{p.title}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/2 space-y-5">
              <div>
                <h4 className="text-[12px]">Next</h4>
                <div className="uppercase">Next project</div>
              </div>
              <div>
                <h4 className="text-[12px]">Previous</h4>
                <div className="uppercase">Previous project</div>
              </div>
              <div>
                <h4 className="text-[12px]">View all</h4>
                <Link to="/projects" prefetch="intent" className="uppercase">
                  projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlideShow images={slideshow} />
    </article>
  );
};
