import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, BackHandler, ImageBackground } from 'react-native';
import { StatusBar } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Registro from './screens/Registro';
import RecuperarPass from './screens/RecuperarPass';
import EditarPerfil from './screens/EditarPerfil';
import HomeEstudiante from './screens/HomeEstudiante';
import Perfil from './screens/Perfil';
import Notificaciones from './screens/Notificaciones';
import MisArchivos from './screens/MisArchivos';
import ModuloPOO from './screens/ModuloPOO';
import Progreso from './screens/Progreso';
import ApoyoPOO from './material_apoyo/apoyoPOO';
import ApoyoPregunta2 from './material_apoyo/apoyoPregunta2';
import ApoyoPregunta3 from './material_apoyo/apoyoPregunta3';
import ApoyoPregunta4 from './material_apoyo/apoyoPregunta4';
import ApoyoPregunta5 from './material_apoyo/apoyoPregunta5';
import ApoyoPregunta6 from './material_apoyo/apoyoPregunta6';
import ApoyoPregunta7 from './material_apoyo/apoyoPregunta7';
import ApoyoPregunta8 from './material_apoyo/apoyoPregunta8';
import ApoyoPregunta9 from './material_apoyo/apoyoPregunta9';
import ApoyoPregunta10 from './material_apoyo/apoyoPregunta10';
// Aqui mando a traer la imagen que voy a usar.
const icon = require('./assets/adaptive-icon.png');
const umg = require('./assets/Umg.png');

export default function App() {

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} 
      options={{
        tittle: "LOGIN",
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "black" },
      }}/>

      <Stack.Screen name="Home" component={Home}
      options={{
      tittle: "Inicio",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      gestureEnabled: false,
      }} />

      <Stack.Screen name="Registro" component={Registro} 
      options={{
      tittle: "REGISTRO",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "black" },
      headerBackTitle: "Atrás",
       }} />

      <Stack.Screen name="RecuperarPass" component={RecuperarPass}
      options={{
        tittle: "RECUPERAR CONTRASEÑA",
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "black" },
        headerBackTitle: "Atrás",
 
      }} />

      <Stack.Screen name="EditarPerfil" component={EditarPerfil}
      options={{
        title: "Editar Perfil",
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "black" },
        headerBackTitle: "Atrás",
      }}/>

      <Stack.Screen name="HomeEstudiante" component={HomeEstudiante}
      options={{
      tittle: "Inicio",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      gestureEnabled: false,
      }} />

      <Stack.Screen name='Perfil' component={Perfil}
      options={{
      tittle: "Perfil",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      gestureEnabled: false,
      }}
      />

    <Stack.Screen name='Notificaciones' component={Notificaciones}
      options={{
      tittle: "Perfil",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      gestureEnabled: false,
      }}
      />

    <Stack.Screen name='MisArchivos' component={MisArchivos}
      options={{
      tittle: "Perfil",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      gestureEnabled: false,
      }}
      />

    <Stack.Screen name='ModuloPOO' component={ModuloPOO}
      options={{
      tittle: "POO",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />

    <Stack.Screen name='Progreso' component={Progreso}
      options={{
      tittle: "Progreso",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}

      />
      <Stack.Screen name='apoyoPOO' component={ApoyoPOO}
      options={{
      tittle: "ApoyoPOO",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />

      <Stack.Screen name='apoyoPregunta2' component={ApoyoPregunta2}
      options={{
      tittle: "apoyoPregunta2",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />

      <Stack.Screen name='apoyoPregunta3' component={ApoyoPregunta3}
      options={{
      tittle: "apoyoPregunta3",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />
      <Stack.Screen name='apoyoPregunta4' component={ApoyoPregunta4}
      options={{
      tittle: "apoyoPregunta4",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />
      <Stack.Screen name='apoyoPregunta5' component={ApoyoPregunta5}
      options={{
      tittle: "apoyoPregunta5",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />
      <Stack.Screen name='apoyoPregunta6' component={ApoyoPregunta6}
      options={{
      tittle: "apoyoPregunta6",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />
      <Stack.Screen name='apoyoPregunta7' component={ApoyoPregunta7}
      options={{
      tittle: "apoyoPregunta7",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />
      <Stack.Screen name='apoyoPregunta8' component={ApoyoPregunta8}
      options={{
      tittle: "apoyoPregunta8",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />
      <Stack.Screen name='apoyoPregunta9' component={ApoyoPregunta9}
      options={{
      tittle: "apoyoPregunta9",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />
      <Stack.Screen name='apoyoPregunta10' component={ApoyoPregunta10}
      options={{
      tittle: "apoyoPregunta10",
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerLeft: () => null,
      headerStyle: { backgroundColor: "black" },
      }}
      />
        
      

      </Stack.Navigator>
  );
}

  return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="black"/>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
    </>

  );
}


