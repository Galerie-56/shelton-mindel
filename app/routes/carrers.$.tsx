import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const sbApi = getStoryblokApi();
  let slug = params['*'] ?? 'home';

  let { data }: { data: any } = await sbApi
    .get(`cdn/stories/careers/${slug}`, {
      version: 'draft',
    })
    .catch((e) => {
      return { data: null };
    });

  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return json({
    story: data?.story,
    careerName: data?.story?.name,
  });
};

const CareersPage = () => {
  let { story } = useLoaderData<typeof loader>();
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story?.content} />;
};

export default CareersPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
