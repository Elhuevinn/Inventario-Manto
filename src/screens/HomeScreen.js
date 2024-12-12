import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    navigation.replace('Login'); // Redirigir a la pantalla de Login
  };

  const handleSettings = () => {
    // Redirigir a la pantalla de ajustes
    navigation.navigate('Settings'); // Asegúrate de tener configurada esta pantalla
  };

  return (
    <ImageBackground
      source={require('C:/Project_Paradisus/appscanner/MiAppQR (4)/MiAppQR/assets/descarga.jpeg')} // Ruta de tu imagen de fondo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Botones de ajustes y cerrar sesión */}
        <View style={styles.topButtons}>
          <TouchableOpacity onPress={handleSettings} style={styles.iconButton}>
            <MaterialCommunityIcons name="cog" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
            <MaterialCommunityIcons name="logout" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Título de bienvenida */}
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>

        {/* Botones de navegación */}
        <Button
          mode="contained"
          icon={() => (
            <MaterialCommunityIcons name="qrcode-plus" size={24} color="white" />
          )}
          onPress={() => navigation.navigate('RegistroEquipos')}
          style={styles.button}
          buttonColor="#7c8f5a"
        >
          Generar Ficha QR
        </Button>

        <Button
          mode="contained"
          icon={() => (
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
          )}
          onPress={() => navigation.navigate('ListaFichas')}
          style={styles.button}
          buttonColor="#7c8f5a"
        >
          Administrar Fichas QR
        </Button>
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
  },
  topButtons: {
    position: 'absolute',
    top: 40, // Separación desde la parte superior
    right: 20, // Separación desde la derecha
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    marginLeft: 15, // Espaciado entre botones
    padding: 5, // Espaciado interno para hacerlo clickeable
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginBottom: 20,
    paddingVertical: 10,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 8,
    elevation: 3,
  },
});

export default HomeScreen;
