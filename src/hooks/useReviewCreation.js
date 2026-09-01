import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      createdAt
      repository {
        fullName
      }
      repositoryId
      text
      user {
        username
      }
      userId
      rating
    }
  }
`;

const useReviewCreation = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating,
          text
        },
      },
    });

    return { data };
  };
  return [createReview, result];
};

export default useReviewCreation;