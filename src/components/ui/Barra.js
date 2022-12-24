import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const BarraSuperior = ({navigation, route}) => {
  const handlePress = () => {
    navigation.navigate('NuevoCliente');
  };
  return (
    <Button icon="plus-circle" textColor="#FFF" onPress={() => handlePress()}>
      Cliente
    </Button>
  );
};
const styles = StyleSheet.create({});
export default BarraSuperior;
