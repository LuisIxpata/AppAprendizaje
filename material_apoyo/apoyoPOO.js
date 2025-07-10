import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from '@expo/vector-icons';

export default function ApoyoPOO({ navigation }) {
  const playerRef = useRef(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>📘 Material de Apoyo - Clases en POO</Text>

      <Text style={styles.subtitulo}>¿Qué es una clase en Programación Orientada a Objetos?</Text>
      <Text style={styles.texto}>
        Una clase es una <Text style={styles.negrita}>plantilla o molde</Text> para crear objetos en la Programación Orientada a Objetos (POO).
        Define las <Text style={styles.negrita}>propiedades (atributos)</Text> y <Text style={styles.negrita}>comportamientos (métodos)</Text> que tendrán los objetos creados a partir de ella.
      </Text>

      <Text style={styles.ejemploTitulo}>🔍 Ejemplo:</Text>
      <Text style={styles.texto}>
        Supongamos que creas una clase llamada <Text style={styles.codigo}>Perro</Text>. Esta clase podría tener atributos como <Text style={styles.codigo}>nombre</Text>, <Text style={styles.codigo}>raza</Text> y métodos como <Text style={styles.codigo}>ladrar()</Text>.
        Cada vez que creas un objeto <Text style={styles.codigo}>Perro</Text>, estás instanciando esa clase.
      </Text>

      <Text style={styles.videoTitulo}>🎥 Video explicativo:</Text>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'cfpQ185AHGo'} // Asegúrate de que este ID sea válido
        />
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("ModuloPOO")}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.botonTexto}> Volver al módulo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3e5f5',
    flex: 1
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 10
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  texto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'justify'
  },
  negrita: {
    fontWeight: 'bold'
  },
  codigo: {
    fontFamily: 'monospace',
    backgroundColor: '#eee',
    paddingHorizontal: 4,
    borderRadius: 4
  },
  ejemploTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8e24aa',
    marginTop: 15
  },
  videoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginTop: 20,
    marginBottom: 10
  },
  videoContainer: {
    alignItems: 'center',
    marginBottom: 25
  },
  boton: {
    backgroundColor: '#6a1b9a',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center'
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
