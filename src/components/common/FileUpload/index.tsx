import React from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

export interface FileUploadProps<TMultiple extends boolean> {
  /**
   * Callback that will be called when files are selected
   * @param files
   */
  onUpload: (files: TMultiple extends true ? File[] : File) => void;
  /**
   * File selection trigger
   * @param props
   */
  children: (props: { onClick: () => void }) => React.ReactNode;
  /**
   * Allowed file types
   */
  accept?: string;
  /**
   * Allow multiple files
   */
  multiple?: TMultiple;
  /**
   * Additional class name
   */
  className?: string;
}

export const FileUpload = <TMultiple extends boolean = false>(
  props: FileUploadProps<TMultiple>,
): React.ReactElement => {
  const { children, onUpload, accept, multiple, className } = useCombinedPropsWithKit({
    name: 'FileUpload',
    props,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || !files.length) {
        return;
      }

      onUpload((multiple ? Array.from(files) : files[0]) as TMultiple extends true ? File[] : File);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [multiple, onUpload],
  );

  const showNativeDialog = React.useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className={className}>
      {children({ onClick: showNativeDialog })}
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
      />
    </div>
  );
};
