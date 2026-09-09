import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import theme from "./Theme";
import { Button } from "react-native-paper";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  review: {
    flexDirection: "row",
    flexWrap: 'wrap',
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
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 16,
    gap: 16,
  },
  deleteBtn: {
    flex: 1
  },
  viewBtn: {
    flex: 1
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
              id
            }
          }
        }
      }
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;


const ReviewItem = ({ review }) => {
  const navigate = useNavigate()

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: {
      deleteReviewId: review.id,
    },
    optimisticResponse: {
      deleteReview: true,
    },
    refetchQueries: [
      {
        query: GET_CURRENT_USER_REVIEWS,
        variables: {
          includeReviews: true,
        }
      }
    ]
  });

  const repoView = (id) => {
    navigate(`/srv/${id}`)
  }

  const handleDelete = async () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Review deletion rejected by user'),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteReview()
          console.log('Review deleted')
        },
      }
    ])
  };

  
  return (
    <View style={styles.review}>
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>

      {/* Review content */}
      <View style={styles.reviewContent}>
        <Text style={styles.username}>
          {review.repository.fullName}
        </Text>

        <Text style={styles.date}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>

        <Text style={styles.reviewText}>
          {review.text}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={() => {repoView(review.repository.id)}}
          style={styles.viewBtn}
        >
          View repository
        </Button>

        <Button
          mode="contained"
          onPress={handleDelete}
          buttonColor="#dc3545"
          style={styles.deleteBtn}
        >
          Delete review
        </Button>
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