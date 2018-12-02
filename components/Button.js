import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function Button({ width = 280, text, ...props }) {
  return (
    <TouchableOpacity
      {...props}
      style={{
        ...styles.button, width, borderRadius: width / 14 * 5, height: width / 28 * 5, ...props.style,
      }}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00CA9D',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});

export default Button;
