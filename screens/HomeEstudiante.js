// screens/HomeEstudiante.js
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { API_BASE_URL } from '../config';

export default function HomeEstudiante() {
  const navigation = useNavigation();

  /* -------------------------------------------------- */
  /* Estados                                            */
  /* -------------------------------------------------- */
  const [usuario, setUsuario] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------- */
  /* 1. Cargar usuario + módulos                        */
  /* -------------------------------------------------- */
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) throw new Error('Sesión expirada');

        // Usuario ------------------------------------------------------
        const resUser = await fetch(`${API_BASE_URL}/obtener_usuarios/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await resUser.json();
        setUsuario(userData);

        // Módulos ------------------------------------------------------
        const resMod = await fetch(`${API_BASE_URL}/modulos`);
        if (resMod.ok) {
          const dataMods = await resMod.json();
          setModulos(
            dataMods.map(m => ({
              id: String(m.id),
              title: m.nombre,
              icon: 'code-slash',
            }))
          );
        }
      } catch (err) {
        console.error(err.message);
        navigation.navigate('Login');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* -------------------------------------------------- */
  /* 2. Bloquea botón físico BACK                       */
  /* -------------------------------------------------- */
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true; // evita volver al login
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  /* -------------------------------------------------- */
  /* 3. Logout                                          */
  /* -------------------------------------------------- */
  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['token', 'userId']);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  /* -------------------------------------------------- */
  /* 4. Renderizado de tarjetas de módulo               */
  /* -------------------------------------------------- */
  const modulosFiltrados = modulos.filter(m => m.title.toLowerCase().includes(busqueda.toLowerCase()));

  const renderModulo = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={600} style={styles.moduloCard}>
      <TouchableOpacity onPress={() => navigation.navigate('ModuloPOO', { ModuloPOO: item.title })}>
        <Ionicons name={item.icon} size={32} color="#6a1b9a" />
        <Text style={styles.moduloText}>{item.title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  /* -------------------------------------------------- */
  /* 5. Loader                                          */
  /* -------------------------------------------------- */
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}> 
        <ActivityIndicator size="large" />
      </View>
    );
  }

  /* -------------------------------------------------- */
  /* 6. UI                                              */
  /* -------------------------------------------------- */
  return (
    <LinearGradient colors={['#f8f4ff', '#ece9f3']} style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* PERFIL */}
      <View style={styles.profileSection}>
        <View>
          <Text style={styles.hello}>Hola!</Text>
          <Text style={styles.name}>{usuario?.nombre || 'Usuario'}</Text>
          <Text style={styles.subtitle}>Vamos a comenzar con el Aprendizaje</Text>
        </View>
        <View style={styles.profileRight}>
          {usuario?.photo_url && <Image source={{ uri: usuario.photo_url }} style={styles.profileImage} />}
          <Text style={styles.carnet}>{usuario?.carnet}</Text>
        </View>
      </View>

      {/* BÚSQUEDA */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar módulo"
          value={busqueda}
          onChangeText={setBusqueda}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <Text style={styles.sectionTitle}>Módulos disponibles</Text>
      {modulosFiltrados.length === 0 ? (
        <View style={styles.noResultadosContainer}>
          <Text style={styles.noResultadosText}>🔍 No se encontraron módulos</Text>
        </View>
      ) : (
        <FlatList
          data={modulosFiltrados}
          keyExtractor={item => item.id}
          renderItem={renderModulo}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* FOOTER */}
      <View style={styles.footerMenu}>
        {[
          { icon: 'home', label: 'Inicio', screen: 'HomeEstudiante' },
          { icon: 'folder', label: 'Mis Archivos', screen: 'MisArchivos' },
          { icon: 'bar-chart', label: 'Progreso', screen: 'Progreso' },
          { icon: 'notifications', label: 'Notificaciones', screen: 'Notificaciones' },
          { icon: 'person', label: 'Perfil', screen: 'Perfil' },
        ].map(({ icon, label, screen }) => (
          <TouchableOpacity key={label} style={styles.footerItem} onPress={() => navigation.navigate(screen)}>
            <Ionicons name={icon} size={28} color={label === 'Inicio' ? '#800080' : '#666'} />
            <Text style={styles.footerText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

/* -------------------------------------------------- */
/* 7. Estilos                                         */
/* -------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoutButton: {
    backgroundColor: '#800080',
    padding: 10,
    borderRadius: 60,
    position: 'absolute',  // Necesario para moverlo libremente
    bottom: -5,             // Distancia desde abajo
    left: -10,               // Distancia desde la izquierda
  },

  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  hello: { fontSize: 16, color: '#555' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subtitle: { color: '#777' },
  profileRight: { alignItems: 'center' },
  profileImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 5 },
  carnet: { fontSize: 12, color: '#777' },
  searchContainer: { flexDirection: 'row', marginBottom: 20 },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  searchButton: { backgroundColor: '#6a1b9a', padding: 10, borderRadius: 8, marginLeft: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  noResultadosContainer: { alignItems: 'center', marginTop: 20 },
  noResultadosText: { color: '#777' },
  row: { justifyContent: 'space-between' },
  moduloCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  moduloText: { marginTop: 10, fontWeight: 'bold', fontSize: 14, color: '#444' },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12 },
});
