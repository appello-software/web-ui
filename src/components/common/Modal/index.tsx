import './styles.scss';

import { isString } from '@appello/common/lib/utils/string';
import clsx from 'clsx';
import * as React from 'react';
import { ReactNode } from 'react';
import ReactModal from 'react-modal';

import { Button, ButtonProps } from '~/components/common/Button';
import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

export interface ModalProps {
  /**
   * Open state
   */
  isOpen: boolean;
  /**
   * Close handler
   */
  close(): void;
  /**
   * Title
   */
  title?: ReactNode;
  /**
   * Footer buttons
   */
  buttons?: ButtonProps[];
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Show close button
   */
  withCloseButton?: boolean;
  /**
   * Additional class name for modal content
   */
  contentClassName?: string;
  /**
   * Additional class name for modal body
   */
  bodyClassName?: string;
  /**
   * Content position
   */
  position?: 'center' | 'right';
  /**
   * Close on overlay click
   */
  shouldCloseOnOverlayClick?: boolean;
  /**
   * Callback that will be called after modal is closed
   */
  onAfterClose?: () => void;
}

const app = document.querySelector('#root') as HTMLElement;

export const Modal: React.FC<ModalProps> = props => {
  const {
    isOpen,
    close,
    title,
    buttons,
    children,
    contentClassName,
    bodyClassName,
    onAfterClose,
    withCloseButton = true,
    position = 'center',
    shouldCloseOnOverlayClick = true,
  } = useCombinedPropsWithKit({
    name: 'Modal',
    props,
  });

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
      onAfterClose={onAfterClose}
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
          {buttons.map(({ className, ...props }, index) => (
            <Button key={index} {...props} className={clsx('modal__button', className)} />
          ))}
        </div>
      )}
    </ReactModal>
  );
};
