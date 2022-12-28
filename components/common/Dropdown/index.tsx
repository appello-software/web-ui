import './styles.scss';

import { useSwitchValue, useUpdateEffect } from '@appello/common/lib/hooks';
import { useClickAway } from '@appello/web/lib/hooks';
import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import React, { ReactNode, UIEvent, useEffect, useRef } from 'react';

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
  renderOption?: (option: DropdownItem<TValue>) => React.ReactNode;
}

export const Dropdown = <TValue,>({
  items,
  containerWidth,
  onSelect,
  children,
  className,
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
      if (!el?.classList?.contains('dropdown__menu')) {
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

  const rootMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (dropdownIsOpen && rootMenuRef.current) {
      const rect = rootMenuRef.current.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        rootMenuRef.current.style.bottom = '100%';
      }
    }
  }, [dropdownIsOpen]);

  return (
    <div className={clsx('dropdown', className)} ref={containerRef}>
      {children(childrenProps)}
      {dropdownIsOpen && (
        <ul
          className="dropdown__root-menu dropdown__menu"
          style={{ width: containerWidth }}
          ref={rootMenuRef}
        >
          {items.map((item, index) => (
            <Option key={index} option={item} onSelect={handleSelect} renderOption={renderOption} />
          ))}
        </ul>
      )}
    </div>
  );
};

interface OptionProps<TValue> {
  option: DropdownItem<TValue>;
  onSelect: (item: DropdownItem<TValue>) => void;
  renderOption?: (option: DropdownItem<TValue>) => React.ReactNode;
}

const Option = <TValue,>({
  option,
  onSelect,
  renderOption,
}: OptionProps<TValue>): React.ReactElement => {
  const items = option.items;
  const hasSubmenu = !!items;

  const handleClick = React.useCallback(
    (e: UIEvent) => {
      if (hasSubmenu) return;

      e.stopPropagation();
      onSelect(option);
    },
    [onSelect, option],
  );

  const submenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const submenuElement = submenuRef.current;

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const isHTMLElement = entry.target instanceof HTMLElement;
        if (isHTMLElement) {
          const rect = entry.target.getBoundingClientRect();
          if (rect.bottom > window.innerHeight) {
            entry.target.style.top = 'auto';
            entry.target.style.bottom = '0';
          }
        }
      });
    });

    if (submenuElement) {
      observer.observe(submenuElement);
    }

    return () => {
      if (submenuElement) {
        observer.unobserve(submenuElement);
      }
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={clsx('dropdown__option', {
        'dropdown__option--disabled': option.disabled,
        'dropdown__option--with-menu': hasSubmenu,
      })}
      onMouseDown={handleClick}
      onKeyUp={handleClick}
    >
      {hasSubmenu && (
        <ul className="dropdown__menu dropdown__submenu" ref={submenuRef}>
          {items.map((item, index) => (
            <Option key={index} option={item} onSelect={onSelect} renderOption={renderOption} />
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
              className={clsx('dropdown__option-icon', option.iconClassName)}
            />
          )}
          <p className="dropdown__option-label">{option.label}</p>
          {hasSubmenu && (
            <Icon name="polygon" width={6} height={4} className="-rotate-90 ml-auto" />
          )}
          {option.iconAfter && <div className="ml-auto">{option.iconAfter}</div>}
        </>
      )}
    </li>
  );
};
