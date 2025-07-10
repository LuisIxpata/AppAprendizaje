import { Text, StyleSheet, View, BackHandler, TouchableOpacity, Image, ActivityIndicator, Modal, Pressable } from 'react-native';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config'; // << crea este archivo si no existe

export default function Home({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token  = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) throw new Error('No autorizado');

        const res = await fetch(`${API_BASE_URL}/obtener_usuarios/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Error al obtener usuario');
        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        console.error(err.message);
        navigation.navigate('Login');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, [navigation]);

  const handleEditProfile = () => {
    navigation.navigate('EditarPerfil');
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
          <Text style={styles.logoutButton}>Salir</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleLogout]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleMenu}>
          <View style={styles.menuModal}>
            <Text style={styles.menuItem}>📚 Cursos disponibles</Text>
            <Text style={styles.menuItem}>👥 Mis compañeros</Text>
            <Text style={styles.menuItem}>📊 Progreso</Text>
            <Text style={styles.menuItem}>🛠 Configuración</Text>
            <Text style={styles.menuItem}>📅 Calendario académico</Text>
            <Text style={styles.menuItem}>📥 Mensajes recibidos</Text>
            <Text style={styles.menuItem}>📤 Enviar sugerencia</Text>
            <Text style={styles.menuItem}>🧩 Actividades extracurriculares</Text>
            <Text style={styles.menuItem}>📎 Recursos descargables</Text>
            <Text style={styles.menuItem}>🔔 Notificaciones</Text>
            <Text style={styles.menuItem}>📞 Contactar soporte</Text>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButtonContainer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        {usuario?.photo_url && (
          <Image source={{ uri: usuario.photo_url }} style={styles.image} />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.nombre}>{usuario?.nombre}</Text>
          <Text style={styles.info}>Carnet: {usuario?.carnet}</Text>
          <Text style={styles.rol}>{usuario?.rol}</Text>
        </View>
      </View>

      <Text style={styles.title}> 
        ¡Hola {usuario?.nombre || 'usuario'}! ¿Qué quieres aprender hoy?
      </Text>

      <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
        <Text style={styles.editText}>✏️ Editar perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

// Los estilos los puedes dejar igual (omitidos aquí para ahorrar espacio)
