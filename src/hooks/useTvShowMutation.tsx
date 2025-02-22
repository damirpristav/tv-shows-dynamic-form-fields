import useSWRMutation from "swr/mutation";

import { api } from "config";
import { TVShow } from "types";

async function createTvShow(url: string, { arg }: { arg: Omit<TVShow, 'id'> }) {
  return await api.post(url, arg);
}

async function updateTvShow(url: string, { arg }: { arg: TVShow }) {
  return await api.put(url, arg);
}

async function deleteTvShow(url: string) {
  return await api.delete(url);
}

export const useCreateTvShowMutation = () => {
  return useSWRMutation('/tv-shows', createTvShow);
};

export const useUpdateTvShowMutation = (id: string) => {
  return useSWRMutation(`/tv-shows/${id}`, updateTvShow, { revalidate: false });
};

export const useDeleteTvShowMutation = (id: string) => {
  return useSWRMutation(`/tv-shows/${id}`, deleteTvShow);
};
