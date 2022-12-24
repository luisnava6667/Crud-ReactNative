import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Inicio from './src/views/Inicio';
import NuevoCliente from './src/views/NuevoCliente';
import DetalleCliente from './src/views/DetalleCliente';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import BarraSuperior from './src/components/ui/Barra';

const Stack = createNativeStackNavigator();
//Definir el tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF',
  },
};

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {backgroundColor: theme.colors.primary},
              headerTintColor: theme.colors.surface,
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}>
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={({navigation, router}) => ({
                headerLeft: props => (
                  <BarraSuperior
                    {...props}
                    navigation={navigation}
                    router={router}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="NuevoCliente"
              component={NuevoCliente}
              options={{title: 'Nuevo Cliente'}}
            />
            <Stack.Screen
              name="DetalleCliente"
              component={DetalleCliente}
              options={{title: 'Detalle Cliente'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
