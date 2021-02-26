import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { editUser, resetEditUserState } from "../../store/dashboard";

const schema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  city: yup.string().required(),
});

const INPUTS = ["name", "email", "username", "city"];

const EditForm = () => {
  const { selectedUser, users, editUserState } = useSelector(
    (state) => state.dashboard
  );
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [userValues] = useState(users.find((user) => user.id === selectedUser));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (editUserState === "fulfilled") {
      dispatch(resetEditUserState());
      history.push("/");
    }
  }, [editUserState, dispatch, history]);

  const onSubmit = (data) => {
    const updatedUser = {
      ...userValues,
      name: data.name,
      username: data.username,
      email: data.email,
      address: {
        ...userValues.address,
        city: data.city,
      },
    };
    dispatch(editUser({ user: updatedUser }));
  };
  return (
    <Form
      className="mt-5 border w-100 p-2 border-light"
      style={{ maxWidth: "600px" }}
      onSubmit={handleSubmit(onSubmit)}>
      {INPUTS.map((input) => {
        const defaultValue =
          input === "city" ? userValues.address.city : userValues[input];
        return (
          <Form.Group key={input} className="d-flex align-items-center">
            <Form.Label className="px-2">{input}</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                isInvalid={errors[input]}
                name={input}
                ref={register}
                defaultValue={defaultValue}
              />
              <Form.Control.Feedback type="invalid">
                {errors[input]?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      })}
      <FormFooter />
    </Form>
  );
};

const FormFooter = () => {
  const { editUserState } = useSelector((state) => state.dashboard);

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
        {editUserState === "pending" ? "Loading..." : "Submit"}
      </Button>
    </Form.Row>
  );
};

export default EditForm;
