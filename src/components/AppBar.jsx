import { View, StyleSheet, ScrollView, Pressable} from 'react-native';
import Text from './Text';
import theme from './Theme';
import { Link } from 'react-router-native';

// Apollo
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useApolloClient } from '@apollo/client/react';

// Storage
import useAuthStorage from '../hooks/useAuthStorage';

const GET_ME = gql`
  query Query {
    me {
      username
    }
  }
`;

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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${authStorage.getAccessToken()}`,
      },
    },
  });

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  if (data?.me === null) {
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
  } else {
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
            <Pressable onPress={signOut}>
              <Text fontWeight="bold" fontSize="subheading" style={styles.linkText}>
                Sign out
              </Text>
            </Pressable>
          </Link>
        </ScrollView>
      </View>
    );
  }
};

export default AppBar;