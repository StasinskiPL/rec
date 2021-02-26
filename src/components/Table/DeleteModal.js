import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/dashboard";

const DeleteModal = ({ setOpenDeleteModal, openDeleteModal }) => {
  const handleClose = () => setOpenDeleteModal(false);

  const { selectedUser } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser) {
      setOpenDeleteModal(false);
    }
  }, [selectedUser, setOpenDeleteModal]);

  const handleDelete = () => {
    dispatch(deleteUser({ id: selectedUser }));
  };

  return (
    <Modal show={openDeleteModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to delete user with id: <strong>{selectedUser}</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
