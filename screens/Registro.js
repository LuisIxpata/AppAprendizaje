// screens/Registro.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, Alert, Image,
  TouchableOpacity, ScrollView, StyleSheet, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { API_BASE_URL } from '../config';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  '[expo-image-picker] `ImagePicker.MediaTypeOptions` have been deprecated.',
]);

export default function Registro({ navigation }) {
  /* ───── State ───── */
  const [carnet,  setCarnet]  = useState('');
  const [nombre,  setNombre]  = useState('');
  const [apellido, setApellido] = useState('');
  const [carrera, setCarrera] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol,     setRol]     = useState('');
  const [email,   setEmail]   = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading,  setLoading]  = useState(false);

  /* ───── Image Picker ───── */
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Permiso denegado', 'Necesitas acceso a la galería.');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes   : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect       : [4, 3],
      quality      : 0.8,
    });

    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  /* ───── Validaciones ───── */
  const camposVacios =
    !carnet || !nombre || !apellido || !carrera ||
    !telefono || !rol || !email || !password || !confirmPassword;

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  /* ───── Registro ───── */
  const handleRegister = async () => {
    if (camposVacios)                return Alert.alert('Error', 'Completa todos los campos.');
    if (!isValidEmail(email))        return Alert.alert('Error', 'Correo inválido.');
    if (password !== confirmPassword) return Alert.alert('Error', 'Las contraseñas no coinciden.');

    setLoading(true);

    try {
      /* ---------- Construir FormData ---------- */
      const fd = new FormData();
      fd.append('carnet',   carnet);
      fd.append('nombre',   nombre);
      fd.append('apellido', apellido);
      fd.append('carrera',  carrera);
      fd.append('telefono', telefono);
      fd.append('rol',      rol);
      fd.append('correo',   email);      //  ← EXACTO como espera el backend
      fd.append('password', password);

      if (imageUri) {
        const parts = imageUri.split('/');
        const fileName = parts[parts.length - 1] || `foto_${Date.now()}.jpg`;
        fd.append('foto', {
          uri : Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
          name: fileName,
          type: 'image/jpeg',
        });
      }

      /* ---------- Enviar petición ---------- */
      const resp = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        body  : fd,              // ¡NO añadas Content-Type!
      });

      /* ---------- Procesar respuesta ---------- */
      const ct = resp.headers.get('content-type') || '';
      let data = null;

      if (ct.includes('application/json')) {
        data = await resp.json();        // ← solo parsea si es JSON
      } else {
        // Si llega HTML o vacío, léelo como texto para depurar
        const text = await resp.text();
        console.log('Respuesta no-JSON del servidor:\n', text);
        data = { error: text };
      }

      if (resp.ok) {
        Alert.alert('Registro exitoso', 'Ahora inicia sesión');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data?.error || `Error ${resp.status}`);
      }
    } catch (err) {
      console.error('❌ Error en registro:', err);
      Alert.alert('Error', 'No se pudo registrar. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  /* ───── UI ───── */
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TextInput placeholder="Número de Carnet" value={carnet} onChangeText={setCarnet} style={styles.input} />
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} style={styles.input} />
      <TextInput placeholder="Número de teléfono" value={telefono} onChangeText={setTelefono} style={styles.input} keyboardType="phone-pad" />
      <Text style={styles.label}>Carrera</Text>
      <View style={styles.pickerContainer}>
      <Picker selectedValue={carrera} onValueChange={setCarrera}>
          <Picker.Item label="Selecciona tu carrera" value="" />
          <Picker.Item label="Ingenieria en Sistemas" value="Ingenieria en Sistemas" />
        </Picker>
        </View>
      

      <Text style={styles.label}>Selecciona tu Rol</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={rol} onValueChange={setRol}>
          <Picker.Item label="Selecciona un rol..." value="" />
          <Picker.Item label="Estudiante" value="estudiante" />
          <Picker.Item label="Docente" value="docente" />
          <Picker.Item label="Administrador" value="admin" />
        </Picker>
      </View>

      <TextInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TextInput placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>{imageUri ? 'Cambiar foto' : 'Subir foto'}</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

      <Button
        title={loading ? 'Registrando…' : 'Registrarse'}
        onPress={handleRegister}
        disabled={loading}
      />
    </ScrollView>
  );
}

/* ───── Estilos ───── */
const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1, marginBottom: 15,
    paddingVertical: 8, paddingHorizontal: 10,
  },
  label: { fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  pickerContainer: {
    borderWidth: 1, borderRadius: 5, borderColor: '#ccc',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: 'black', padding: 10, borderRadius: 15,
    alignItems: 'center', marginBottom: 30,
  },
  uploadButtonText: { color: '#fff', fontWeight: 'bold' },
  previewImage: {
    width: 150, height: 150, borderRadius: 10,
    marginBottom: 15, alignSelf: 'center',
  },
});
