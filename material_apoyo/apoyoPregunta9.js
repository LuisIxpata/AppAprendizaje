// material_apoyo/apoyoPregunta9.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function ApoyoPregunta9({ navigation }) {
  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📘 Apoyo: ¿Qué palabra se usa para definir una clase en JavaScript?</Text>

        <Text style={styles.texto}>
          En JavaScript, la palabra clave utilizada para definir una clase es <Text style={styles.bold}>class</Text>. Esta palabra fue introducida en ECMAScript 6 (ES6) para facilitar la programación orientada a objetos en JavaScript.
        </Text>

        <Text style={styles.subtitulo}>Ejemplo en JavaScript:</Text>
        <Text style={styles.codigo}>{`class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
  hablar() {
    console.log(this.nombre + ' hace un ruido.');
  }
}

const perro = new Animal('Firulais');
perro.hablar();`}</Text>

        <Text style={styles.texto}>
          Como puedes ver, <Text style={styles.bold}>class</Text> se utiliza para declarar la clase <Text style={styles.bold}>Animal</Text>, y luego se crea una instancia llamada <Text style={styles.bold}>perro</Text>.
        </Text>

        <Text style={styles.subtitulo}>📺 Video relacionado:</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'cUj8CiYIbyI'}
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
