import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    return mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
  };

  return [signIn, result];
};

export default useSignIn;