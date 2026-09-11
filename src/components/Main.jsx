import { View, StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native'

import theme from './Theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateNewReview from './CreateReview';
import SignUp from './SignUp';
import UserReviews from './UsersReviews';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.appBarBackground,
  },

  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <AppBar />

        <Routes>
          <Route path='/' element={<RepositoryList />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/CreateReview' element={<CreateNewReview />} />
          <Route path='/myReviews' element={<UserReviews />} />
          <Route path='/srv/:id' element={<SingleRepository />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </SafeAreaView>
  );
};

export default Main;