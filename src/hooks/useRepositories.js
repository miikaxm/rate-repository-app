import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, after: $after, first: $first) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
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

const useRepositories = ({ orderBy, orderDirection, searchKeyword}) => {
  const variables = {
    orderBy,
    orderDirection,
    searchKeyword
  };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
 
    if (!canFetchMore) {
      return;
    }
 
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data ? data.repositories : null,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;