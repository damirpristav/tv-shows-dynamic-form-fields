/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';

import { CastMember, TVShow } from 'types';

export const validationSchema = yup.object().shape<{ [key in keyof Omit<TVShow, 'id'>]: yup.Schema<any> }>({
  title: yup.string().trim().required('Title is required'),
  cast: yup
    .array()
    .of(
      yup.object().shape<{ [key in keyof CastMember]: yup.Schema<any> }>({
        name: yup.string().trim().required('Name is required'),
        character: yup.string().trim().required('Character is required'),
      })
    )
    .min(1, 'At least one cast member is required'),
});

export const defaultData = (data: TVShow | null): TVShow => {
  return {
    id: data?.id ?? '',
    title: data?.title ?? '',
    cast: data?.cast ?? [{ name: '', character: '' }],
  };
};
