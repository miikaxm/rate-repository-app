import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "./Theme";
import * as yup from 'yup';

import { useNavigate } from "react-router-native";
import useReviewCreation from "../hooks/useReviewCreation";

const styles = StyleSheet.create({
  formField: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary || '#000',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: -8,
    marginBottom: 12,
  },
  view: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  btnText: {
    color: 'white'
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Repository owner name is required'),
  name: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required'),
  review: yup
    .string()
});

const initialValues = {
  owner: "",
  name: "",
  rating: "",
  review: "",
};

export const CreationContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.view}>
      <TextInput
        style={[
          styles.formField,
          formik.touched.owner &&
          formik.errors.owner &&
          styles.errorInput,
        ]}
        placeholder="Repository owner name"
        value={formik.values.owner}
        onChangeText={formik.handleChange("owner")}
        onBlur={formik.handleBlur("owner")}
      />

      {formik.touched.owner && formik.errors.owner && (
        <Text style={styles.errorText}>{formik.errors.owner}</Text>
      )}

      <TextInput
        style={[
          styles.formField,
          formik.touched.name &&
          formik.errors.name &&
          styles.errorInput,
        ]}
        placeholder="Repository name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
      />

      {formik.touched.name && formik.errors.name && (
        <Text style={styles.errorText}>{formik.errors.name}</Text>
      )}

      <TextInput
        style={[
          styles.formField,
          formik.touched.rating &&
          formik.errors.rating &&
          styles.errorInput,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
      />

      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[
          styles.formField,
          formik.touched.review &&
          formik.errors.review &&
          styles.errorInput,
        ]}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        onBlur={formik.handleBlur("review")}
      />

      {formik.touched.review && formik.errors.review && (
        <Text style={styles.errorText}>{formik.errors.review}</Text>
      )}
      

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.btnText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateNewReview = () => {
  const [createReview] = useReviewCreation();
  const navigate = useNavigate();

    const onSubmit = async ({ owner, name, rating, review }) => {
    try {
      const { data } = await createReview({
        ownerName: owner,
        repositoryName: name,
        rating: Number(rating),
        text: review,
      });

      const id = data.createReview.repositoryId;
      navigate(`/srv/${id}`);
      
    } catch (e) {
      console.log(e);
    }
  };

  return <CreationContainer onSubmit={onSubmit} />;
};

export default CreateNewReview;