import { ApolloClient, InMemoryCache} from '@apollo/client';

const token = localStorage.getItem('token');
export const client = new ApolloClient({
  uri: 'http://localhost:4000/api/v1',
  cache: new InMemoryCache(),
  headers:{
     authorization: token ? `Bearer ${token}` : '',
  }
});