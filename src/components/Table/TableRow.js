import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../../store/dashboard";

const TableRow = ({ user, setOpenDeleteModal }) => {
  const { id, name, username, email, address } = user;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEdit = () => {
    dispatch(selectUser(id));
    history.push("/edit");
  };

  const handleDelete = () => {
    dispatch(selectUser(id));
    setOpenDeleteModal(true);
  };

  return (
    <tr className="text-center">
      <td>{id}</td>
      <td>{name}</td>
      <td>{username}</td>
      <td>{email || "email"}</td>
      <td>{address?.city}</td>
      <td>
        <Button size="sm" variant="warning" onClick={handleEdit}>
          Edit
        </Button>
      </td>
      <td>
        <Button size="sm" variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
