import React from 'react';

export interface IconProps {
  /**
   * Icon name
   */
  name: string;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Icon width
   */
  width?: string | number;
  /**
   * Icon height
   */
  height?: string | number;
  /**
   * Icon size (replacing width and height)
   */
  size?: string | number;
  /**
   * Use raw icon
   */
  raw?: boolean;
  /**
   * Icon color
   */
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  width = '100%',
  height = '100%',
  raw,
  size,
  color,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size !== undefined ? size : width}
    height={size !== undefined ? size : height}
    className={className}
    style={{ color }}
  >
    <use
      xlinkHref={
        raw ? `/icons/raw-spritemap.svg#sprite-${name}` : `/icons/spritemap.svg#sprite-${name}`
      }
    />
  </svg>
);
