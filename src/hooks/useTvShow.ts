import useSWR from 'swr';

import { fetcherSingle } from 'config';
import { TVShow } from 'types';

export const useTvShow = (id: string) => {
  return useSWR(id && id !== 'new' ? `/tv-shows/${id}` : null, fetcherSingle<TVShow>, { revalidateOnFocus: false });
};
