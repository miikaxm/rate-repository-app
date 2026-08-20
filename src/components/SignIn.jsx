import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "./Theme";
import * as yup from 'yup';

import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

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
    padding: 20
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
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const [singIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const { data } = await singIn({ username, password });
        console.log(data);
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    },
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
        onBlur={formik.handleBlur('username')}
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
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.btnText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;