import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    return AsyncStorage.getItem(this.namespace);
  }

  setAccessToken(accessToken) {
    return AsyncStorage.setItem(this.namespace, accessToken);
  }

  removeAccessToken() {
    return AsyncStorage.removeItem(this.namespace);
  }
}

export default AuthStorage;