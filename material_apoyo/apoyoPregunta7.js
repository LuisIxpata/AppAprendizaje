// material_apoyo/apoyoPregunta7.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from "react-native-youtube-iframe";

export default function ApoyoPregunta7({ navigation }) {
  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🔒 Apoyo: ¿Qué es el encapsulamiento?</Text>

        <Text style={styles.texto}>
          El <Text style={styles.bold}>encapsulamiento</Text> en la programación orientada a objetos (POO) es el principio de ocultar los detalles internos de un objeto y exponer solo lo necesario. Esto protege los datos y evita que se manipulen directamente desde fuera de la clase.
        </Text>

        <Text style={styles.subtitulo}>Ejemplo en JavaScript:</Text>
        <Text style={styles.codigo}>{`class CuentaBancaria {
  #saldo = 0;

  depositar(monto) {
    if (monto > 0) {
      this.#saldo += monto;
    }
  }

  obtenerSaldo() {
    return this.#saldo;
  }
}

const cuenta = new CuentaBancaria();
cuenta.depositar(1000);
console.log(cuenta.obtenerSaldo()); // 1000
console.log(cuenta.#saldo); // ❌ Error: propiedad privada`}</Text>

        <Text style={styles.texto}>
          En este ejemplo, la propiedad <Text style={styles.bold}>#saldo</Text> está encapsulada (es privada) y no se puede acceder directamente desde fuera de la clase. Solo se puede modificar mediante los métodos definidos.
        </Text>

        <Text style={styles.subtitulo}>📺 Video relacionado:</Text>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <YoutubePlayer
            height={230}
            width={320}
            play={false}
            videoId={'gR0EssHrl24'} // Video sobre encapsulamiento
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
