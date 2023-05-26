import './styles.scss';

import React, { ReactElement } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues, useController } from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { RadioInput } from '~/components/form/RadioInput';

export interface RadioGroupItem<T> {
  label: string;
  value: T;
}

export interface RadioGroupFieldProps<TFormValues extends FieldValues>
  extends Pick<FieldProps, 'label' | 'className' | 'required'> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  items: RadioGroupItem<FieldPathValue<TFormValues, FieldPath<TFormValues>>>[];
}

export const RadioGroupField = <TFormValues extends FieldValues>({
  items,
  control,
  name,
  label,
  className,
  required,
}: RadioGroupFieldProps<TFormValues>): ReactElement => {
  const controller = useController({ name, control });

  return (
    <Field {...{ label, className, required }}>
      <div className="radio-group">
        {items.map((item, index) => (
          <RadioInput
            key={index}
            checked={controller.field.value === item.value}
            onChange={() => controller.field.onChange(item.value)}
            label={item.label}
          />
        ))}
      </div>
    </Field>
  );
};
