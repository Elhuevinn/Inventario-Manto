import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const SettingsScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Obtener el usuario autenticado
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error("No hay un usuario autenticado.");
        }

        const userId = user.uid;
        
        // Referencia a Firestore
        const db = getFirestore();
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUserProfile(userSnapshot.data());
        } else {
          throw new Error("No se encontró el perfil del usuario en Firestore.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleReportIssue = () => {
    const email = 'paradisusqr.manto@gmail.com';
    const subject = 'Reporte de Fallo en la Aplicación';
    const body = `Hola,\n\nHe encontrado un fallo en la aplicación que me gustaría reportar.\n\nPor favor, describa el fallo aquí:\n\n---\nNombre del Usuario: ${userProfile?.name || 'N/A'}\nID del Usuario: ${auth.currentUser?.uid || 'N/A'}`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch((error) => {
      console.error('No se pudo abrir el correo:', error);
      Alert.alert('Error', 'No se pudo abrir la aplicación de correo electrónico.');
    });
  };

  const handleUserManual = () => {
    navigation.navigate('Manual'); // Navegar a la pantalla de Manual de Usuario
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color="#4a5b3c" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="account-circle" size={100} color="#4a5b3c" />
        <Text style={styles.headerText}>Perfil de Usuario</Text>
        {userProfile ? (
          <>
            <Text style={styles.userInfoText}>Nombre: {userProfile.name}</Text>
            <Text style={styles.userInfoText}>Email: {auth.currentUser?.email || 'No disponible'}</Text>
          </>
        ) : (
          <Text style={styles.userInfoText}>No se pudo cargar la información del usuario</Text>
        )}
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionRow} onPress={handleUserManual}>
          <Text style={styles.optionText}>Manual de Usuario</Text>
          <Icon name="book-open-page-variant" size={28} color="#4a5b3c" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow} onPress={handleReportIssue}>
          <Text style={styles.optionText}>Reportar Fallos en la Aplicación</Text>
          <Icon name="alert-circle" size={28} color="#4a5b3c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4a5b3c',
  },
  userInfoText: {
    fontSize: 16,
    color: '#4a5b3c',
    marginTop: 4,
  },
  optionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  optionText: {
    fontSize: 18,
    color: '#4a5b3c',
  },
});

export default SettingsScreen;
