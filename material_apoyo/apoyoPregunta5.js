// material_apoyo/apoyoPregunta5.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from "react-native-youtube-iframe";

export default function ApoyoPregunta5({ navigation }) {
  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📘 Apoyo: ¿Qué es la herencia en POO?</Text>

        <Text style={styles.texto}>
          La herencia en POO permite que una clase (subclase) adquiera las propiedades y métodos de otra clase (superclase). 
          Esto promueve la reutilización del código y facilita la extensión de funcionalidades.
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

class Perro extends Animal {
  ladrar() {
    console.log(\`\${this.nombre} está ladrando\`);
  }
}

const miPerro = new Perro("Rex");
miPerro.hablar(); // "Rex hace un sonido"
miPerro.ladrar(); // "Rex está ladrando"`}</Text>

        <Text style={styles.texto}>
          Aquí, <Text style={styles.bold}>Perro</Text> hereda de <Text style={styles.bold}>Animal</Text>, por lo que puede usar sus métodos como <Text style={styles.bold}>hablar()</Text> y también tener sus propios métodos como <Text style={styles.bold}>ladrar()</Text>.
        </Text>

        <Text style={styles.subtitulo}>📺 Video relacionado:</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'EI-0hLNBmZE'} // Video sobre herencia en POO
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
