import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { FaSort } from "react-icons/fa";

import Loading from "../Loader/Loading";
import TableRow from "./TableRow";
import DeleteModal from "./DeleteModal";
import { sortUsers } from "../../store/dashboard";

const TABLE_HEADERS = "Id_Name_Username_Email_City_Edit_Delete";

const TableComponent = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { loading, users } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const handlerSort = (type) => {
    if (type !== "Edit" && type !== "Delete") {
      dispatch(sortUsers({ type }));
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (users.length === 0) {
    return <h4 className="text-center py-5">No Users</h4>;
  }
  return (
    <>
      <Table className="mt-4" responsive striped bordered>
        <thead>
          <tr>
            {TABLE_HEADERS.split("_").map((header, i) => (
              <th
                key={header}
                className="text-center cursor-pointer"
                onClick={() => handlerSort(header)}>
                {header} {i < 5 && <FaSort />}
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
