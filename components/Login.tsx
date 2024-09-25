import React from 'react';
import { View, Button } from 'react-native';
import { useKeycloak } from '@react-keycloak/native';

const Login = () => {
  const { keycloak } = useKeycloak();

  const loginByKeycloak = async () => {
    console.log(keycloak);
    if (keycloak) {
      await keycloak.login();
    } else {
      console.error('Keycloak is not initialized');
    }
  };

  const registerByKeycloak = async () => {
    if (keycloak) {
      await keycloak.login();
    } else {
      console.error('Keycloak is not initialized');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <Button onPress={loginByKeycloak} title='Register' />
      <Button onPress={registerByKeycloak} title='Login' />
    </View>
  );
};

export default Login;
