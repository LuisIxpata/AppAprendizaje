// material_apoyo/apoyoPregunta8.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from "react-native-youtube-iframe";

export default function ApoyoPregunta8({ navigation }) {
  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📘 Apoyo: ¿Qué es el polimorfismo?</Text>

        <Text style={styles.texto}>El <Text style={styles.bold}>polimorfismo</Text> es un principio fundamental de la Programación Orientada a Objetos (POO) que permite que una misma interfaz se comporte de diferentes maneras según el contexto. Esto significa que diferentes clases pueden implementar métodos con el mismo nombre pero con comportamientos distintos.</Text>

        <Text style={styles.subtitulo}>Ejemplo en JavaScript:</Text>
        <Text style={styles.codigo}>{`class Animal {
  hacerSonido() {
    console.log("Haciendo sonido genérico");
  }
}

class Perro extends Animal {
  hacerSonido() {
    console.log("Guau Guau");
  }
}

class Gato extends Animal {
  hacerSonido() {
    console.log("Miau");
  }
}

const animales = [new Perro(), new Gato()];
animales.forEach(a => a.hacerSonido());`}</Text>

        <Text style={styles.texto}>En este ejemplo, tanto la clase <Text style={styles.bold}>Perro</Text> como la clase <Text style={styles.bold}>Gato</Text> implementan el método <Text style={styles.bold}>hacerSonido()</Text> de manera diferente, demostrando el uso del polimorfismo.</Text>

        <Text style={styles.subtitulo}>📺 Video relacionado:</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'oBO01Cx_YwQ'} 
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
