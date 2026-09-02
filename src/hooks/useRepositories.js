import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export const GET_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    ){
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      ) {
      edges {
        node {
          id
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          url
          reviews {
            edges {
              node {
                id
                text
                rating
                createdAt
                user{
                  id
                  username
                }
              }
            }
          }
        }
      }
    }
  }
`

const useRepositories = ({ orderBy, orderDirection }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy,
      orderDirection,
    },
  });

  return {
    repositories: data ? data.repositories : null,
    loading,
    error,
  };
};

export default useRepositories;