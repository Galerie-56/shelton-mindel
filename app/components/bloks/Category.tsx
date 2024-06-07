import { useLoaderData } from "@remix-run/react";
import { storyblokEditable } from "@storyblok/react";
import type { CategoryStoryblok } from "~/types";
import { ProjectsList } from "~/components/ProjectsList";
import type { loader } from "~/routes/categories.$";

export const Category = ({ blok }: CategoryStoryblok) => {
  const { uuid } = useLoaderData<typeof loader>();

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <div className="mb-10">
        <h1 className="text-[24px] uppercase mb-10">{blok.headline}</h1>
        {blok.description ? <p>{blok.description}</p> : null}
      </div>
      <ProjectsList uuid={uuid} />
    </div>
  );
};
