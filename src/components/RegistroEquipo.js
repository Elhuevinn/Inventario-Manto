import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button, Text, Switch, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import QRCode from 'react-native-qrcode-svg';

const RegistroEquipo = () => {
  const [datos, setDatos] = useState({
    realizadoPor: '',
    fecha: '',
    maquinaEquipo: '',
    fabricante: '',
    modelo: '',
    marca: '',
    ubicacion: '',
    seccion: '',
    codigoInventario: '',
    peso: '',
    altura: '',
    largo: '',
    ancho: '',
    potencia: '',
    voltaje: '',
    amperaje: '',
    rpm: '',
    presion: '',
    enfriadorHabilitado: false,
    enfriador: '',
    calentadorHabilitado: false,
    calentador: '',
    partes: '',
    otros: '',
    funcion: '',
    imagen: null,
  });

  const [qrLink, setQrLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setDatos((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleToggle = (key) => {
    setDatos((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleImageUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'Se necesita acceso a la galería para seleccionar una imagen.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'upload.jpg',
        });
        formData.append('upload_preset', 'ml_default');
        formData.append('cloud_name', 'diwzjdpxt');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/diwzjdpxt/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          setDatos((prevState) => ({
            ...prevState,
            imagen: data.secure_url,
          }));
          Alert.alert('Éxito', 'Imagen subida exitosamente.');
        } else {
          throw new Error('Error al subir la imagen a Cloudinary.');
        }
      } else {
        Alert.alert('Cancelado', 'No seleccionaste ninguna imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error', 'No se pudo subir la imagen.');
    }
  };

  const handleSubmit = async () => {
    if (!datos.maquinaEquipo || !datos.fabricante || !datos.modelo) {
      Alert.alert('Error', 'Por favor, completa los campos obligatorios.');
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'equipos'), datos);
      const link = `https://inventario-manto-a648e.web.app/?id=${docRef.id}`;
      setQrLink(link);

      Alert.alert('Éxito', 'Equipo registrado correctamente.');
      setDatos({
        realizadoPor: '',
        fecha: '',
        maquinaEquipo: '',
        fabricante: '',
        modelo: '',
        marca: '',
        ubicacion: '',
        seccion: '',
        codigoInventario: '',
        peso: '',
        altura: '',
        largo: '',
        ancho: '',
        potencia: '',
        voltaje: '',
        amperaje: '',
        rpm: '',
        presion: '',
        enfriadorHabilitado: false,
        enfriador: '',
        calentadorHabilitado: false,
        calentador: '',
        partes: '',
        otros: '',
        funcion: '',
        imagen: null,
      });
    } catch (error) {
      console.error('Error al registrar el equipo:', error);
      Alert.alert('Error', 'No se pudo registrar el equipo. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ficha Técnica</Text>

      {/* Datos generales */}
      <Card style={styles.card}>
        <Card.Title title="Datos Generales" />
        <Card.Content>
          <TextInput
            label="Realizado Por"
            value={datos.realizadoPor}
            onChangeText={(text) => handleChange('realizadoPor', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Fecha (dd/mm/yyyy)"
            value={datos.fecha}
            onChangeText={(text) => handleChange('fecha', text)}
            style={styles.input}
            mode="outlined"
          />
        </Card.Content>
      </Card>

      {/* Identificación */}
      <Card style={styles.card}>
        <Card.Title title="Identificación" />
        <Card.Content>
          <TextInput
            label="Máquina/Equipo"
            value={datos.maquinaEquipo}
            onChangeText={(text) => handleChange('maquinaEquipo', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Fabricante"
            value={datos.fabricante}
            onChangeText={(text) => handleChange('fabricante', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Modelo"
            value={datos.modelo}
            onChangeText={(text) => handleChange('modelo', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Marca"
            value={datos.marca}
            onChangeText={(text) => handleChange('marca', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Código de Inventario"
            value={datos.codigoInventario}
            onChangeText={(text) => handleChange('codigoInventario', text)}
            style={styles.input}
            mode="outlined"
          />
        </Card.Content>
      </Card>

      {/* Ubicación */}
      <Card style={styles.card}>
        <Card.Title title="Ubicación" />
        <Card.Content>
          <TextInput
            label="Ubicación"
            value={datos.ubicacion}
            onChangeText={(text) => handleChange('ubicacion', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Sección"
            value={datos.seccion}
            onChangeText={(text) => handleChange('seccion', text)}
            style={styles.input}
            mode="outlined"
          />
        </Card.Content>
      </Card>

      {/* Características Generales */}
      <Card style={styles.card}>
        <Card.Title title="Características Generales" />
        <Card.Content>
          <TextInput
            label="Peso"
            value={datos.peso}
            onChangeText={(text) => handleChange('peso', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Altura"
            value={datos.altura}
            onChangeText={(text) => handleChange('altura', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Largo"
            value={datos.largo}
            onChangeText={(text) => handleChange('largo', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Ancho"
            value={datos.ancho}
            onChangeText={(text) => handleChange('ancho', text)}
            style={styles.input}
            mode="outlined"
          />
        </Card.Content>
      </Card>

            {/* Características Técnicas */}
            <Card style={styles.card}>
        <Card.Title title="Características Técnicas" />
        <Card.Content>
          <TextInput
            label="Potencia"
            value={datos.potencia}
            onChangeText={(text) => handleChange('potencia', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Voltaje"
            value={datos.voltaje}
            onChangeText={(text) => handleChange('voltaje', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Amperaje"
            value={datos.amperaje}
            onChangeText={(text) => handleChange('amperaje', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="RPM"
            value={datos.rpm}
            onChangeText={(text) => handleChange('rpm', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Presión"
            value={datos.presion}
            onChangeText={(text) => handleChange('presion', text)}
            style={styles.input}
            mode="outlined"
          />
        </Card.Content>
      </Card>

      {/* Campos Habilitables */}
      <Card style={styles.card}>
        <Card.Title title="Configuración Opcional" />
        <Card.Content>
          {/* Enfriador */}
          <View style={styles.toggleContainer}>
            <Text>¿Tiene enfriador?</Text>
            <Switch
              value={datos.enfriadorHabilitado}
              onValueChange={() => handleToggle('enfriadorHabilitado')}
            />
          </View>
          {datos.enfriadorHabilitado && (
            <TextInput
              label="Detalles del Enfriador"
              value={datos.enfriador}
              onChangeText={(text) => handleChange('enfriador', text)}
              style={styles.input}
              mode="outlined"
            />
          )}

          {/* Calentador */}
          <View style={styles.toggleContainer}>
            <Text>¿Tiene calentador?</Text>
            <Switch
              value={datos.calentadorHabilitado}
              onValueChange={() => handleToggle('calentadorHabilitado')}
            />
          </View>
          {datos.calentadorHabilitado && (
            <TextInput
              label="Detalles del Calentador"
              value={datos.calentador}
              onChangeText={(text) => handleChange('calentador', text)}
              style={styles.input}
              mode="outlined"
            />
          )}
        </Card.Content>
      </Card>

      {/* Imagen */}
      <Card style={styles.card}>
        <Card.Title title="Imagen" />
        <Card.Content>
          <TouchableOpacity onPress={handleImageUpload} style={styles.imageUpload}>
            <Text>Subir Imagen</Text>
          </TouchableOpacity>
          {datos.imagen && (
            <Image
              source={{ uri: datos.imagen }}
              style={styles.imagePreview}
            />
          )}
        </Card.Content>
      </Card>

      {/* Otros Detalles */}
      <Card style={styles.card}>
        <Card.Title title="Otros Detalles" />
        <Card.Content>
          <TextInput
            label="Partes"
            value={datos.partes}
            onChangeText={(text) => handleChange('partes', text)}
            style={styles.textarea}
            mode="outlined"
            multiline
          />
          <TextInput
            label="Otros"
            value={datos.otros}
            onChangeText={(text) => handleChange('otros', text)}
            style={styles.textarea}
            mode="outlined"
            multiline
          />
          <TextInput
            label="Función"
            value={datos.funcion}
            onChangeText={(text) => handleChange('funcion', text)}
            style={styles.textarea}
            mode="outlined"
            multiline
          />
        </Card.Content>
      </Card>

      {/* Más contenido aquí */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          buttonColor="#536653"
          textColor="#FFFFFF"
          style={styles.button}
        >
          Registrar y Generar QR
        </Button>
      </View>

      {loading && <Text style={styles.loading}>Registrando equipo...</Text>}

      {qrLink ? (
        <View style={styles.qrContainer}>
          <QRCode value={qrLink} size={150} />
          <Text style={styles.qrText}>Escanea este código para ver la ficha técnica.</Text>
        </View>
      ) : null}
      

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#536653' },
  card: { marginBottom: 20 },
  footer: { alignItems: 'center', marginTop: 5, marginBottom: 50 },
  button: { width: '80%' },
  input: { marginBottom: 10 },
  imageUpload: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#536653',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default RegistroEquipo;
