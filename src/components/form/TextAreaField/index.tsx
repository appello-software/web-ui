import * as React from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

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
    defaultValue,
    ...textAreaProps
  } = useCombinedPropsWithKit({
    name: 'TextAreaField',
    props,
  });

  const controller = useController({ name, control, defaultValue: defaultValue as any });

  return (
    <Field
      {...{ className, label, required, labelChildren, labelClassName }}
      error={controller.fieldState.error}
    >
      <TextArea
        {...controller.field}
        className={textAreaClassName}
        error={!!controller.fieldState.error}
        placeholder={placeholder ?? label}
        {...textAreaProps}
      />
    </Field>
  );
};
