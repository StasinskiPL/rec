import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

import Loading from "../Loader/Loading";
import TableRow from "./TableRow";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const TABLE_HEADERS = "Id_Name_Username_Email_City_Edit_Delete";

const TableComponent = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { loading, users } = useSelector((state) => state.dashboard);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Table className="mt-4" responsive striped bordered>
        <thead>
          <tr>
            {TABLE_HEADERS.split("_").map((header) => (
              <th key={header} className="text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          ))}
        </tbody>
      </Table>
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
};

export default TableComponent;
