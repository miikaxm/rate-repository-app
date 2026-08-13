import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    height: 120,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

const AppBar = () => {
  return <View style={styles.container}>{/* ... */}
    <Pressable>
      <Text fontWeight="bold" fontSize="subheading" style={{ color: "white"}}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;