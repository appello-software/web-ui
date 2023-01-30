import './styles.scss';

import { isString } from '@appello/common/lib/utils/string';
import { Button, ButtonProps } from '@ui/components/common/Button';
import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import * as React from 'react';
import { ReactNode } from 'react';
import ReactModal from 'react-modal';

export interface ModalProps {
  isOpen: boolean;
  close(): void;
  title?: ReactNode;
  buttons?: ButtonProps[];
  children: React.ReactNode;
  withCloseButton?: boolean;
  contentClassName?: string;
  bodyClassName?: string;
  position?: 'center' | 'right';
  shouldCloseOnOverlayClick?: boolean;
}

const app = document.querySelector('#root') as HTMLElement;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  close,
  title,
  buttons,
  children,
  contentClassName,
  bodyClassName,
  withCloseButton = true,
  position = 'center',
  shouldCloseOnOverlayClick = true,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      appElement={app}
      onRequestClose={close}
      contentLabel={isString(title) ? title : undefined}
      className={clsx('modal', `modal--${position}`, contentClassName)}
      overlayClassName="modal-overlay"
      shouldCloseOnEsc={shouldCloseOnOverlayClick}
      bodyOpenClassName="react-modal-opened"
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {withCloseButton && (
        <button type="button" className="modal__close-btn" onClick={close}>
          <Icon name="close" size={20} />
        </button>
      )}
      {title && <div className="modal__header">{title}</div>}
      <div className={clsx('modal__content', bodyClassName)}>{children}</div>
      {buttons && buttons.length > 0 && (
        <div className="modal__buttons-list">
          {buttons.map((props, index) => (
            <Button key={index} {...props} className={clsx('modal__button', props.className)} />
          ))}
        </div>
      )}
    </ReactModal>
  );
};
