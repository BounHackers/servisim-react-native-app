import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

function LoginInput({ icon = '', secure, ...props }) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons
        name={icon}
        size={13}
        color={Colors.tabIconDefault}
      />
      <TextInput autoCapitalize="none" secureTextEntry={secure} {...props} style={{ ...styles.input, ...props.style }} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 23,
    width: 315,
    borderRadius: 2,
    marginTop: 2,
    backgroundColor: '#FBFAFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#5F5D70',
    flexGrow: 1,
    marginLeft: 20,
  },
});

export default LoginInput;
