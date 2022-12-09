import { Loader } from '@ui/components/common/Loader';
import { Field } from '@ui/components/form/Field';
import { SelectOption } from '@ui/components/form/SelectField';
import { InputSize } from '@ui/components/form/TextInput';
import clsx from 'clsx';
import React, { ReactElement, useRef } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues, useController } from 'react-hook-form';
import { OnChangeValue, StylesConfig } from 'react-select';
import Select from 'react-select/async';
import { useDebouncedCallback } from 'use-debounce';

import { DEBOUNCE_DELAY } from '~/constants/timing';
import { useScript } from '~/view/hooks/useScript';
import selectStyles from '~/view/ui/components/form/SelectField/styles.module.scss';

type IsMulti = false;

const styleProxy = new Proxy(
  {},
  {
    get: (_, name) => (style: StylesConfig<SelectOption<string>, IsMulti>) => {
      if (name === 'menuPortal') {
        return style;
      }
      return undefined;
    },
  },
);

const LoadingIndicator: React.FC = () => {
  return (
    <div className="ml-7">
      <Loader dotSize={6} colorful />
    </div>
  );
};

interface Props<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;

  // input props
  placeholder?: string;
  inputSize?: InputSize;

  // field props
  label?: string;
  className?: string;
  required?: boolean;
}

export const LocationField = <
  TFormValues extends FieldValues,
  TValue extends FieldPathValue<TFormValues, FieldPath<TFormValues>>,
>({
  label,
  inputSize,
  className,
  name,
  control,
  required,
  placeholder = label,
}: Props<TFormValues>): ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as TValue;
  const onChange = controller.field.onChange as (value: string) => void;
  const autocomplete = useRef<Nullable<google.maps.places.AutocompleteService>>(null);

  const { status: mapsStatus } = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&v=3.exp&libraries=places&language=en`,
  );

  const loadOptions = useDebouncedCallback(
    (inputValue: string, callback: (options: SelectOption<string>[]) => void) => {
      // eslint-disable-next-line no-multi-assign
      const service = (autocomplete.current ??= new google.maps.places.AutocompleteService());

      service.getPlacePredictions(
        { input: inputValue, types: ['street_address'] },
        (predictions: google.maps.places.AutocompletePrediction[] | null) => {
          if (!predictions) {
            callback([]);
            return;
          }

          const options = predictions.map(prediction => ({
            label: prediction.description,
            value: prediction.place_id,
          }));
          callback(options);
        },
      );
    },
    DEBOUNCE_DELAY,
  );

  const handleChange = React.useCallback(
    (value: OnChangeValue<SelectOption<string>, false>) => {
      if (!value) {
        return;
      }
      onChange(value.label);
    },
    [onChange],
  );

  const selectValue: SelectOption<string> = React.useMemo(() => ({ label: value, value }), [value]);

  if (mapsStatus !== 'ready') {
    return <Loader />;
  }

  return (
    <Field
      label={label}
      error={controller.fieldState.error}
      className={className}
      required={required}
    >
      <Select<SelectOption<string>>
        cacheOptions
        components={{
          LoadingIndicator,
        }}
        onChange={handleChange}
        loadOptions={loadOptions}
        styles={styleProxy}
        className={clsx(selectStyles['select'], {
          [selectStyles[`select--size-${inputSize}`]]: inputSize,
        })}
        value={selectValue}
        isClearable
        classNamePrefix="react-select"
        placeholder={placeholder}
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </Field>
  );
};
