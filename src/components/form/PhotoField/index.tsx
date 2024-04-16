import './styles.scss';

import { useBlobObjectUrl } from '@appello/web-kit';
import * as React from 'react';
import { ReactNode } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Button, ButtonSize, ButtonVariant } from '~/components/common/Button';
import { FileUpload } from '~/components/common/FileUpload';
import { Field } from '~/components/form/Field';
import { useCombinedPropsWithKit } from '~/hooks';

export interface PhotoFieldProps<TFormValues extends FieldValues, TName> {
  name: TName;
  control: Control<TFormValues>;
  // field props
  label?: string;
  className?: string;
  photoPlaceholder?: string;
  labelChildren?: ReactNode;
}

type PhotoValue = File | string | null;

export const PhotoField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, PhotoValue>,
>(
  props: PhotoFieldProps<TFormValues, TName>,
): React.ReactElement => {
  const { name, control, label, className, photoPlaceholder, labelChildren } =
    useCombinedPropsWithKit({
      name: 'PhotoField',
      props,
    });

  const controller = useController({ name, control });
  const value = controller.field.value as PhotoValue;
  const photo = useBlobObjectUrl(value);

  return (
    <Field
      className={className}
      error={controller.fieldState.error}
      label={label}
      labelChildren={labelChildren}
      labelClassName="photo-field__label"
    >
      <div className="photo-field__img-wrapper">
        {photo && (
          <Button
            className="photo-field__remove-btn"
            iconClassName="photo-field__remove-btn-icon"
            size={ButtonSize.SMALL}
            withIcon="close"
            onClick={() => controller.field.onChange(null)}
          />
        )}
        {(photo || photoPlaceholder) && (
          <img alt="Profile" className="photo-field__img" src={photo ?? photoPlaceholder} />
        )}
      </div>

      <FileUpload accept=".png, .jpg, .jpeg" onUpload={controller.field.onChange}>
        {({ onClick }) => (
          <Button
            className="photo-field__upload-btn"
            label="Upload new"
            variant={ButtonVariant.SECONDARY}
            withIcon="upload"
            onClick={onClick}
          />
        )}
      </FileUpload>
    </Field>
  );
};
