import React from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

export interface InlineFieldsProps {
  children: React.ReactNode;
}

export const InlineFields: React.FC<InlineFieldsProps> = props => {
  const { children } = useCombinedPropsWithKit({
    name: 'InlineFields',
    props,
  });

  return <div className="form__inline-fields form__field-row">{children}</div>;
};
