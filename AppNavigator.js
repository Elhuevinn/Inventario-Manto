// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegistroEquipo from './src/components/RegistroEquipo';
import ListaFichas from './src/components/ListaFichas';
import VerFicha from './src/components/VerFicha';
import SettingsScreen from './src/screens/SettingsScreen';
import ManualUsuario from './src/components/ManualUsuario';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTransparent: true, // Hace la barra transparente
            headerTintColor: '#fff', // Color de la flecha
            title: '', // Elimina el título
            headerBackTitleVisible: false, // Oculta el texto del botón de regreso
          }}
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RegistroEquipos" 
          component={RegistroEquipo} 
        />
        <Stack.Screen 
          name="ListaFichas" 
          component={ListaFichas} 
        />
        <Stack.Screen 
          name="VerFicha" 
          component={VerFicha} 
        />
        <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        />
        <Stack.Screen 
        name="Manual" 
        component={ManualUsuario} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
