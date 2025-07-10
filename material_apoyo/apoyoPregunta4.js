// material_apoyo/apoyoPregunta4.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from "react-native-youtube-iframe";

export default function ApoyoPregunta4({ navigation }) {
  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📘 Apoyo: ¿Qué es un método en POO?</Text>

        <Text style={styles.texto}>
          Un método en programación orientada a objetos (POO) es una función definida dentro de una clase. 
          Estos métodos permiten que los objetos realicen acciones o comportamientos.
        </Text>

        <Text style={styles.subtitulo}>Ejemplo en JavaScript:</Text>
        <Text style={styles.codigo}>{`class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(\`\${this.nombre} hace un sonido\`);
  }
}

const perro = new Animal("Firulais");
perro.hablar(); // "Firulais hace un sonido"`}</Text>

        <Text style={styles.texto}>
          En este caso, <Text style={styles.bold}>hablar()</Text> es un método definido dentro de la clase 
          <Text style={styles.bold}> Animal</Text> que puede ser utilizado por cualquier objeto creado a partir de ella.
        </Text>

        <Text style={styles.subtitulo}>📺 Video relacionado:</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'XNVHS5eT5HU'} // Reemplaza si deseas otro más específico
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
    marginTop: -50,
  },
  botonTexto: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
