import './styles.scss';

import { Button, ButtonProps } from '@ui/components/common/Button';
import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import * as React from 'react';
import ReactModal from 'react-modal';

export interface ModalProps {
  isOpen: boolean;
  close(): void;
  title?: string;
  buttons?: ButtonProps[];
  children: React.ReactNode;
  withCloseButton?: boolean;
  contentClassName?: string;
  position?: 'center' | 'right';
}

const app = document.querySelector('#root') as HTMLElement;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  close,
  title,
  buttons,
  children,
  contentClassName,
  withCloseButton = true,
  position = 'center',
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      appElement={app}
      onRequestClose={close}
      contentLabel={title}
      className={clsx('modal', `modal--${position}`, contentClassName)}
      overlayClassName="modal-overlay"
      shouldCloseOnEsc
      bodyOpenClassName="react-modal-opened"
    >
      {withCloseButton && (
        <button type="button" className="modal__close-btn" onClick={close}>
          <Icon name="close" size={20} />
        </button>
      )}
      {title && <div className="modal__header">{title}</div>}
      <div className="modal__content">{children}</div>
      {buttons && buttons.length > 0 && (
        <div className="modal__buttons-list">
          {buttons.map((props, index) => (
            <Button key={index} {...props} className="modal__button" />
          ))}
        </div>
      )}
    </ReactModal>
  );
};
