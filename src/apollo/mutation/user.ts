import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
        accessToken
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: SignUpInput!) {
    signup(input: $input)
  }
`;