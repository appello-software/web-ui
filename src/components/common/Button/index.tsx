import './styles.scss';

import { isNil } from '@appello/common';
import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '~/components/common/Icon';
import { Loader } from '~/components/common/Loader';
import { useCombinedPropsWithKit } from '~/hooks';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  NEGATIVE = 'negative',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ButtonProps {
  /**
   * Button variant
   */
  variant?: ButtonVariant;
  /**
   * Button label
   */
  label?: string;
  /**
   * Is button loading
   */
  isLoading?: boolean;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Button size
   */
  size?: ButtonSize;
  /**
   * Click handler
   * @param e
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Link to
   */
  to?: string;
  /**
   * Button type
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /**
   * Button icon
   */
  withIcon?: string;
  /**
   * Icon class name
   */
  iconClassName?: string;
  /**
   * Button children
   */
  children?: React.ReactNode;
  /**
   * Is button disabled
   */
  disabled?: boolean;
  /**
   * Set icon after
   */
  iconAfter?: boolean;
  /**
   * Set rounded
   */
  rounded?: boolean;
  /**
   * Set bold
   */
  bold?: boolean;
  /**
   * Count value
   */
  count?: number;
  /**
   * Set full width
   */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = props => {
  const {
    type = 'button',
    label,
    size = ButtonSize.MEDIUM,
    className,
    onClick,
    withIcon,
    iconClassName,
    variant,
    fullWidth = true,
    children,
    disabled,
    isLoading,
    count,
    rounded = false,
    iconAfter = false,
    bold = false,
    to,
  } = useCombinedPropsWithKit({
    name: 'Button',
    props,
  });

  const navigate = useNavigate();

  const combinedClassName = React.useMemo(() => {
    return clsx(
      'button',
      variant ? `button--${variant}` : undefined,
      `button--size-${size}`,
      {
        'button--full': fullWidth,
        'button--rounded': rounded,
        'button--bold': bold,
        'button--disabled': disabled,
        'button--only-icon': [label, children, count].every(isNil) && withIcon,
      },
      className,
    );
  }, [
    disabled,
    variant,
    size,
    rounded,
    bold,
    label,
    children,
    count,
    withIcon,
    className,
    fullWidth,
  ]);

  const renderIcon = React.useCallback(() => {
    if (!withIcon) {
      return null;
    }

    return (
      <Icon
        className={clsx('button__icon', iconClassName)}
        height={18}
        name={withIcon}
        width={18}
      />
    );
  }, [iconClassName, withIcon]);

  return (
    <button
      className={combinedClassName}
      disabled={isLoading || disabled}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={to ? () => navigate(to) : onClick}
    >
      <div
        className={clsx('button__label', {
          'button__label--hidden': isLoading,
        })}
      >
        {!iconAfter && withIcon && renderIcon()}
        {children ?? label}
        {!isNil(count) && <p className="button__count">{count}</p>}
        {iconAfter && withIcon && renderIcon()}
      </div>
      {isLoading && (
        <div className="button__loader">
          <Loader colorful={variant === ButtonVariant.SECONDARY} />
        </div>
      )}
    </button>
  );
};
