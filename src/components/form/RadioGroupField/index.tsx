import './styles.scss';

import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues, useController } from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { RadioInput } from '~/components/form/RadioInput';
import { useCombinedPropsWithKit } from '~/hooks';

export interface RadioGroupItem<T> {
  label: string;
  value: T;
}

export interface RadioGroupFieldProps<TFormValues extends FieldValues>
  extends Pick<FieldProps, 'label' | 'className' | 'required'> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  items: RadioGroupItem<FieldPathValue<TFormValues, FieldPath<TFormValues>>>[];
  groupClassName?: string;
}

export const RadioGroupField = <TFormValues extends FieldValues>(
  props: RadioGroupFieldProps<TFormValues>,
): ReactElement => {
  const { items, control, name, label, className, required, groupClassName } =
    useCombinedPropsWithKit({
      name: 'RadioGroupField',
      props,
    });

  const controller = useController({ name, control });

  return (
    <Field {...{ label, className, required }}>
      <div className={clsx('radio-group', groupClassName)}>
        {items.map((item, index) => (
          <RadioInput
            checked={controller.field.value === item.value}
            key={index}
            label={item.label}
            onChange={() => controller.field.onChange(item.value)}
          />
        ))}
      </div>
    </Field>
  );
};
