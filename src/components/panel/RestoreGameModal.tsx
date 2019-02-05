import React from "react";
import { Button, Modal } from "semantic-ui-react";

interface RestoreGameModalProps {
  open: boolean;
  handleClose: () => void;
  handleRestore: () => Promise<void>;
}

const RestoreGameModal = (props: RestoreGameModalProps) => {
  const { open, handleClose, handleRestore } = props;

  return (
    <Modal size={"tiny"} open={open} onClose={handleClose}>
      <Modal.Header>Restore Game</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to restore game?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleClose}>
          No
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Yes"
          onClick={() => {
            handleRestore();
            handleClose();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default RestoreGameModal;
