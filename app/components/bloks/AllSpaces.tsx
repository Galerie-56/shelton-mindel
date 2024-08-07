import { storyblokEditable } from '@storyblok/react';
import type { AllSpacesStoryblok } from '~/types';
import { SpacesList } from '../SpacesList';

export const AllSpaces = ({ blok }: AllSpacesStoryblok) => {
  const { _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid} className="">
      <SpacesList />
    </div>
  );
};
