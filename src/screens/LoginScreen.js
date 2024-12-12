import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { auth } from '../firebase/FirebaseConfig'; // Importar auth desde Firebaseconfig.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importar la función de inicio de sesión

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!userId || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Convertir el ID numérico a un correo ficticio
    const email = `${userId}@miapp.com`;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('Home'); // Navega a la pantalla principal (Home)
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'Usuario no encontrado');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Contraseña incorrecta');
        } else {
          Alert.alert('Error', 'Usuario o contraseña incorrectos.');
        }
      });
  };

  return (
    <ImageBackground
      source={require('C:/Project_Paradisus/appscanner/MiAppQR (4)/MiAppQR/assets/fondo palmas.jpg')} // Ruta de la imagen
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Contenedor del logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('C:/Project_Paradisus/appscanner/MiAppQR (4)/MiAppQR/assets/logoblanco.png')} // Ruta del logo
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tarjeta de inicio de sesión */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
              mode="outlined"
              label="ID de usuario (solo números)"
              value={userId}
              onChangeText={setUserId}
              style={styles.input}
              keyboardType="numeric"
              autoCapitalize="none"
              outlineColor="#536653"
            />
            <TextInput
              mode="outlined"
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              outlineColor="#536653"
            />
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              buttonColor="#536653"
            >
              Iniciar Sesión
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Register')}
              textColor="#536653"
            >
              ¿No tienes una cuenta? Regístrate
            </Button>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.6, // Ajuste dinámico del tamaño
    height: height * 0.15,
  },
  card: {
    width: '85%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fondo semitransparente
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#536653',
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 8,
  },
});

export default LoginScreen;
