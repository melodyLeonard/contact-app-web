import "./auth.scss";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Spinner from "../../components/Spinner";
import { SIGNUP } from '../../apollo/mutation/user';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [variables, setVariables] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState<string>('danger');
  const [success, setSucess] = useState<string | null>(null);
  const navigate = useNavigate();

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });
  };
  const { email, firstName, lastName, password } = variables;

  const [registerUser, { loading }] = useMutation(SIGNUP, {
    update(_, {data}) {
      setShowAlert(true);
      setSucess(data?.signup)
      if(data?.signup === 'Accounts successflly created, please login to view dashboard'){
        setVariant('success')
        setTimeout(() => {
           setVariant('danger')
           navigate("/login")
        }, 5000);
      }
    },
    onError: (err) => {
     setError(err?.message)
     setShowAlert(true);
    },
  });

  const onSubmitHandler = (e:SyntheticEvent) => {
    e.preventDefault();

    registerUser({ variables: {input: variables}  });
  };

  return (
    <Container className="auth-wrapper justify-content-center">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            {showAlert && (
              <Alert
                style={{ width: "100%", maxWidth: "35rem" }}
                variant={variant}
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <p className="mb-0 mt-0">{error || success}</p>
              </Alert>
            )}
            <h1 className="text-center">Signup</h1>
          </div>
          <Form onSubmit={onSubmitHandler} style={{ width: "100%" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={email}
                onChange={onChangeHandler}
                type="email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                name="firstName"
                value={firstName}
                type="text"
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                name="lastName"
                value={lastName}
                type="text"
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={password}
                type="password"
                onChange={onChangeHandler}
              />
            </Form.Group>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              {loading ? (
                <Spinner />
              ) : (
                <Button
                  className="button"
                  variant="primary"
                  type="submit"
                  disabled={loading}
                >
                  Singup
                </Button>
              )}
            </div>
          </Form>
             <div>
            <span>Already have an account?  <Link to="/login">Login</Link></span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
