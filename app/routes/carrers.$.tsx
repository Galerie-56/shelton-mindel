import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { getStoryblokApi } from '@storyblok/react';
import { useStoryblokData } from '~/lib';

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

const CareersPage = () => useStoryblokData('careers.$');

export default CareersPage;
