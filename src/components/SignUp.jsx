import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "./Theme";
import * as yup from 'yup';

import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignup";

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
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(30, 'Password must be at most 30 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required')
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

export const SignUpContainer = ({ onSubmit }) => {
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
          formik.touched.username &&
          formik.errors.username &&
          styles.errorInput,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />

      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.formField,
          formik.touched.password &&
          formik.errors.password &&
          styles.errorInput,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        onBlur={formik.handleBlur("password")}
      />

      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[
          styles.formField,
          formik.touched.passwordConfirm &&
          formik.errors.passwordConfirm &&
          styles.errorInput,
        ]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
        secureTextEntry
        onBlur={formik.handleBlur("passwordConfirm")}
      />

      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirm}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.btnText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signUp({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;