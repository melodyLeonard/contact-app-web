
import { gql } from '@apollo/client';

export const CREATE_CONTACTS = gql`
  mutation AddNewContact($input: ContactInput!) {
    addContact(input: $input) {
        email
        name
        phoneNumber
    }
  }
`;

export const DELETE_CONTACTS = gql`
  mutation DeleteContact($deleteContactId: Float!) {
    deleteContact(id: $deleteContactId)
  }
`;

