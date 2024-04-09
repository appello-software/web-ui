import clsx from 'clsx';
import * as React from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export interface LoaderProps {
  /**
   * Full screen loader
   */
  full?: boolean;
  /**
   * Apply accent color
   */
  colorful?: boolean;
  /**
   * Each dot size
   */
  dotSize?: number;
  /**
   * Custom classes
   */
  dotClassNames?: string;
}

export const Loader: React.FC<LoaderProps> = props => {
  const {
    full,
    colorful,
    dotSize = 10,
    dotClassNames,
  } = useCombinedPropsWithKit({
    name: 'Loader',
    props,
  });

  const dotStyle = React.useMemo(
    () => ({
      width: `${dotSize}px`,
      height: `${dotSize}px`,
    }),
    [dotSize],
  );

  const dotClasses = React.useMemo(
    () => clsx(styles['dot'], !dotClassNames ? styles['dot--default-color'] : dotClassNames),
    [dotClassNames],
  );

  const loader = React.useMemo(() => {
    return (
      <div
        className={clsx(
          styles['container'],
          !dotClassNames && { [styles['container--colorful']]: colorful },
        )}
      >
        <div className={dotClasses} style={dotStyle} />
        <div className={dotClasses} style={dotStyle} />
        <div className={dotClasses} style={dotStyle} />
      </div>
    );
  }, [dotClassNames, colorful, dotClasses, dotStyle]);

  if (!full) {
    return loader;
  }

  return <div className={styles['full-wrapper']}>{loader}</div>;
};
