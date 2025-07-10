// screens/ModuloPOO.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,
  Modal, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageViewing from 'react-native-image-viewing';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config';

const preguntasPOO = [
  {
    id: 1,
    pregunta: '¿Qué es una clase en POO?',
    opciones: ['Una función', 'Una plantilla para objetos', 'Una constante'],
    respuestaCorrecta: 'Una plantilla para objetos',
  },
  {
    id: 2,
    pregunta: '¿Qué palabra clave se usa para crear una instancia de clase?',
    opciones: ['this', 'instance', 'new'],
    respuestaCorrecta: 'new',
  },
  {
    id: 3,
    pregunta: '¿Qué representa un objeto en POO?',
    opciones: ['Una variable', 'Una instancia de clase', 'Un tipo de dato'],
    respuestaCorrecta: 'Una instancia de clase',
  },
  {
    id: 4,
    pregunta: '¿Qué es un método?',
    opciones: ['Una propiedad', 'Una función dentro de una clase', 'Un operador'],
    respuestaCorrecta: 'Una función dentro de una clase',
  },
  {
    id: 5,
    pregunta: '¿Qué es la herencia?',
    opciones: ['Reutilizar código de otra clase', 'Copiar métodos', 'Duplicar objetos'],
    respuestaCorrecta: 'Reutilizar código de otra clase',
  },
  {
    id: 6,
    pregunta: '¿Qué palabra clave se usa para heredar una clase?',
    opciones: ['extends', 'inherits', 'base'],
    respuestaCorrecta: 'extends',
  },
  {
    id: 7,
    pregunta: '¿Qué es el encapsulamiento?',
    opciones: ['Ocultar datos internos', 'Mostrar métodos', 'Compartir clases'],
    respuestaCorrecta: 'Ocultar datos internos',
  },
  {
    id: 8,
    pregunta: '¿Qué es el polimorfismo?',
    opciones: ['Reutilizar funciones', 'Múltiples formas de un método', 'Modificar clases'],
    respuestaCorrecta: 'Múltiples formas de un método',
  },
  {
    id: 9,
    pregunta: '¿Qué palabra se usa para definir una clase en JavaScript?',
    opciones: ['object', 'function', 'class'],
    respuestaCorrecta: 'class',
  },
  {
    id: 10,
    pregunta: '¿Qué es un constructor?',
    opciones: ['Una clase padre', 'Un método especial que se ejecuta al crear un objeto', 'Un tipo de operador'],
    respuestaCorrecta: 'Un método especial que se ejecuta al crear un objeto',
  }
];

