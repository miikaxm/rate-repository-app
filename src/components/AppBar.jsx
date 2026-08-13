import { View, StyleSheet, ScrollView} from 'react-native';
import Text from './Text';
import theme from './Theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBarBackground,
    height: 80,
  },
  scrollView: {
    height: 80,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
  },
  link: {
    marginHorizontal: 45,
  },
  linkText: {
    color: 'white',
    fontSize: 22,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Link to="/" underlayColor="transparent" style={styles.link}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.linkText}>
            Repositories
          </Text>
        </Link>

        <Link to="/signIn" underlayColor="transparent" style={styles.link}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.linkText}>
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;