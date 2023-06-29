import './styles.scss';

import * as React from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Button, ButtonSize, ButtonVariant } from '~/components/common/Button';
import { FileUpload } from '~/components/common/FileUpload';
import { Field } from '~/components/form/Field';
import { useCombinedPropsWithKit } from '~/hooks';
import { useBlobObjectUrl } from '~/hooks/useBlobObjectUrl';

export interface PhotoFieldProps<TFormValues extends FieldValues, TName> {
  name: TName;
  control: Control<TFormValues>;
  // field props
  label?: string;
  className?: string;
  photoPlaceholder?: string;
}

type PhotoValue = File | string | null;

export const PhotoField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, PhotoValue>,
>(
  props: PhotoFieldProps<TFormValues, TName>,
): React.ReactElement => {
  const { name, control, label, className, photoPlaceholder } = useCombinedPropsWithKit({
    name: 'PhotoField',
    props,
  });

  const controller = useController({ name, control });
  const value = controller.field.value as PhotoValue;
  const photo = useBlobObjectUrl(value);

  return (
    <Field
      className={className}
      label={label}
      error={controller.fieldState.error}
      labelClassName="appello-photo-field__label"
    >
      <div className="appello-photo-field__img-wrapper">
        {photo && (
          <Button
            onClick={() => controller.field.onChange(null)}
            size={ButtonSize.SMALL}
            className="appello-photo-field__remove-btn"
            iconClassName="appello-photo-field__remove-btn-icon"
            withIcon="close"
          />
        )}
        {(photo || photoPlaceholder) && (
          <img src={photo ?? photoPlaceholder} alt="Profile" className="appello-photo-field__img" />
        )}
      </div>

      <FileUpload accept=".png, .jpg, .jpeg" onUpload={controller.field.onChange}>
        {({ onClick }) => (
          <Button
            variant={ButtonVariant.SECONDARY}
            withIcon="upload"
            label="Upload new"
            className="appello-photo-field__upload-btn"
            onClick={onClick}
          />
        )}
      </FileUpload>
    </Field>
  );
};
