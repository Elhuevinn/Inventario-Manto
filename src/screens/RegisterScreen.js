import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, ImageBackground, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { auth } from '../firebase/FirebaseConfig'; // Importar Firebase Auth
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Registro de usuarios
import { getFirestore, setDoc, doc } from 'firebase/firestore'; // Firestore para guardar datos adicionales

const firestore = getFirestore(); // Instancia de Firestore

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Por favor, ingresa tu nombre.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Crear un email ficticio basado en el ID del usuario
    const email = `${userId}@miapp.com`;

    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar información adicional en Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        username: userId,
        name: name,
        email: email,
      });

      Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada.');
      navigation.replace('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'El ID ya está en uso.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'El ID es inválido.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'La contraseña es demasiado débil.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require('C:/Project_Paradisus/appscanner/MiAppQR (4)/MiAppQR/assets/beach-6517214_1280.jpg')} // Ruta del fondo
      style={styles.background}
      resizeMode="cover"
    >

      {/* Tarjeta principal */}
      <View style={styles.overlay}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Registrarse</Text>
            <TextInput
              placeholder="Nombre Completo"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="ID de Usuario (solo números)"
              value={userId}
              onChangeText={setUserId}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
            />
            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              buttonColor="#536653"
            >
              Registrarse
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              textColor="#536653"
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 10, // Ajusta según el diseño
    alignSelf: 'center',
    zIndex: 1,
  },
  logo: {
    width: 150,
    height: 150, // Ajusta el tamaño del logo
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Oscurecimiento para destacar la tarjeta
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo semitransparente
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#536653',
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  registerButton: {
    marginTop: 20,
    padding: 10,
  },
});

export default RegisterScreen;
