import { gql } from "@apollo/client";

export const GET_MY_CONTACTS = gql`
  query GetMyContact {
    userContacts {
    id
    email
    name
    phoneNumber
  }
  }
`;

export const GET_SINGLE_CONTACT = gql`
  query GetSingleContact($contactId: Int!) {
    userContacts(contactId: $contactId) {
    id
    email
    name
    phoneNumber
  }
  }
`;