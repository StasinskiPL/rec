import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import FormComponent from "./Form";

const AddUser = () => {
  return (
    <Container className="mt-5 p-0 d-flex flex-column align-items-center">
      <Header title="Add User" />
      <FormComponent />
    </Container>
  );
};

export default AddUser;
