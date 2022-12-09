import { Button, ButtonProps } from '@ui/components/common/Button';
import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import * as React from 'react';
import ReactModal from 'react-modal';

import styles from './styles.module.scss';

export interface ModalProps {
  isOpen: boolean;
  close(): void;
  title?: string;
  buttons?: ButtonProps[];
  children: React.ReactNode;
  withCloseButton?: boolean;
  contentClassName?: string;
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
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      appElement={app}
      onRequestClose={close}
      contentLabel={title}
      className={clsx(styles['container'], contentClassName)}
      overlayClassName={styles['overlay']}
    >
      {withCloseButton && (
        <button type="button" className={styles['close-btn']} onClick={close}>
          <Icon name="close" size={20} />
        </button>
      )}
      {title && <h2 className="text-h4 mb-2.5">{title}</h2>}
      <div>{children}</div>
      {buttons && buttons.length > 0 && (
        <div className={styles['buttons-list']}>
          {buttons.map((props, index) => (
            <Button key={index} {...props} className={styles['button']} />
          ))}
        </div>
      )}
    </ReactModal>
  );
};
