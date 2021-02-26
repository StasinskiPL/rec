import { Button } from "react-bootstrap";

const TableRow = ({ user }) => {
  const {
    id,
    name,
    username,
    email,
    address: { city },
  } = user;
  return (
    <tr className="text-center">
      <td>{id}</td>
      <td>{name}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{city}</td>
      <td>
        <Button size="sm" variant="warning">
          Edit
        </Button>
      </td>
      <td>
        <Button size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
