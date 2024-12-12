import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { db } from '../firebase/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import QRCode from 'react-native-qrcode-svg';

const VerFicha = ({ route }) => {
  const { id } = route.params;
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFicha = async () => {
      try {
        const docRef = doc(db, 'equipos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFicha(docSnap.data());
        } else {
          Alert.alert('Error', 'Ficha no encontrada');
        }
      } catch (error) {
        console.error('Error al obtener la ficha:', error);
        Alert.alert('Error', 'No se pudo obtener la ficha. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchFicha();
  }, [id]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Cargando ficha...</Text>
      </View>
    );
  }

  if (!ficha) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la ficha.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={ficha.maquinaEquipo || 'Sin nombre de equipo'} />
        <Card.Content>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Realizado por:</Text> {ficha.realizadoPor || 'No especificado'}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.label}>Ubicación:</Text> {ficha.ubicacion || 'No especificada'}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.qrContainer}>
        <Text style={styles.label}>Código QR</Text>
        <QRCode
          value={`https://inventario-manto.web.app/?id=${id}`}
          size={200}
        />
      </View>


      <Text style={styles.suggestion}>
        Sugerencia: puedes tomar una captura de pantalla para guardar el código QR.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#536653',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: '45%',
  },
  suggestion: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#777',
  },
});

export default VerFicha;
