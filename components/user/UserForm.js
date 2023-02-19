import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Row, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import Card from "../ui/Card";
import UserSchema from "../../schemas/UserSchema";
import classes from "./UserForm.module.css";

function UserForm(props) {
  const userLoading = useSelector((state) => state.user.userLoading);
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === props.userId)
  );
  const router = useRouter();

  const [initialValues,setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    gender: "",
    ...user, // override initial values if user is available
  });

  //get random user image
  const getUserImage = (values) => {
    return `https://randomuser.me/api/portraits/${
      values.gender == "m" ? "men" : "women"
    }/${Math.floor(Math.random() * 100)}.jpg`;
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    props.onHandleUser(
      {
        ...values,
        photo: user?.photo
          ? user.gender == values.gender
            ? user.photo
            : getUserImage(values)
          : getUserImage(values),
      },
      () => {
        setSubmitting(false);
        resetForm();
        router.push("/");
      }
    );
  };

  return (
    <Card>
      <Formik
        data-testid="NewUserForm"
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group md="4" controlId="first_name">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  data-testid="input-FName"
                  value={values.first_name}
                  onChange={handleChange}
                  isInvalid={touched.first_name && errors.first_name}
                  isValid={touched.first_name && !errors.first_name}
                />
                <Form.Control.Feedback type="invalid" data-testid="error-Fname">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="last_name">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  data-testid="input-LName"
                  value={values.last_name}
                  onChange={handleChange}
                  isValid={touched.last_name && !errors.last_name}
                  isInvalid={touched.last_name && errors.last_name}
                />
                <Form.Control.Feedback type="invalid" data-testid="error-LName">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  data-testid="input-Email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid" data-testid="error-email">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="number">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="number"
                  data-testid="input-Number"
                  value={values.number}
                  onChange={handleChange}
                  isValid={touched.number && !errors.number}
                  isInvalid={touched.number && errors.number}
                />
                <Form.Control.Feedback type="invalid" data-testid="error-number">
                  {errors.number}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  data-testid="input-Gender"
                  value={values.gender}
                  onChange={handleChange}
                  isValid={touched.gender && !errors.gender}
                  isInvalid={touched.gender && errors.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid" data-testid="error-gender">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className={classes.actions}>
              <Button
                type="submit"
                variant="outline-primary"
                disabled={userLoading}
              >
                {props.isUpdate ? "Save" : "Add"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default UserForm;
