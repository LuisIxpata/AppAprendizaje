// material_apoyo/apoyoPregunta3.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from "react-native-youtube-iframe";

export default function ApoyoPregunta3({ navigation }) {
  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📘 Apoyo: ¿Qué representa un objeto en POO?</Text>

        <Text style={styles.texto}>Un objeto en programación orientada a objetos (POO) es una instancia de una clase. Es decir, es una entidad que contiene tanto datos (atributos) como funciones (métodos) que operan sobre esos datos.</Text>

        <Text style={styles.subtitulo}>Ejemplo en JavaScript:</Text>
        <Text style={styles.codigo}>{`class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
}

const juan = new Persona("Juan", 30);
console.log(juan.nombre); // "Juan"`}</Text>

        <Text style={styles.texto}>En este ejemplo, <Text style={styles.bold}>juan</Text> es un objeto creado a partir de la clase <Text style={styles.bold}>Persona</Text>.</Text>

        <Text style={styles.subtitulo}>📺 Video relacionado:</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'tTkryyqMHNI'} // Asegúrate de que este ID sea válido
        />
      </View>

        <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.navigate('ModuloPOO')}>
        <Ionicons name="arrow-back" size={20} color="white" />
        <Text style={styles.botonTexto}>Volver al módulo</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4a148c',
    textAlign: 'center'
  },
  texto: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333'
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#6a1b9a'
  },
  codigo: {
    fontFamily: 'monospace',
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  bold: {
    fontWeight: 'bold'
  },
  botonLink: {
    backgroundColor: '#9575cd',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  linkTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
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
