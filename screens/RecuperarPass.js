// screens/RecuperarPass.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, Keyboard
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../config';

const RecuperarPass = ({ navigation }) => {
  const [step, setStep]           = useState(1); // 1: email, 2: código + nueva pass
  const [email, setEmail]         = useState('');
  const [codigo, setCodigo]       = useState('');
  const [password, setPassword]   = useState('');
  const [showPwd, setShowPwd]     = useState(false);
  const [loading, setLoading]     = useState(false);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const solicitarCodigo = async () => {
    if (!email.trim()) return Alert.alert('Error', 'Ingresa tu correo');
    if (!isValidEmail(email)) return Alert.alert('Error', 'Correo inválido');

    Keyboard.dismiss();
    setLoading(true);

    try {
  const resp = await fetch(`${API_BASE_URL}/solicitarpass`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const isJson = resp.headers
    .get('content-type')
    ?.includes('application/json');

  const data = isJson ? await resp.json() : {};

  if (resp.ok) {
    Alert.alert('Código enviado', data.message || 'Revisa tu correo');
    setStep(2);
  } else {
    Alert.alert('Error', data?.error || 'No se pudo enviar el código');
  }

} catch (err) {
  console.error(err);
  Alert.alert('Error', 'Problema al contactar el servidor');
} finally {
  setLoading(false);
}

  };

  const confirmarCodigo = async () => {
    if (!codigo.trim() || !password.trim()) {
      return Alert.alert('Error', 'Completa todos los campos');
    }
    if (password.length < 6) {
      return Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
    }

    Keyboard.dismiss();
    setLoading(true);

    try {
      const resp = await fetch(`${API_BASE_URL}/confirmarpass`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email, codigo, nuevaPassword: password })
      });
      
      const data = await resp.json();
      

      if (resp.ok) {
        Alert.alert('Contraseña actualizada', data.message || '', [
          { text: 'Ir a login', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', data?.error || 'Código incorrecto o vencido');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Error al actualizar la contraseña');
      Alert.alert('Oops!', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>

      {step === 1 ? (
        <>
          <Text style={styles.subtitle}>
            Ingresa tu correo y te enviaremos un código de verificación
          </Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Correo electrónico"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={solicitarCodigo}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Enviando…' : 'Enviar código'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            Ingresa el código enviado a {email} y tu nueva contraseña
          </Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="confirmation-number" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Código"
              style={styles.input}
              value={codigo}
              onChangeText={setCodigo}
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Nueva contraseña"
              style={styles.input}
              secureTextEntry={!showPwd}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
            <Ionicons
              name={showPwd ? 'eye' : 'eye-off'}
              size={20}
              color="#666"
              onPress={() => setShowPwd(!showPwd)}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={confirmarCodigo}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Actualizando…' : 'Actualizar contraseña'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity disabled={loading} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecuperarPass;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 28 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 12, marginBottom: 20
  },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 48 },
  button: {
    backgroundColor: '#007bff', padding: 14,
    borderRadius: 8, alignItems: 'center', marginBottom: 20
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  backText: { color: '#007bff', textAlign: 'center', fontSize: 15 }
});
