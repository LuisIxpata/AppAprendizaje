// screens/Login.js
import React, { useState, useEffect } from 'react';
import {
  Text, StyleSheet, View, Image, TextInput,
  TouchableOpacity, ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

export default function Login(props) {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  /* ---------------------------------------------------- */
  /* Iniciar sesión                                       */
  /* ---------------------------------------------------- */
  const logueo = async () => {
    if (!email || !password) {
      return ToastAndroid.show('Completa ambos campos', ToastAndroid.SHORT);
    }
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, password }),
      });

      if (!res.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await res.json(); // { token, usuario: { id, nombre, correo } }

      // Guarda token y userId
      await AsyncStorage.multiSet([
        ['token', data.token],
        ['userId', String(data.usuario.id)],
      ]);

      ToastAndroid.show('Accediendo...', ToastAndroid.SHORT);
      navigation.navigate('HomeEstudiante');
    } catch (err) {
      console.log(err);
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  };

  /* ---------------------------------------------------- */
  /* Navegaciones auxiliares                              */
  /* ---------------------------------------------------- */
  const handleRegister       = () => navigation.navigate('Registro');
  const handleResetPassword  = () => navigation.navigate('RecuperarPass');
  const toggleShowPassword   = () => setShowPassword(v => !v);

  /* Limpia campos si regresas a Login */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
    });
    return unsubscribe;
  }, [navigation]);

  /* ---------------------------------------------------- */
  /* UI                                                   */
  /* ---------------------------------------------------- */
  return (
    <View style={styles.padre}>
      <View>
        <Text style={styles.cajaTextoTitulo}> </Text>
      </View>

      <Image source={require('../assets/LogoApp2.png')} style={styles.profile} />

      <View style={styles.tarjeta}>
        {/* Correo */}
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="Correo@miumg.edu.gt"
            style={{ paddingHorizontal: 15 }}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Contraseña */}
        <View style={styles.cajaContrasena}>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            style={{ paddingHorizontal: 15 }}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.Icon}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Botón Ingresar */}
        <View style={styles.PadreBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
            <Text style={styles.TextoBoton}>Ingresar</Text>
          </TouchableOpacity>
        </View>

        {/* Botón Registrarse */}
        <View style={styles.RegistrarseBoton}>
          <TouchableOpacity style={styles.CajaBotonRegistrase} onPress={handleRegister}>
            <Text style={styles.TextoBoton}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        {/* Enlace Recuperar contraseña */}
        <Text style={{ marginTop: 20 }}>
          ¿Olvidaste tu contraseña?{' '}
          <Text style={{ color: 'blue' }} onPress={handleResetPassword}>
            Recuperala!
          </Text>
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  padre: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 100,
  },
  profile: {
    width: 275,
    height: 275,
    resizeMode: 'contain',
    borderRadius: 50,
    marginTop: -75,
    marginBottom: 1,
    borderColor: 'white',
  },
  tarjeta: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    elevation: 5,
  },
  cajaTexto: {
    paddingVertical: 15,
    backgroundColor: '#cccccc40',
    borderRadius: 30,
    marginBottom: 10,
  },
  cajaContrasena: {
    paddingVertical: 15,
    backgroundColor: '#cccccc40',
    borderRadius: 30,
    marginBottom: 10,
  },
  PadreBoton: { alignItems: 'center' },
  cajaBoton: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 20,
    marginBottom: 10,
    width: 150,
  },
  TextoBoton: { color: 'white', textAlign: 'center' },
  cajaTextoTitulo: { fontSize: 20, fontStyle: 'italic', color: 'white' },
  Icon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: 3 }],
  },
  CajaBotonRegistrase: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 20,
    marginBottom: 10,
    width: 150,
    alignItems: 'center',
  },
  RegistrarseBoton: { alignItems: 'center' },
});
