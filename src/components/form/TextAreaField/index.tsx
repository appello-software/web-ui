import * as React from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { TextArea, TextAreaProps } from '~/components/form/TextArea';

type AllowedInputProps = Pick<
  TextAreaProps,
  'autoComplete' | 'autoFocus' | 'placeholder' | 'maxLength' | 'disabled' | 'rows'
>;
type AllowedFieldProps = Pick<FieldProps, 'label' | 'className' | 'required'>;

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
>({
  name,
  control,
  label,
  className,
  textAreaClassName,
  required,
  placeholder = label,
  ...textAreaProps
}: TextAreaFieldProps<TFormValues, TName>): React.ReactElement => {
  const controller = useController({ name, control });

  return (
    <Field {...{ className, label, required }} error={controller.fieldState.error}>
      <TextArea
        {...controller.field}
        error={!!controller.fieldState.error}
        placeholder={placeholder}
        className={textAreaClassName}
        {...textAreaProps}
      />
    </Field>
  );
};
