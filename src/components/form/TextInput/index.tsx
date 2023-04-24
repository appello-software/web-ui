import './styles.scss';

import { useCombinedRef } from '@appello/common/lib/hooks/useCombinedRef';
import clsx from 'clsx';
import * as React from 'react';
import { FC, ReactNode, useMemo } from 'react';

export interface TextInputProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'autoComplete' | 'size' | 'value'> {
  error?: boolean;
  autoComplete?: boolean | string;
  size?: InputSize;
  iconBeforeElement?: ReactNode;
  iconAfterElement?: ReactNode;
  onIconBeforeClick?: (value: string) => void;
  onIconAfterClick?: (value: string) => void;
  inputClassName?: string;
}

export enum InputSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      inputClassName,
      placeholder,
      autoComplete,
      error = false,
      size = InputSize.MEDIUM,
      type = 'text',
      iconBeforeElement,
      iconAfterElement,
      onIconBeforeClick,
      onIconAfterClick,
      ...inputProps
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);

    const autoCompleteAttribute = useMemo(() => {
      if (typeof autoComplete === 'boolean') {
        return autoComplete ? undefined : 'off';
      }
      return autoComplete;
    }, [autoComplete]);

    const wrapAsideIconClick = (
      onClick: TextInputProps['onIconBeforeClick'],
    ): (() => void) | undefined => {
      if (!onClick) {
        return undefined;
      }

      return () => {
        onClick(innerRef.current?.value ?? '');
      };
    };

    return (
      <div className={clsx('text-input-wrapper', className)}>
        <input
          ref={useCombinedRef(ref, innerRef)}
          className={clsx(inputClassName, 'form__input', `form__input--size-${size}`, {
            'form__input--error': Boolean(error),
            'form__input--with-icon-before': Boolean(iconBeforeElement),
            'form__input--with-icon-after': Boolean(iconAfterElement),
          })}
          placeholder={placeholder}
          autoComplete={autoCompleteAttribute}
          type={type}
          {...inputProps}
        />
        {iconBeforeElement && (
          <AsideIcon position="before" onClick={wrapAsideIconClick(onIconBeforeClick)}>
            {iconBeforeElement}
          </AsideIcon>
        )}
        {iconAfterElement && (
          <AsideIcon position="after" onClick={wrapAsideIconClick(onIconAfterClick)}>
            {iconAfterElement}
          </AsideIcon>
        )}
      </div>
    );
  },
);

interface AsideIconProps {
  onClick?: () => void;
  children: ReactNode;
  position: 'before' | 'after';
}

const AsideIcon: FC<AsideIconProps> = ({ onClick, children, position }) => {
  const className = useMemo(() => {
    return clsx('form__input-icon', 'form__input-icon--after', {
      'form__input-icon--after': position === 'after',
      'form__input-icon--before': position === 'before',
      'form__input-icon--clickable': onClick,
    });
  }, [onClick, position]);

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <div className={className}>{children}</div>;
};
