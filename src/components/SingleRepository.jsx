import { FlatList, Text, View, StyleSheet } from "react-native";
import RepositoryView from "./SingleRepositoryView";
import { useParams } from "react-router-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import theme from "./Theme";

const styles = StyleSheet.create({
  review: {
    flexDirection: "row",
    padding: 16,
    marginTop: 10,
    backgroundColor: "white",
  },
  ratingContainer: {
    width: 48,
    height: 48,
    marginRight: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  rating: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: "#757575",
    fontSize: 12,
    marginBottom: 8,
  },
  reviewText: {
    color: "#424242",
    fontSize: 14,
    lineHeight: 20,
  },
});

const GET_REVIEWS = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.review}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REVIEWS, {
    variables: { id },
  });

  console.log(data);
  console.log(error);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const reviews = data?.repository?.reviews?.edges?.map(
    (edge) => edge.node
  ) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryView />}
    />
  );
};

export default SingleRepository;