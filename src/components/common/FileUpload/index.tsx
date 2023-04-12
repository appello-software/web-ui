import React from 'react';

interface Props<TMultiple extends boolean> {
  onUpload: (files: TMultiple extends true ? File[] : File) => void;
  children: (props: { onClick: () => void }) => React.ReactNode;
  accept?: string;
  multiple?: TMultiple;
  className?: string;
}

export const FileUpload = <TMultiple extends boolean = false>({
  children,
  onUpload,
  accept,
  multiple,
  className,
}: Props<TMultiple>): React.ReactElement => {
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
