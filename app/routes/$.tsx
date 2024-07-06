import {
  LoaderFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react';
import { Divide } from 'lucide-react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params['*'] ?? 'home';

  const sbApi = getStoryblokApi();
  let { data }: { data: any } = await sbApi
    .get(`cdn/stories/${slug}`, {
      version: 'draft',
    })
    .catch((e) => {
      // console.log("e", e);
      return { data: null };
    });

  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }

  const { data: careersData } = await sbApi.get('cdn/stories', {
    version: 'draft',
    starts_with: 'careers/',
    is_startpage: false,
  });

  return json({ story: data?.story, careers: careersData?.stories });
};
export default function Page() {
  let { story } = useLoaderData<typeof loader>();
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story?.content} />;
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
