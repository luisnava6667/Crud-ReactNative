/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {
  const {guardarConsultarAPI} = route.params;
  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);
  //detectar si estamos editando o no
  useEffect(() => {
    if (route.params.cliente) {
      const {nombre, telefono, correo, empresa} = route.params.cliente;
      guardarNombre(nombre);
      guardarTelefono(telefono);
      guardarCorreo(correo);
      guardarEmpresa(empresa);
    }
  }, []);
  //almacena el cliente en la base de datos
  const guardarCliente = async () => {
    //validar
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      guardarAlerta(true);
      return;
    }
    //generar el cliente
    const cliente = {nombre, telefono, correo, empresa};
    console.log(cliente);
    //guardar el cliente a la API
    //si estamos editando o creando un nuevo cliente
    if (route.params.cliente) {
      const {id} = route.params.cliente;
      cliente.id = id;
      const url = `http://192.168.0.5:4000/clientes/${id}`;
      try {
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // if (Platform.OS === 'ios') {
        // await axios.post('http://localhost:4000/clientes', cliente);
        // }
        await axios.post('http://192.168.0.5:4000/clientes', cliente);
      } catch (error) {
        console.log('error catch', error);
      }
    }
    //redireccionar
    navigation.navigate('Inicio');
    //Limpiar el formulario
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');
    //cambiar a true para traernos los nuevos  clientes
    guardarConsultarAPI(true);
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
      <TextInput
        label="Nombre"
        placeholder="Escriba el Nombre"
        style={styles.input}
        onChangeText={texto => guardarNombre(texto)}
        value={nombre}
      />
      <TextInput
        label="Teléfono"
        placeholder="Escriba el Teléfono"
        style={styles.input}
        onChangeText={texto => guardarTelefono(texto)}
        value={telefono}
      />
      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        style={styles.input}
        onChangeText={texto => guardarCorreo(texto)}
        value={correo}
      />
      <TextInput
        label="Empresa"
        placeholder="Nombre de la Empresa"
        style={styles.input}
        onChangeText={texto => guardarEmpresa(texto)}
        value={empresa}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>
      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
export default NuevoCliente;
