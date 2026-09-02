import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const SIGNUP = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
      username
    }
  }
`;

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    return { data };
  };

  return [signUp, result];
};

export default useSignUp;