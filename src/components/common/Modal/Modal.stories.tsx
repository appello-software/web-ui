import { useSwitchValue } from '@appello/common/lib/hooks';
import type { Meta } from '@storybook/react';
import React from 'react';

import { ButtonVariant } from '~/components';

import { Modal } from '.';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

export const Standard: React.FC = () => {
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

export const WithDescription: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { value: isOpen, on: openModal, off: closeModal } = useSwitchValue(false);
  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <Modal
        isOpen={isOpen}
        title="Lorem ipsum"
        close={closeModal}
        description="Lorem ipsum dolor sit amet"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, amet aspernatur corporis
        cum dignissimos doloribus earum eius eveniet exercitationem harum.
      </Modal>
    </>
  );
};

export const RightPosition: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { value: isOpen, on: openModal, off: closeModal } = useSwitchValue(false);
  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <Modal isOpen={isOpen} title="Lorem ipsum dolor sit amet" close={closeModal} position="right">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, amet aspernatur corporis
        cum dignissimos doloribus earum eius eveniet exercitationem harum.
      </Modal>
    </>
  );
};

export const RightPositionWithDescription: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { value: isOpen, on: openModal, off: closeModal } = useSwitchValue(false);
  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <Modal
        isOpen={isOpen}
        title="Lorem ipsum dolor sit amet"
        close={closeModal}
        position="right"
        description="Lorem ipsum dolor sit amet"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, amet aspernatur corporis
        cum dignissimos doloribus earum eius eveniet exercitationem harum.
      </Modal>
    </>
  );
};

export const WithoutElements: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { value: isOpen, on: openModal, off: closeModal } = useSwitchValue(false);
  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <Modal isOpen={isOpen} withCloseButton={false} close={closeModal}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, amet aspernatur corporis
        cum dignissimos doloribus earum eius eveniet exercitationem harum.
      </Modal>
    </>
  );
};

export const WithButtons: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { value: isOpen, on: openModal, off: closeModal } = useSwitchValue(false);
  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <Modal
        isOpen={isOpen}
        title="Lorem ipsum dolor sit amet"
        close={closeModal}
        buttons={[
          {
            label: 'No',
            variant: ButtonVariant.SECONDARY,
            onClick: closeModal,
          },
          {
            label: 'Yes',
            variant: ButtonVariant.PRIMARY,
            onClick: closeModal,
          },
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, amet aspernatur corporis
        cum dignissimos doloribus earum eius eveniet exercitationem harum.
      </Modal>
    </>
  );
};

export const WithLongContent: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { value: isOpen, on: openModal, off: closeModal } = useSwitchValue(false);
  return (
    <>
      <button type="button" onClick={openModal}>
        Open modal
      </button>
      <Modal isOpen={isOpen} title="Lorem ipsum dolor sit amet" close={closeModal}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, dignissimos dolore illum
        in laboriosam officia tempore. Accusamus, aliquid, possimus. Ab alias aliquid, dignissimos
        ducimus esse excepturi expedita facere fugiat impedit in incidunt magnam modi officia optio
        quia quis quisquam reiciendis rerum unde vel. A aliquid, atque consequatur dicta eius eos
        eum exercitationem, facilis maxime nobis numquam praesentium saepe sed velit veritatis!
        Accusantium adipisci aliquid amet asperiores aspernatur assumenda at autem debitis
        distinctio doloremque ea eligendi enim eos est eum excepturi fugit illum ipsa ipsum minus
        modi molestiae neque nobis non odit officia optio placeat quaerat qui quia quibusdam quis,
        repudiandae rerum saepe soluta temporibus voluptatum. Accusantium consequuntur dolores
        minima quos. Accusantium autem nisi quam quod repellendus, saepe unde veritatis! Dolores
        eligendi expedita pariatur perspiciatis tempore. Accusamus adipisci amet blanditiis cumque
        debitis dolor eum eveniet itaque laboriosam officia, omnis praesentium quam quasi quos
        similique ullam veritatis voluptatum. Aspernatur cum est nisi quos ullam, veritatis? Alias,
        aperiam delectus deserunt eaque exercitationem harum labore, magni, minus nobis non placeat
        quasi vitae! A aperiam at, dolor error est fuga harum id ipsa iste iusto laborum, maxime
        minus nesciunt nihil nobis odio omnis pariatur placeat qui quibusdam quidem quisquam
        recusandae sapiente sit suscipit totam voluptatum? Atque consequatur labore veritatis.
        Beatae dolor saepe sequi sit soluta vel? Adipisci alias, aliquam aspernatur aut, consectetur
        corporis expedita inventore ipsam labore molestias omnis optio perferendis ratione sunt
        tempora voluptatem, voluptatibus. Deleniti, ea, enim facilis harum illum laudantium mollitia
        nam optio perspiciatis porro quos suscipit tempore, temporibus unde voluptas! Ad, aperiam
        aspernatur enim et fugiat, fugit illum laboriosam minus numquam odio, officiis quo
        voluptate? Consequatur cum, deserunt doloremque est, et eveniet exercitationem incidunt
        ipsam itaque magnam molestiae nostrum quam quasi rerum sapiente unde vel! Doloribus eveniet
        ipsam iste modi molestiae neque sed vel, voluptas! Dolor iure perspiciatis sunt. Accusamus
        architecto autem commodi consectetur culpa cum cupiditate eaque eligendi labore minus
        mollitia neque nesciunt omnis porro possimus praesentium, provident quaerat qui quis
        repellendus soluta tempore, totam ullam? Ab aliquam aliquid, assumenda aut doloribus
        dolorum, exercitationem in laudantium modi necessitatibus perspiciatis porro quasi
        recusandae reiciendis saepe sapiente voluptatibus! Aliquid, ex iste nihil recusandae
        temporibus voluptatem. Debitis fuga, iusto libero neque recusandae reiciendis sint
        voluptatem! Asperiores commodi culpa cum dignissimos, dolor dolore dolores dolorum earum et
        eum, exercitationem fuga illo ipsam iusto laborum laudantium magnam natus nihil numquam
        officiis pariatur qui quo suscipit temporibus tenetur vero vitae! Corporis dolore doloremque
        ducimus esse eveniet ex illo illum incidunt ipsa iure laboriosam laborum minima
        necessitatibus, nesciunt nisi placeat possimus quo ratione repellendus tenetur velit vero,
        voluptate. Ad aspernatur dicta dignissimos distinctio ducimus error exercitationem
        laudantium, nam nesciunt numquam quaerat sed similique tempora unde veniam. Beatae
        consequatur debitis dolorem exercitationem fuga iste neque rerum sit! Accusamus ad beatae
        consectetur cum debitis, deleniti dolore esse harum, iste laborum magni nam obcaecati quia
        quisquam quos ratione rem sequi unde voluptatem voluptatibus. A architecto autem
        consequuntur debitis ea, eaque eligendi enim maxime possimus quam? Animi consequatur
        cupiditate dicta doloribus eligendi iure maxime mollitia repellat similique vitae! Dicta,
        provident, voluptas?
      </Modal>
    </>
  );
};
