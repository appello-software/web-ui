import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const InlineFields: React.FC<Props> = ({ children }) => {
  return <div className="form__inline-fields form__field-row">{children}</div>;
};
