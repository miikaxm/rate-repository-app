import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "./Theme";

const styles = StyleSheet.create({
  formField: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary || '#000',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
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
  }
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.formField}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />

      <TextInput
        style={styles.formField}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.btnText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;