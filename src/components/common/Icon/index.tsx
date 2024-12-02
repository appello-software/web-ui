import React from 'react';
import { ReactSVG } from 'react-svg';

export interface RegisterIconName {}

const baseIcons = {
  bell: 'string',
  add: 'string',
  calendar: 'string',
  eye: 'string',
  close: 'string',
  document: 'string',
  magnifier: 'string',
  polygon: 'string',
  downArrow: 'string',
  eyeCrossed: 'string',
  check: 'string',
  upload: 'string',
} as const;

export type IconName = RegisterIconName extends {
  icons: infer TRouter extends string;
}
  ? TRouter
  : keyof typeof baseIcons;

export interface IconProps {
  /**
   * Icon name (required, used to build the `src` path)
   */
  name: IconName;

  /**
   * Additional class name for the wrapper
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
   * Icon size (replaces width and height)
   */
  size?: string | number;

  /**
   * Icon color (applies to `fill` attribute)
   */
  color?: string;

  /**
   * Title for the SVG
   */
  title?: string;

  /**
   * Description for the SVG
   */
  desc?: string;

  /**
   * Custom loading fallback element
   */
  loading?: () => JSX.Element;

  /**
   * Custom error fallback element
   */
  fallback?: () => JSX.Element;

  /**
   * Evaluate scripts within the SVG (default: 'never')
   */
  evalScripts?: 'always' | 'once' | 'never';

  /**
   * Use HTTP credentials with requests
   */
  httpRequestWithCredentials?: boolean;

  /**
   * Enable renumeration of IRI elements (default: true)
   */
  renumerateIRIElements?: boolean;

  /**
   * Inject custom behavior before the SVG is injected
   */
  beforeInjection?: (svg: SVGElement) => void;

  /**
   * Inject custom behavior after the SVG is injected
   */
  afterInjection?: (svg: SVGElement) => void;

  /**
   * Set whether to cache the request (default: false)
   */
  useRequestCache?: boolean;

  /**
   * Wrapper element for the SVG (default: 'div')
   */
  wrapper?: 'div' | 'span';

  /**
   * onClick handler for the wrapper
   */
  onClick?: (event: React.MouseEvent<HTMLElement | SVGElement>) => void;

  /**
   * onError handler for SVG load errors
   */
  onError?: (error: unknown) => void;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  width = '100%',
  height = '100%',
  size,
  color,
  beforeInjection,
  ...props
}) => {
  return (
    <ReactSVG
      beforeInjection={(svg: SVGElement) => {
        if (color) {
          svg.setAttribute('style', `fill: ${color || '#000'};`);
          svg.querySelectorAll('[fill]').forEach(el => el.setAttribute('fill', color || '#000'));
        }
        if (size) {
          svg.setAttribute('width', size.toString());
          svg.setAttribute('height', size.toString());
        } else {
          svg.setAttribute('width', width.toString());
          svg.setAttribute('height', height.toString());
        }
        beforeInjection?.(svg);
      }}
      className={className}
      evalScripts="never"
      src={`/icons/${name}.svg`}
      wrapper={undefined}
      {...props}
    />
  );
};
