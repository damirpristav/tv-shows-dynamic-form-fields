import { useState } from "react";
import useSWR from "swr";

import { fetcher } from "config";
import { TVShow } from "types";

export const useTvShowsSwr = ({ page }: { page: number }) => {
  return useSWR(`/tv-shows?page=${page}`, fetcher<TVShow>, { revalidateOnFocus: false });
};

export const useTvShows = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, mutate } = useTvShowsSwr({ page: currentPage });

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return { data, isLoading, currentPage, setCurrentPage, mutate, goToNextPage, goToPrevPage };
};
