import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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


const GET_CURRENT_USER_REVIEWS = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            id
            rating
            text
            repository {
              fullName
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
        <Text style={styles.username}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER_REVIEWS, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.log(error)
    return <Text>Error loading reviews: {error.message}</Text>;
  }

  const reviews = data?.me?.reviews?.edges?.map(
    (edge) => edge.node
  ) ?? [];

  if (reviews.length === 0) {
    return <Text>This user has zero reviews</Text>
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default UserReviews;