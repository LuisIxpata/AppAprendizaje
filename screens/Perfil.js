// screens/Perfil.js
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

export default function Perfil() {
  const navigation          = useNavigation();
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  /* Bloquea el botón físico BACK */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => sub.remove();
    }, [])
  );

  /* Oculta flecha de retroceso del header */
  useLayoutEffect(() => {
    navigation.setOptions({ headerLeft: () => null });
  }, [navigation]);

  /* ---------- Cargar datos de usuario ---------- */
  useEffect(() => {
    (async () => {
      try {
        const token  = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) return;

        const res = await fetch(`${API_BASE_URL}/obtener_usuarios/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.warn('Error al obtener datos del usuario');
          return;
        }

        const raw = await res.json();

        /* ① Normaliza: puede venir como array o envoltorio */
        const u =
          Array.isArray(raw)   ? raw[0] :
          raw?.usuario         ? raw.usuario :
          raw;

        /* ② Mapea nombres que tu UI espera */
        const adaptado = {
          ...u,
          foto   : u.foto      ?? u.photo_url,   
          correo : u.correo    ?? u.email,
          telefono : u.telefono ?? u.telefono,
          carrera : u.carrera ?? u.carrera,      
        };

        setUsuario(adaptado);
      } catch (err) {
        console.error('Error al cargar usuario:', err);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  const handleEditProfile = () => navigation.navigate('EditarPerfil');

  /* Utilidad para evitar “undefined” en pantalla */
  const show = (value) => (value ?? '―');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#6a1b9a" style={{ flex: 1 }} />
      ) : (
        <View style={styles.card}>
          {usuario?.foto && (
            <Image source={{ uri: usuario.foto }} style={styles.profileImage} />
          )}
          <Text style={styles.name}>{show(usuario?.nombre)} {show(usuario?.apellido)}</Text>
          <Text style={styles.info}>Carnet:   {show(usuario?.carnet)}</Text>
          <Text style={styles.info}>Correo:   {show(usuario?.correo)}</Text>
          <Text style={styles.info}>Teléfono: {show(usuario?.telefono)}</Text>
          <Text style={styles.info}>Carrera:  {show(usuario?.carrera)}</Text>
          <Text style={styles.info}>Rol:      {show(usuario?.rol)}</Text>
        </View>
      )}

      <TouchableOpacity onPress={handleEditProfile} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Editar perfil ✏️</Text>
      </TouchableOpacity>

      {/* -------- Footer -------- */}
      <View style={styles.footerMenu}>
        <FooterItem icon="home"          label="Inicio"         onPress={() => navigation.navigate('HomeEstudiante')} />
        <FooterItem icon="folder"        label="Mis Archivos"   onPress={() => navigation.navigate('MisArchivos')} />
        <FooterItem icon="notifications" label="Notificaciones" onPress={() => navigation.navigate('Notificaciones')} />
        <FooterItem icon="person"        label="Perfil"         active />
      </View>
    </SafeAreaView>
  );
}

/* ---------- Footer helper ---------- */
const FooterItem = ({ icon, label, onPress, active }) => (
  <TouchableOpacity style={styles.footerItem} onPress={onPress}>
    <Ionicons
      name={icon}
      size={26}
      color={active ? '#800080' : '#666'}
    />
    <Text style={styles.footerText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------- Estilos ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f5fb',
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  menuButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
  },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, marginTop: 2 },
});
