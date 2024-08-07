import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';
import { getPerPage, getSpaceCardData, isPreview } from '~/lib';

import type { SpaceStoryblok } from '~/types';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params['*'] ?? 'home';
  const resolveRelations = ['project.category'];
  let version = isPreview() ? 'draft' : 'published';

  const sbApi = getStoryblokApi();

  let { data }: { data: any } = await sbApi
    .get(
      `cdn/stories/spaces/${slug}`,
      {
        version: version as 'published' | 'draft',
      },
      { cache: 'no-store' }
    )
    .catch((e) => {
      return { data: null };
    });

  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }

  const page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);
  const perPage = await getPerPage(sbApi);
  const { data: spacesData } = await sbApi.get(
    `cdn/stories`,
    {
      version: version as 'published' | 'draft',
      starts_with: 'spaces/',
      per_page: perPage,
      page,
      is_startpage: false,
      resolve_relations: resolveRelations,
    },
    { cache: 'no-store' }
  );

  const response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_PREVIEW_TOKEN}&starts_with=spaces/&version=draft&is_startpage=false`
  );
  const total = await response?.headers.get('total');
  const spaces = spacesData.stories.map((p: SpaceStoryblok) =>
    getSpaceCardData(p)
  );

  // Find current project index
  const currentIndex = spaces.findIndex((p) => p.id === data.story.id);

  // Determine previous and next projects
  const prevSpace = currentIndex > 0 ? spaces[currentIndex - 1] : null;
  const nextSpace =
    currentIndex < spaces.length - 1 ? spaces[currentIndex + 1] : null;

  return json({
    story: data?.story,
    total,
    spaces,
    perPage,
    spaceName: data?.story?.name,
    prevSpace,
    nextSpace,
  });
};

const SpacesPage = () => {
  let { story } = useLoaderData<typeof loader>();
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story?.content} />;
};

export default SpacesPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
