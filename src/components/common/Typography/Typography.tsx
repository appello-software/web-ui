/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export enum TypographyVariant {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P1,
  P2,
  P3,
  P4,
  P5,
  P6,
}

const tagByVariant: Record<TypographyVariant, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'> = {
  [TypographyVariant.H1]: 'h1',
  [TypographyVariant.H2]: 'h2',
  [TypographyVariant.H3]: 'h3',
  [TypographyVariant.H4]: 'h4',
  [TypographyVariant.H5]: 'h5',
  [TypographyVariant.H6]: 'h6',
  [TypographyVariant.P1]: 'p',
  [TypographyVariant.P2]: 'p',
  [TypographyVariant.P3]: 'p',
  [TypographyVariant.P4]: 'p',
  [TypographyVariant.P5]: 'p',
  [TypographyVariant.P6]: 'p',
};

const variantClasses: Record<TypographyVariant, string> = {
  [TypographyVariant.H1]: 'text-h1',
  [TypographyVariant.H2]: 'text-h2',
  [TypographyVariant.H3]: 'text-h3',
  [TypographyVariant.H4]: 'text-h4',
  [TypographyVariant.H5]: 'text-h5',
  [TypographyVariant.H6]: 'text-h6',
  [TypographyVariant.P1]: 'text-p1',
  [TypographyVariant.P2]: 'text-p2',
  [TypographyVariant.P3]: 'text-p3',
  [TypographyVariant.P4]: 'text-p4',
  [TypographyVariant.P5]: 'text-p5',
  [TypographyVariant.P6]: 'text-p6',
};

interface BaseProps {
  children?: ReactNode;
  text?: ReactNode;
  variant?: TypographyVariant;
  className?: string;
  truncate?: boolean;
  noWrap?: boolean;
}

export interface TypographyProps extends BaseProps, HTMLAttributes<HTMLElement> {}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    { variant = TypographyVariant.P1, className, children, text, truncate, noWrap, ...rest },
    ref,
  ) => {
    const Tag = tagByVariant[variant];
    const classes = clsx(
      variantClasses[variant],
      truncate && 'truncate',
      noWrap && !truncate && 'whitespace-nowrap',
      className,
    );

    return (
      <Tag className={classes} data-variant={TypographyVariant[variant]} ref={ref as any} {...rest}>
        {children ?? text}
      </Tag>
    );
  },
);
