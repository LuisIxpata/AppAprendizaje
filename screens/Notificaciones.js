import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigation = useNavigation();

  // Se llama cuando la pantalla entra en foco
  useFocusEffect(
    useCallback(() => {
      cargarNotificaciones();
    }, [])
  );

  // Cargar notificaciones desde backend
  const cargarNotificaciones = async () => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (!token || !userId) return;

      const response = await fetch(`${API_BASE_URL}/notificaciones/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotificaciones(data);
      } else {
        console.warn('Error al cargar notificaciones');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setCargando(false);
    }
  };

  const marcarComoLeida = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`${API_BASE_URL}/notificaciones/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leida: true }),
      });

      const actualizadas = notificaciones.map((n) =>
        n.id === id ? { ...n, leida: true } : n
      );
      setNotificaciones(actualizadas);
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notification, item.leida && styles.notificationRead]}
      onPress={() => marcarComoLeida(item.id)}
    >
      <Ionicons
        name={item.leida ? 'notifications-outline' : 'notifications'}
        size={24}
        color={item.leida ? '#999' : '#6a1b9a'}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notificaciones</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#6a1b9a" />
      ) : notificaciones.length > 0 ? (
        <FlatList
          data={notificaciones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 30 }}>No hay notificaciones aún.</Text>
      )}

      {/* Footer menu */}
      <View style={styles.footerMenu}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeEstudiante')}
          style={styles.footerItem}
        >
          <Ionicons name="home" size={24} color="gray" />
          <Text style={styles.footerText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('MisArchivos')}
          style={styles.footerItem}
        >
          <Ionicons name="folder" size={24} color="#666" />
          <Text style={styles.footerText}>Mis Archivos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="notifications" size={24} color="#800080" />
          <Text style={styles.footerText}>Notificaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Perfil')}
          style={styles.footerItem}
        >
          <Ionicons name="person" size={24} color="#666" />
          <Text style={styles.footerText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5fb',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  notificationRead: {
    backgroundColor: '#eee',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
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
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});
