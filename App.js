import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
<<<<<<< HEAD
import { Provider as PaperProvider } from 'react-native-paper';
=======
import { PaperProvider } from 'react-native-paper';
>>>>>>> 3d4a9f357973439a6b7c7f6a83ffe0083242aa47

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <SafeAreaProvider>
<<<<<<< HEAD
      <PaperProvider>
        <StatusBar style="light" />

=======
      <StatusBar style="light" />

      <PaperProvider>
>>>>>>> 3d4a9f357973439a6b7c7f6a83ffe0083242aa47
        <NativeRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ApolloProvider client={apolloClient}>
            <AuthStorageContext.Provider value={authStorage}>
              <Main />
            </AuthStorageContext.Provider>
          </ApolloProvider>
        </NativeRouter>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;