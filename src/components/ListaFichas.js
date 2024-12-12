import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { Card, Text, Button, FAB, ActivityIndicator } from 'react-native-paper';
import { db } from '../firebase/FirebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const ListaFichas = ({ navigation }) => {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFichas = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'equipos')); // 'equipos' es la colección
        const fichasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFichas(fichasData);
      } catch (error) {
        console.error('Error al obtener las fichas:', error);
        Alert.alert('Error', 'No se pudieron obtener las fichas. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, []);

  const eliminarFicha = async (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta ficha?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'equipos', id)); // Eliminar el documento por ID
              setFichas((prevFichas) => prevFichas.filter((ficha) => ficha.id !== id)); // Actualizar el estado
              Alert.alert('Eliminado', 'La ficha se eliminó correctamente.');
            } catch (error) {
              console.error('Error al eliminar la ficha:', error);
              Alert.alert('Error', 'No se pudo eliminar la ficha. Intenta nuevamente.');
            }
          },
        },
      ]
    );
  };

  const renderFicha = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.maquinaEquipo || 'Sin nombre de equipo'}
        subtitle={`Realizado por: ${item.realizadoPor || 'No especificado'}`}
      />
      <Card.Content>
        <Text style={styles.cardText}>Ubicación: {item.ubicacion || 'No especificada'}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button mode="contained" onPress={() => navigation.navigate('VerFicha', { id: item.id })}>
          Ver
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('RegistroEquipos', { id: item.id })}
        >
          Editar
        </Button>
        <Button
          mode="contained-tonal"
          buttonColor="red"
          onPress={() => eliminarFicha(item.id)}
        >
          Eliminar
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} size="large" style={styles.loading} />
      ) : (
        <FlatList
          data={fichas}
          keyExtractor={(item) => item.id}
          renderItem={renderFicha}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay fichas registradas.</Text>
          }
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        label="Nueva Ficha"
        onPress={() => navigation.navigate('RegistroEquipos')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  list: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  cardText: {
    marginBottom: 5,
  },
  cardActions: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#536653',
  },
  loading: {
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});

export default ListaFichas;
