// screens/MisArchivos.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler,
  ActivityIndicator, Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

export default function MisArchivos() {
  const navigation = useNavigation();
  const [archivos, setArchivos]   = useState([]);
  const [loading, setLoading]     = useState(true);

  /* -------------------------------------------------- */
  /* 1. Cargar archivos del backend                     */
  /* -------------------------------------------------- */
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Sesion expirada');

        const res = await fetch(`${API_BASE_URL}/archivos`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json(); // [{ id, titulo, tipo, url, ... }]
          const adaptados = data.map(a => ({
            id:    String(a.id),
            nombre:a.titulo,
            tipo:  a.tipo,
            url:   a.url
          }));
          setArchivos(adaptados);
        } else {
          setArchivos([]);
        }
      } catch (err) {
        console.error(err);
        setArchivos([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* -------------------------------------------------- */
  /* 2. Bloqueo botón BACK                              */
  /* -------------------------------------------------- */
  useFocusEffect(
    useCallback(() => {
      const onBack = () => true;
      BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBack);
    }, [])
  );

  /* -------------------------------------------------- */
  /* 3. Render de cada archivo                          */
  /* -------------------------------------------------- */
  const openFile = (url) => {
    if (url) Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Ionicons name="document-text-outline" size={24} color="#6a1b9a" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.fileName}>{item.nombre}</Text>
        <Text style={styles.fileType}>{(item.tipo || '').toUpperCase()}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={() => openFile(item.url)}>
        <Text style={styles.viewButtonText}>Ver</Text>
      </TouchableOpacity>
    </View>
  );

  /* -------------------------------------------------- */
  /* 4. UI                                              */
  /* -------------------------------------------------- */
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Archivos</Text>

      {archivos.length === 0 ? (
        <View style={styles.noResultadosContainer}>
          <Text style={styles.noResultadosText}>📁 Sin archivos disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={archivos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Footer menu */}
      <View style={styles.footerMenu}>
        {[
          { icon: 'home', label: 'Inicio', screen: 'HomeEstudiante' },
          { icon: 'folder', label: 'Mis Archivos', screen: 'MisArchivos', active: true },
          { icon: 'notifications', label: 'Notificaciones', screen: 'Notificaciones' },
          { icon: 'person', label: 'Perfil', screen: 'Perfil' }
        ].map((f, i) => (
          <TouchableOpacity key={i} style={styles.footerItem} onPress={() => navigation.navigate(f.screen)}>
            <Ionicons name={f.icon} size={24} color={f.active ? '#800080' : '#666'} />
            <Text style={styles.footerText}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f5fb', paddingTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  itemContainer: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10,
    padding: 15, marginBottom: 12, alignItems: 'center', elevation: 2,
  },
  icon: { marginRight: 10 },
  textContainer: { flex: 1 },
  fileName: { fontSize: 16, fontWeight: 'bold' },
  fileType: { fontSize: 12, color: '#888' },
  viewButton: { backgroundColor: '#6a1b9a', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  viewButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  /* footer */
  footerMenu: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    paddingVertical: 10, borderTopWidth: 1, borderColor: '#ddd',
    backgroundColor: '#fff', position: 'absolute', bottom: 0, left: 0, right: 0,
  },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, marginTop: 4, color: '#333' },
  /* no resultados */
  noResultadosContainer: { marginTop: 40, alignItems: 'center' },
  noResultadosText: { fontSize: 16, color: '#888', fontStyle: 'italic' },
});
