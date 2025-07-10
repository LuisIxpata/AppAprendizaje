// screens/Progreso.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

export default function Progreso() {
  const [progreso, setProgreso] = useState(null);   // número (0-100) o null
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token  = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) return;

        // ──➤ ajusta módulo_id=1 si POO en tu BD tiene otro id
        const res = await fetch(`${API_BASE_URL}/progreso?usuario=${userId}&modulo=1`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();        // [{ porcentaje, ... }] o []
          if (data.length) setProgreso(data[0].porcentaje);
        }
      } catch (err) {
        console.error('Error al obtener progreso:', err);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📈 Progreso de Módulo POO</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#4a148c" />
      ) : typeof progreso === 'number' ? (
        <Text style={styles.valor}>✅ Has completado {progreso.toFixed(1)}%</Text>
      ) : (
        <Text style={styles.valor}>No hay progreso registrado aún</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9ff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a148c',
    marginBottom: 10,
    textAlign: 'center',
  },
  valor: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
