import React from 'react';

export interface InlineFieldsProps {
  children: React.ReactNode;
}

export const InlineFields: React.FC<InlineFieldsProps> = ({ children }) => {
  return <div className="form__inline-fields form__field-row">{children}</div>;
};
