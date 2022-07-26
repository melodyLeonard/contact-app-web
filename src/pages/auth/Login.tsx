import "./auth.scss";
import { ChangeEvent, useState,SyntheticEvent, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";
import Spinner from "../../components/Spinner";
import { LOGIN } from "../../apollo/mutation/user";
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {login, isAuthenticated} = useAuth()
  const navigate = useNavigate();
  const [variables, setVariables] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    if(isAuthenticated){
      navigate("/dashboard")
    }
  }, [navigate, isAuthenticated]);
  

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const { email, password } = variables;

  const [loginUser, { loading }] = useMutation(LOGIN, {
    update(_, {data:{login:{accessToken}}}) {
      if(accessToken){
        login(accessToken)
      }
    },
    onError: (err) => {
     setError(err?.message)
     setShowAlert(true);
    },
  });

  const onSubmitHandler = (e:SyntheticEvent) => {
    e.preventDefault();
    loginUser({ variables: {input: variables} });
  };

  return (
    <Container className="auth-wrapper justify-content-center">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            {showAlert && (
              <Alert
                style={{ width: "100%", maxWidth: "35rem" }}
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <p className="mb-0 mt-0">
                  {error}
                </p>
              </Alert>
            )}
            <h1 className="text-center">Login</h1>
          </div>
          <Form
            onSubmit={onSubmitHandler}
            style={{ width: "100%" }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={email}
                onChange={onChangeHandler}
                type="email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  className="bg-white border-right-0"
                  name="password"
                  value={password}
                  type={passwordShown ? "text" : "password"}
                  onChange={onChangeHandler}
                />
                  <InputGroup.Text className="bg-white border-left-0 rounded-right">
                    {passwordShown ? (
                      <AiFillEyeInvisible
                        onClick={togglePasswordVisiblity}
                      />
                    ) : (
                      <AiFillEye
                        onClick={togglePasswordVisiblity}
                      />
                    )}
                  </InputGroup.Text>
              </InputGroup>
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
                  Login
                </Button>
              )}
            </div>
          </Form>
          <div>
            <span>Don't have an account? <Link to="/signup">Signup</Link></span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
