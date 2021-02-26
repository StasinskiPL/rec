import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableHeader = () => {
  return (
    <div className="d-flex w-100 px-2 pt-3 justify-content-between">
      <h5>UserList</h5>
      <Button as={Link} to="/add">
        Add New
      </Button>
    </div>
  );
};

export default TableHeader;
