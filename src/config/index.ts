import axios from 'axios';

import { PaginatedData, SingleData } from 'types';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: 'application/json',
  },
});

export const fetcher = <T>(url: string): Promise<PaginatedData<T>> => api.get(url).then((res) => res.data);
export const fetcherSingle = <T>(url: string): Promise<SingleData<T>> => api.get(url).then((res) => res.data);
