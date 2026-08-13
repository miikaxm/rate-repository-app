import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from './Theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBarBackground,
    height: 80,
    justifyContent: 'space-around',
    paddingTop: 25,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return <View style={styles.container}>{/* ... */}
    <Link to="/" underlayColor="transparent">
      <Text fontWeight="bold" fontSize="subheading" style={{ color: "white", fontSize: 22}}>Repositories</Text>
    </Link>

    <Link to="/signIn" underlayColor="transparent">
      <Text fontWeight="bold" fontSize="subheading" style={{ color: "white", fontSize: 22}}>Sign in</Text>
    </Link>
  </View>;
};

export default AppBar;