import * as React from 'react';
import { Control, Controller, FieldPathByValue, FieldValues } from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { TextArea, TextAreaProps } from '~/components/form/TextArea';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedInputProps = Pick<
  TextAreaProps,
  'autoComplete' | 'autoFocus' | 'placeholder' | 'maxLength' | 'disabled' | 'rows' | 'defaultValue'
>;
type AllowedFieldProps = Pick<
  FieldProps,
  'label' | 'className' | 'required' | 'labelChildren' | 'labelClassName'
>;

export interface TextAreaFieldProps<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string>,
> extends AllowedInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFormValues>;
  textAreaClassName?: string;
}

export const TextAreaField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string>,
>(
  props: TextAreaFieldProps<TFormValues, TName>,
): React.ReactElement => {
  const {
    name,
    control,
    label,
    className,
    textAreaClassName,
    required,
    placeholder,
    labelChildren,
    labelClassName,
    ...textAreaProps
  } = useCombinedPropsWithKit({
    name: 'TextAreaField',
    props,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Field {...{ className, label, required, labelChildren, labelClassName }} error={error}>
          <TextArea
            className={textAreaClassName}
            error={!!error}
            placeholder={placeholder ?? label}
            {...field}
            {...textAreaProps}
          />
        </Field>
      )}
    />
  );
};
