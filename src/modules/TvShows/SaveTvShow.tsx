import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router';

import { CastMember, TVShow } from 'types';
import { Input, FieldArray } from 'components';
import { useTvShow } from 'hooks/useTvShow';
import { useCreateTvShowMutation, useUpdateTvShowMutation } from 'hooks/useTvShowMutation';
import { defaultData, validationSchema } from './formHelpers';

export const SaveTvShow = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data } = useTvShow(params?.id ?? '');

  const { trigger: createTrigger } = useCreateTvShowMutation();
  const { trigger: updateTrigger } = useUpdateTvShowMutation(params?.id ?? '');

  const onSubmit = async (values: TVShow) => {
    try {
      if (values.id) {
        await updateTrigger(values);
      } else {
        await createTrigger({ title: values.title, cast: values.cast });
      }
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Save TV Show</h1>
      <div className="my-1">
        <button type="button" className="button button--small button--outline" onClick={() => navigate('/')}>
          Go back
        </button>
      </div>
      <Formik
        initialValues={defaultData(data?.data ?? null)}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values, errors }) => (
          <Form>
            <Input name="title" label="Title" />
            <FieldArray<CastMember>
              name="cast"
              label="Cast"
              values={values.cast}
              newItemInitialValue={{ name: '', character: '' }}
              error={typeof errors.cast === 'string' ? errors.cast : undefined}
            >
              {({ index }) => (
                <>
                  <Input label="Name" name={`cast.${index}.name`} placeholder="Jane Doe" />
                  <Input label="Character" name={`cast.${index}.character`} placeholder="Jackie" />
                </>
              )}
            </FieldArray>

            <button type="submit" className="button form-button" disabled={isSubmitting}>
              Save
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