export default function ModuloPOO({ navigation }) {
  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [respuestaSeleccionada, setRespSel] = useState(null);
  const [terminado, setTerminado] = useState(false);
  const [empezar, setEmpezar] = useState(false);
  const [imagenSeleccionada, setImagen] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/preguntas?modulo=POO`);
        if (res.ok) {
          const data = await res.json();
          const formateadas = data.map((p, idx) => ({
            id: idx + 1,
            pregunta: p.enunciado,
            opciones: p.opciones,
            respuestaCorrecta: p.respuesta_correcta,
          }));
          setPreguntas(formateadas);
        } else {
          setPreguntas(preguntasPOO);
        }
      } catch {
        setPreguntas(preguntasPOO);
      }
    })();
  }, []);

  const preguntaActual = preguntas[indice];

  const abrirImagen = (requireImg) => {
    const src = Image.resolveAssetSource(requireImg);
    setImagen([{ uri: src.uri }]);
    setVisible(true);
  };

  const verificarRespuesta = async (opcion) => {
    setRespSel(opcion);
    if (opcion === preguntaActual.respuestaCorrecta) setPuntos(p => p + 1);

    setTimeout(async () => {
      if (indice + 1 < preguntas.length) {
        setIndice(i => i + 1);
        setRespSel(null);
      } else {
        setTerminado(true);
        await guardarProgreso();
      }
    }, 800);
  };

  const guardarProgreso = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (!token || !userId) return;

      const porcentaje = Math.round((puntos / preguntas.length) * 100);

      await fetch(`${API_BASE_URL}/progreso`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_id: userId,
          modulo_id: 1,
          porcentaje,
        }),
      });
    } catch (err) {
      console.warn('No se pudo guardar progreso:', err.message);
    }
  };

  const reiniciar = () => {
    setIndice(0);
    setPuntos(0);
    setRespSel(null);
    setTerminado(false);
    setEmpezar(false);
  };

  if (!preguntas.length) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}> 
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#f3e5f5', '#ffffff']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🧠 Bienvenido al Módulo: Programación Orientada a Objetos</Text>

        {!empezar && !terminado && (
          <View>
            <TouchableOpacity style={styles.botonEmpezar} onPress={() => setEmpezar(true)}>
              <Text style={styles.botonTexto}>Empezar</Text>
            </TouchableOpacity>
          </View>
        )}

        {empezar && !terminado && (
          <View style={styles.preguntaContainer}>
            {preguntaActual.id === 1 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPOO')}>
                <Text style={styles.materialTexto}>📚 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            {preguntaActual.id === 2 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta2')}>
                <Text style={styles.materialTexto}>📘 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            {preguntaActual.id === 3 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta3')}>
                <Text style={styles.materialTexto}>📖 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            {preguntaActual.id === 4 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta4')}>
                <Text style={styles.materialTexto}>📖 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            {preguntaActual.id === 5 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta5')}>
                <Text style={styles.materialTexto}>📖 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            {preguntaActual.id === 6 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta6')}>
                <Text style={styles.materialTexto}>📖 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
             {preguntaActual.id === 7 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta7')}>
                <Text style={styles.materialTexto}>📖 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            {preguntaActual.id === 8 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta8')}>
                <Text style={styles.materialTexto}>📖 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            {preguntaActual.id === 9 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta9')}>
                <Text style={styles.materialTexto}>📖 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            {preguntaActual.id === 10 && (
              <TouchableOpacity style={styles.materialBoton} onPress={() => navigation.navigate('apoyoPregunta10')}>
                <Text style={styles.materialTexto}>📖 Consultar Material de Apoyo</Text>
              </TouchableOpacity>
            )}
            




            <Text style={styles.pregunta}>{preguntaActual.pregunta}</Text>
            {preguntaActual.opciones.map((op, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.opcion, respuestaSeleccionada === op && (op === preguntaActual.respuestaCorrecta ? styles.correcta : styles.incorrecta)]}
                onPress={() => verificarRespuesta(op)}
                disabled={respuestaSeleccionada !== null}
              >
                <Text style={styles.opcionTexto}>{op}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {terminado && (
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultado}>Puntaje final: {puntos} / {preguntas.length}</Text>
            <TouchableOpacity style={styles.boton} onPress={reiniciar}>
              <Ionicons name="refresh" size={24} color="#fff" />
              <Text style={styles.botonTexto}>Reintentar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boton, { backgroundColor: '#4caf50' }]} onPress={() => navigation.navigate('Progreso')}>
              <Ionicons name="bar-chart" size={24} color="#fff" />
              <Text style={styles.botonTexto}>Ver Progreso</Text>
            </TouchableOpacity>
          </View>
        )}

        <ImageViewing
          images={imagenSeleccionada || []}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#4a148c',
  },
  preguntaContainer: {
    marginVertical: 20,
  },
  pregunta: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  opcion: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
  },
  opcionTexto: {
    fontSize: 16,
    color: '#333',
  },
  correcta: {
    backgroundColor: '#a5d6a7',
  },
  incorrecta: {
    backgroundColor: '#ef9a9a',
  },
  resultadoContainer: {
    alignItems: 'center',
  },
  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#6200ea',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  botonEmpezar: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gradient: {
    flex: 1,
  },
  materialBoton: {
    backgroundColor: '#9575cd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  materialTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
