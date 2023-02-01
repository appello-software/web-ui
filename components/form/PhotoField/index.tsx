import { Button, ButtonSize, ButtonVariant } from '@ui/components/common/Button';
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
      <div className="relative mb-3 h-20 w-20">
        {photo && (
          <Button
            onClick={() => controller.field.onChange(null)}
            size={ButtonSize.SMALL}
            className="absolute right-0 top-0 rounded-full bg-black-1 bg-opacity-50"
            iconClassName="text-white p-0.5"
            withIcon="close"
          />
        )}
        <img
          src={photo ?? photoPlaceholder}
          alt="Profile"
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      <FileUpload accept=".png, .jpg, .jpeg" onUpload={controller.field.onChange}>
        {({ onClick }) => (
          <Button
            variant={ButtonVariant.SECONDARY}
            withIcon="upload"
            label="Upload new"
            className="w-auto px-7"
            onClick={onClick}
          />
        )}
      </FileUpload>
    </Field>
  );
};
