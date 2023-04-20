import { useSwitchValue } from '@appello/common/lib/hooks';
import type { Meta } from '@storybook/react';
import React from 'react';

import { Modal } from '.';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

const Template: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { value: isOpen, on: openModal, off: closeModal } = useSwitchValue(false);
  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <Modal isOpen={isOpen} title="Lorem ipsum dolor sit amet" close={closeModal}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, amet aspernatur corporis
        cum dignissimos doloribus earum eius eveniet exercitationem harum.
      </Modal>
    </>
  );
};

export const Standard = Template.bind({});
