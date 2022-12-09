import { isNil } from '@appello/common/lib/utils';
import { Icon } from '@ui/components/common/Icon';
import { Loader } from '@ui/components/common/Loader';
import clsx from 'clsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

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
  variant?: ButtonVariant;
  label?: string;
  isLoading?: boolean;
  className?: string;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  withIcon?: string;
  iconClassName?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  iconAfter?: boolean;
  rounded?: boolean;
  bold?: boolean;
  count?: number;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  label,
  size = ButtonSize.MEDIUM,
  className,
  onClick,
  withIcon,
  iconClassName,
  variant,
  children,
  disabled,
  isLoading,
  count,
  rounded = false,
  iconAfter = false,
  bold = false,
  to,
}) => {
  const navigate = useNavigate();

  const combinedClassName = React.useMemo(() => {
    return clsx(
      styles['button'],
      variant ? styles[`button--${variant}`] : undefined,
      styles[`button--size-${size}`],
      {
        [styles['button--rounded']]: rounded,
        [styles['button--bold']]: bold,
        [styles['button--disabled']]: disabled,
        [styles['button--only-icon']]: [label, children, count].every(isNil) && withIcon,
      },
      className,
    );
  }, [variant, size, rounded, bold, disabled, label, children, count, withIcon, className]);

  const renderIcon = React.useCallback(() => {
    if (!withIcon) {
      return null;
    }

    return (
      <Icon
        name={withIcon}
        width={18}
        height={18}
        className={clsx(styles['button__icon'], iconClassName)}
      />
    );
  }, [iconClassName, withIcon]);

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={combinedClassName}
      onClick={to ? () => navigate(to) : onClick}
      disabled={isLoading || disabled}
    >
      <div
        className={clsx(styles['button__label'], {
          [styles['button__label--hidden']]: isLoading,
        })}
      >
        {!iconAfter && withIcon && renderIcon()}
        {children ?? label}
        {!isNil(count) && <p className={styles['button__count']}>{count}</p>}
        {iconAfter && withIcon && renderIcon()}
      </div>
      {isLoading && (
        <div className={styles['button__loader']}>
          <Loader />
        </div>
      )}
    </button>
  );
};
