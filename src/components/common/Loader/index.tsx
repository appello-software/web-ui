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
}

export const Loader: React.FC<LoaderProps> = props => {
  const {
    full,
    colorful,
    dotSize = 10,
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

  const loader = React.useMemo(() => {
    return (
      <div className={clsx(styles['container'], { [styles['container--colorful']]: colorful })}>
        <div className={styles['dot']} style={dotStyle} />
        <div className={styles['dot']} style={dotStyle} />
        <div className={styles['dot']} style={dotStyle} />
      </div>
    );
  }, [colorful, dotStyle]);

  if (!full) {
    return loader;
  }

  return <div className={styles['full-wrapper']}>{loader}</div>;
};
