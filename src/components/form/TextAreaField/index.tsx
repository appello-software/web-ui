import * as React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

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
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends AllowedInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFieldValues>;
  textAreaClassName?: string;
}

export const TextAreaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: TextAreaFieldProps<TFieldValues, TName>,
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
      defaultValue={'' as any}
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
