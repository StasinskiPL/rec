import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import EditForm from "./EditForm";

const EditUser = () => {
  const { selectedUser } = useSelector((state) => state.dashboard);

  if (!selectedUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-5 p-0 d-flex flex-column align-items-center">
      <Header title="Edit User" />
      <EditForm />
    </Container>
  );
};

export default EditUser;
