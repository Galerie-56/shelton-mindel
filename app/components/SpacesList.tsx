import { useState } from 'react';
import { getStoryblokApi } from '@storyblok/react';
import { useMatches } from '@remix-run/react';
import type { SpaceStoryblok } from '~/types';
import { getSpaceCardData } from '~/lib';
import { SpaceCard } from './SpaceCard';

interface RouteData {
  total: number;
  spaces: SpaceStoryblok[];
}

interface SpacesListType {
  uuid?: string;
}

export const SpacesList = ({ uuid }: SpacesListType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const matches = useMatches();
  const globalData = matches[0].data;
  const { total, spaces: firstSpaces } = matches[1].data as RouteData;
  console.log(firstSpaces);

  const [spaces, setSpaces] = useState(firstSpaces);

  interface GlobalData {
    perPage: number;
  }

  const sbApi = getStoryblokApi();
  const resolveRelations: string[] = [];

  const perPage = (globalData as GlobalData)?.perPage;

  const fetchSpaces = async (page: number, uuid: string) => {
    const { data: spaces } = await sbApi.get(`cdn/stories`, {
      version: 'draft',
      starts_with: 'spaces/',
      per_page: perPage,
      page,
      is_startpage: false,
      resolve_relations: resolveRelations,
      search_term: uuid,
    });

    const nextSpaces = spaces.stories.map((s: SpaceStoryblok) =>
      getSpaceCardData(s)
    );

    setSpaces((prevSpaces: SpaceStoryblok[]) => [...prevSpaces, ...nextSpaces]);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchSpaces(nextPage, uuid || '');
  };

  console.log('spaces', spaces);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {spaces?.map((space: SpaceStoryblok) => (
        <SpaceCard key={space.id} space={space} />
      ))}
      {total && spaces.length < total && (
        <div className="col-span-3 flex justify-center mt-4">
          <button className="button py-4 px-7" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
