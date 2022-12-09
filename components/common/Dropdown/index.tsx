import { useSwitchValue, useUpdateEffect } from '@appello/common/lib/hooks';
import { useClickAway } from '@appello/web/lib/hooks';
import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import React, { ReactNode, UIEvent, useRef } from 'react';

import styles from './styles.module.scss';

export interface DropdownItem<TValue = undefined> {
  label: string;
  icon?: string;
  iconClassName?: string;
  iconAfter?: ReactNode;
  items?: DropdownItem<TValue>[];
  value?: TValue;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface DropdownProps<TValue> {
  items: DropdownItem<TValue>[];
  containerWidth?: number | string;
  onSelect?: (value: TValue, option: DropdownItem<TValue>) => void;
  children: (params: { onClick: () => void; isOpen: boolean }) => React.ReactElement;
  className?: string;
  classNamePrefix?: string;
  renderOption?: (option: DropdownItem<TValue>) => React.ReactNode;
}

export const Dropdown = <TValue,>({
  items,
  containerWidth,
  onSelect,
  children,
  className,
  classNamePrefix,
  renderOption,
}: DropdownProps<TValue>): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    value: dropdownIsOpen,
    off: closeDropdown,
    toggle: toggleDropdown,
  } = useSwitchValue(false);

  const childrenProps = React.useMemo(() => {
    return {
      isOpen: dropdownIsOpen,
      onClick: toggleDropdown,
    };
  }, [dropdownIsOpen, toggleDropdown]);

  const handleSelect = React.useCallback(
    (item: DropdownItem<TValue>) => {
      if (item.disabled) {
        return;
      }

      if (item.onSelect) {
        item.onSelect();
      } else if (item.value !== undefined && onSelect) {
        onSelect(item.value, item);
      }
      closeDropdown();
    },
    [closeDropdown, onSelect],
  );

  useClickAway(containerRef, closeDropdown);

  const scrollListener = React.useCallback(
    (e: Event) => {
      const el = e.target as Nullable<HTMLElement>;
      if (!el?.classList?.contains(styles['menu'])) {
        closeDropdown();
      }
    },
    [closeDropdown],
  );

  useUpdateEffect(() => {
    if (dropdownIsOpen) {
      document.addEventListener('scroll', scrollListener, true);
    }
    return () => {
      document.removeEventListener('scroll', scrollListener, true);
    };
  }, [dropdownIsOpen]);

  return (
    <div
      className={clsx(styles['wrapper'], className, {
        [`${classNamePrefix}`]: classNamePrefix,
      })}
      ref={containerRef}
    >
      {children(childrenProps)}
      {dropdownIsOpen && (
        <ul
          className={clsx(styles['container'], styles['menu'], {
            [`${classNamePrefix}__menu`]: classNamePrefix,
          })}
          style={{ width: containerWidth }}
        >
          {items.map((item, index) => (
            <Option
              key={index}
              option={item}
              onSelect={handleSelect}
              renderOption={renderOption}
              classNamePrefix={classNamePrefix}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

interface OptionProps<TValue> {
  option: DropdownItem<TValue>;
  onSelect: (item: DropdownItem<TValue>) => void;
  classNamePrefix?: string;
  renderOption?: (option: DropdownItem<TValue>) => React.ReactNode;
}

const Option = <TValue,>({
  option,
  onSelect,
  classNamePrefix,
  renderOption,
}: OptionProps<TValue>): React.ReactElement => {
  const handleClick = React.useCallback(
    (e: UIEvent) => {
      e.stopPropagation();
      onSelect(option);
    },
    [onSelect, option],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={clsx(styles['option'], {
        [styles['option--disabled']]: option.disabled,
        [`${classNamePrefix}__option`]: classNamePrefix,
        [`${classNamePrefix}__option--disabled`]: classNamePrefix && option.disabled,
        [styles['option--with-menu']]: option.items,
      })}
      onMouseDown={handleClick}
      onKeyUp={handleClick}
    >
      {option.items && (
        <ul className={clsx(styles['menu'], styles['submenu'])}>
          {option.items.map((item, index) => (
            <Option
              key={index}
              option={item}
              onSelect={onSelect}
              renderOption={renderOption}
              classNamePrefix={classNamePrefix}
            />
          ))}
        </ul>
      )}
      {renderOption && renderOption(option)}
      {!renderOption && (
        <>
          {option.icon && (
            <Icon
              name={option.icon}
              width={16}
              height={16}
              className={clsx(
                styles['option__icon'],
                {
                  [`${classNamePrefix}__option-icon`]: classNamePrefix,
                },
                option.iconClassName,
              )}
            />
          )}
          <p
            className={clsx(styles['option__label'], {
              [`${classNamePrefix}__option-label`]: classNamePrefix,
            })}
          >
            {option.label}
          </p>
          {option.items && (
            <Icon name="polygon" width={6} height={4} className="-rotate-90 ml-auto" />
          )}
          {option.iconAfter && <div className="ml-auto">{option.iconAfter}</div>}
        </>
      )}
    </li>
  );
};
