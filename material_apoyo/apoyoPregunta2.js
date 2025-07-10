// material_apoyo/ApoyoPregunta2.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import YoutubePlayer from "react-native-youtube-iframe";

export default function ApoyoPregunta2({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        📘 Material de Apoyo - Crear instancia con <Text style={styles.keyword}>new</Text>
      </Text>

      <Text style={styles.subtitulo}>¿Qué significa instanciar una clase?</Text>
      <Text style={styles.texto}>
        Cuando se crea una clase, estás definiendo una plantilla para un objeto. Para poder usarla, necesitas crear una instancia. Esto se hace con la palabra clave <Text style={styles.keyword}>new</Text>.
      </Text>

      <Text style={styles.ejemploTitulo}>🔍 Ejemplo:</Text>
      <Text style={styles.texto}>
        Supón que tienes una clase llamada <Text style={styles.code}>Animal</Text>. Para crear un objeto de esa clase:
      </Text>
      <Text style={styles.codeBlock}>
        class Animal {"{"}{"\n"}
          {"  "}constructor(nombre) {"{"}{"\n"}
          {"    "}this.nombre = nombre;{"\n"}
          {"  }"}{"\n"}
        {"}"}{"\n\n"}
        const perro = new Animal("Fido");
      </Text>
      <Text style={styles.texto}>
        Con <Text style={styles.keyword}>new</Text>, estás creando un objeto real basado en esa clase.
      </Text>

      <Text style={styles.subtitulo}>🎥 Video explicativo:</Text>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'8l6X3A6goRQ'} // Asegúrate de que este ID sea válido
        />
      </View>

      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.navigate('ModuloPOO')}>
        <Ionicons name="arrow-back" size={20} color="white" />
        <Text style={styles.botonTexto}>Volver al módulo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3e5f5',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  texto: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  ejemploTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8e24aa',
    marginTop: 15,
  },
  codeBlock: {
    backgroundColor: '#e1bee7',
    padding: 12,
    fontFamily: 'monospace',
    borderRadius: 8,
    marginVertical: 10,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#4a148c',
  },
  keyword: {
    fontWeight: 'bold',
    color: '#4a148c',
  },
  videoContainer: {
    height: 220,
    marginVertical: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  botonVolver: {
    backgroundColor: '#6a1b9a',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
