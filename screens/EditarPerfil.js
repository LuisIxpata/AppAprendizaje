// screens/EditarPerfil.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet,
  Alert, Image, TouchableOpacity, ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

export default function EditarPerfil({ navigation }) {
  const [nombre, setNombre]       = useState('');
  const [apellido, setApellido]   = useState('');
  const [carnet, setCarnet]       = useState('');
  const [telefono, setTelefono]   = useState('');
  const [rol, setRol]             = useState('');
  const [image, setImage]         = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token  = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');   // guárdalo en login

        if (!token || !userId) throw new Error('Sesión expirada');

        const res = await fetch(`${API_BASE_URL}/obtener_usuarios/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('No se pudo obtener usuario');

        const data = await res.json();
        setNombre(data.nombre || '');
        setApellido(data.apellido || '');
        setTelefono(data.telefono || '');
        setRol(data.rol || '');
        setCarnet(data.carnet || '');
        setImage(data.photo_url || null);
      } catch (err) {
        Alert.alert('Error', err.message);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleUpdate = async () => {
    try {
      const token  = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) throw new Error('Sesión expirada');

      const form = new FormData();
      if (image && image.startsWith('file')) {
        // Solo si se cambió la foto (uri local)
        form.append('foto', {
          uri: image,
          name: 'perfil.jpg',
          type: 'image/jpeg',
        });
      }

      form.append('nombre', nombre);
      form.append('apellido', apellido);
      form.append('carnet', carnet);
      form.append('rol', rol);
      form.append('telefono', telefono);

      const res = await fetch(`${API_BASE_URL}/actualizar_usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: form,
      });

      if (!res.ok) throw new Error('Error al actualizar perfil');
      Alert.alert('Perfil actualizado');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.message);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity onPress={pickImage} style={styles.buttonImage}>
        <Text style={styles.textImage}>Cambiar Foto</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Edita tu Nombre</Text>
      <TextInput style={styles.input} placeholder="Nombre"   value={nombre}   onChangeText={setNombre}   />
      <Text style={styles.label}>Edita tu Apellido</Text>
      <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
      <Text style={styles.label}>Edita tu Carnet</Text>
      <TextInput style={styles.input} placeholder="Carnet"   value={carnet}   onChangeText={setCarnet}   />
      <Text style={styles.label}>Edita tu Telefono</Text>
      <TextInput style={styles.input} placeholder="Telefono"   value={telefono}   onChangeText={setTelefono}   />

      <Button title="Guardar Cambios" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  title:     { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input:     { width: '100%', padding: 10, borderBottomWidth: 1, marginBottom: 15 },
  image:     { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  buttonImage:{ backgroundColor: '#4682B4', padding: 10, borderRadius: 5, marginBottom: 20 },
  textImage: { color: '#fff', fontWeight: '600' },
});
