import { getStoryblokApi } from '@storyblok/react';

export async function getTotal(uuid?: string, folderName: string = 'projects') {
  const sbApi = getStoryblokApi();
  const { headers } = await sbApi.get('cdn/stories', {
    version: 'draft',
    starts_with: `${folderName}/`,
    is_startpage: false,
    ...(uuid && {
      filter_query: {
        category: {
          in: uuid,
        },
      },
    }),
  });

  return headers.total;
}
