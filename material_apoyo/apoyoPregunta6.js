// material_apoyo/apoyoPregunta6.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from "react-native-youtube-iframe";

export default function ApoyoPregunta6({ navigation }) {
  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📘 Apoyo: ¿Qué palabra clave se usa para heredar una clase?</Text>

        <Text style={styles.texto}>
          En JavaScript, la palabra clave <Text style={styles.bold}>extends</Text> se utiliza para que una clase hija herede las propiedades y métodos de una clase padre.
        </Text>

        <Text style={styles.subtitulo}>Ejemplo de uso de <Text style={styles.bold}>extends</Text>:</Text>
        <Text style={styles.codigo}>{`class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  sonido() {
    console.log(\`\${this.nombre} hace un sonido\`);
  }
}

class Gato extends Animal {
  maullar() {
    console.log(\`\${this.nombre} maúlla\`);
  }
}

const gato = new Gato("Misu");
gato.sonido(); // Misu hace un sonido
gato.maullar(); // Misu maúlla`}</Text>

        <Text style={styles.texto}>
          Gracias al uso de <Text style={styles.bold}>extends</Text>, la clase <Text style={styles.bold}>Gato</Text> hereda el método <Text style={styles.bold}>sonido()</Text> de <Text style={styles.bold}>Animal</Text>.
        </Text>

        <Text style={styles.subtitulo}>📺 Video relacionado:</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'KJ3wLaLQtF4'} // Video educativo sobre extends en JavaScript
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
