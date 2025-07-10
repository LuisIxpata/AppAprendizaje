// material_apoyo/apoyoPregunta10.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function ApoyoPregunta10({ navigation }) {
  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🔧 Apoyo: ¿Qué es un constructor?</Text>

        <Text style={styles.texto}>
          En programación orientada a objetos, un <Text style={styles.bold}>constructor</Text> es un método especial que se ejecuta automáticamente cuando se crea un nuevo objeto a partir de una clase. Su propósito principal es inicializar las propiedades del objeto.
        </Text>

        <Text style={styles.subtitulo}>Ejemplo en JavaScript:</Text>
        <Text style={styles.codigo}>{`class Auto {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }
}

const miAuto = new Auto("Toyota", "Corolla");
console.log(miAuto.marca); // "Toyota"`}</Text>

        <Text style={styles.texto}>En este ejemplo, <Text style={styles.bold}>miAuto</Text> es una instancia de la clase <Text style={styles.bold}>Auto</Text> y el constructor se encarga de asignar los valores iniciales.</Text>

        <Text style={styles.subtitulo}>📺 Video relacionado:</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'vQfMR6ZIRgc'} 
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
