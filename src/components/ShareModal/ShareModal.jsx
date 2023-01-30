import { Modal } from '@mantine/core';
import PostShare from '../PostShare/PostShare';

function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size = "55%"
        title="Introduce yourself!"
      >
        <PostShare/>
      </Modal>
    </>
  );
}

export default ShareModal;
