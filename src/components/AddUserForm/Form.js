import { useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailValidation } from "../../helpers/emailValidation";
import { addUser, resetAddUserState } from "../../store/dashboard";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const { addUserState } = useSelector((state) => state.dashboard);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (addUserState === "fulfilled") {
      dispatch(resetAddUserState());
      history.push("/");
    }
  }, [addUserState, dispatch, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(null);
    setEmailError(null);

    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!email) {
      console.log("w");
      setEmailError("Email is required");
      return;
    }
    if (!emailValidation(email)) {
      setEmailError("Your email doesn't match");
      return;
    }
    const user = {
      name,
      email,
    };
    dispatch(addUser({ user }));
  };

  return (
    <Form
      className="mt-5 border w-100 p-2 border-light"
      style={{ maxWidth: "600px" }}
      onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="d-flex align-items-center">
        <Form.Label className="px-2">Name</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            isInvalid={nameError}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {nameError}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
      <Form.Group className="d-flex align-items-center">
        <Form.Label className="px-2">Email</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            isInvalid={emailError}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <FormFooter />
    </Form>
  );
};

const FormFooter = () => {
  const { addUserState } = useSelector((state) => state.dashboard);

  const history = useHistory();

  const handleCancel = () => {
    history.push("/");
  };
  return (
    <Form.Row className="justify-content-end p-2">
      <Button onClick={handleCancel} size="sm" variant="outline-danger">
        Cancel
      </Button>
      <Button size="sm" className="ml-2" type="submit" variant="success">
        {addUserState === "pending" ? "Loading..." : "Submit"}
      </Button>
    </Form.Row>
  );
};

export default FormComponent;
