
import { useQuery } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { GET_MY_CONTACTS } from '../apollo/queries/user';
import Spinner from '../components/Spinner';
import './dashboard.scss';
import { SyntheticEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CONTACTS, DELETE_CONTACTS } from '../apollo/mutation/contact';

interface IValues{
  phoneNumber: string
  name: string 
  email: string
  id: number 
}

const Dashboard = () => {
  const { loading, data } = useQuery(GET_MY_CONTACTS);
  const [variables, setVariables] = useState({
      email: "",
      name: "",
      phoneNumber: ""
    });

    const [createNewContact, { loading: loadingNewUser }] = useMutation(CREATE_CONTACTS);

  const [deletContact] = useMutation(DELETE_CONTACTS);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });
  };

    const onSubmitHandler = (e:SyntheticEvent) => {
      e.preventDefault()
      createNewContact({ variables: {input: variables}, refetchQueries: [{query: GET_MY_CONTACTS}] });
  };

  const handleDelete = (id: number) => {
    deletContact({ variables:{ deleteContactId:Number(id) }, refetchQueries: [ {query: GET_MY_CONTACTS}]})
  }

  const {email, name, phoneNumber} = variables
  
  return <Container className='container'>
    {
      loading ? <Spinner /> :
      data && <div className='item-container'>
        {
          data?.userContacts.map(({id, phoneNumber, name, email}:IValues, idx:number) => <div 
          key={idx}
          className="item"
          >
            <span>{phoneNumber}</span>
            <span>{name}</span>
            <span>{email}</span>
           <span>
            <span>
              <Button
                  onClick={() => handleDelete(id)}
                  className="button"
                  variant="danger"
                  disabled={loading}
                >
                  Delete
                </Button>
            </span>
           </span>
          </div>)
        }
      </div>
    }
    <div className='create-contact'>
      <Form
            onSubmit={onSubmitHandler}
            style={{ width: "100%" }}
          >
            <h3>Add New Contact</h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={email}
                onChange={onChangeHandler}
                type="email"
              />
            </Form.Group>
             <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangeHandler}
                type="text"
              />
            </Form.Group>

             <Form.Group controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="name"
                value={name}
                onChange={onChangeHandler}
                type="text"
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
                  disabled={loadingNewUser}
                >
                  Submit
                </Button>
              )}
            </div>
          </Form>
    </div>
  </Container>;
};

export default Dashboard;
