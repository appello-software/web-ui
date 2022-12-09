import { Button, ButtonVariant } from '@ui/components/common/Button';
import { FileUpload } from '@ui/components/common/FileUpload';
import { Field } from '@ui/components/form/Field';
import { useBlobObjectUrl } from '@ui/hooks/useBlobObjectUrl';
import * as React from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';

interface Props<TFormValues extends FieldValues, TName> {
  name: TName;
  control: Control<TFormValues>;

  // field props
  label?: string;
  className?: string;
}

type PhotoValue = Nullable<File | string>;

export const PhotoField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, PhotoValue>,
>({
  name,
  control,
  label,
  className,
}: Props<TFormValues, TName>): React.ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as PhotoValue;
  const photo = useBlobObjectUrl(value);

  return (
    <Field
      className={className}
      label={label}
      error={controller.fieldState.error}
      labelClassName="mb-1"
    >
      <img
        src={photo ?? photoPlaceholder}
        alt="Profile"
        className="rounded-full w-20 h-20 mb-3 object-cover"
      />
      <FileUpload onUpload={controller.field.onChange}>
        {({ onClick }) => (
          <Button
            variant={ButtonVariant.SECONDARY}
            withIcon="upload"
            label="Upload new"
            className="px-7 w-auto"
            onClick={onClick}
          />
        )}
      </FileUpload>
    </Field>
  );
};
