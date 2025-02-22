import { ReactNode } from 'react';
import { FieldArray as FormikFieldArray } from 'formik';

export const FieldArray = <T,>({
  values,
  name,
  label,
  addButtonLabel,
  removeButtonLabel,
  newItemInitialValue,
  error,
  children,
}: Props<T>) => {
  return (
    <div className="form-array">
      <FormikFieldArray name={name}>
        {({ push, remove }) => (
          <div>
            <p>{label}</p>
            {values.length > 0 && (
              <div className="cast-wrapper">
                {values.map((item, index) => (
                  <div key={index}>
                    {children({ item, index })}
                    <div>
                      <button type="button" className="button button--danger" onClick={() => remove(index)}>
                        {removeButtonLabel || 'Remove'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!!error && <p className="form-error">{error}</p>}
            <button
              type="button"
              className="button form-array__button button--outline"
              onClick={() => push(newItemInitialValue)}
            >
              {addButtonLabel || 'Add new'}
            </button>
          </div>
        )}
      </FormikFieldArray>
    </div>
  );
};

type Props<T> = {
  values: T[];
  name: string;
  label: string;
  newItemInitialValue: T;
  addButtonLabel?: string;
  removeButtonLabel?: string;
  error?: string;
  children: (props: { item: T; index: number }) => ReactNode;
};
