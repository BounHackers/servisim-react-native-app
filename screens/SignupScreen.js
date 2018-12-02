import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import LoginInput from '../components/LoginInput';
import Button from '../components/Button';
import request from '../utils/request';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    loading: false,
    username: null,
    password: null,
    passwordConfirm: null,
  }

  signup = async () => {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert('Bir hata oluştu', 'Girilen şifreler birbiriyle aynı değil.');
      return;
    }
    this.setState({ loading: true });
    try {
      const res = await request.post('/parents', { username: this.state.username, password: this.state.password });
      this.props.navigation.navigate('Home');
    } catch (err) {
      this.setState({ loading: false });
      Alert.alert('Bir hata oluştu', err.message);
    }
  }

  onUsernameChange = username => {
    this.setState({ username });
  }

  onPasswordChange = password => {
    this.setState({ password });
  }

  onPasswordConfirmChange = passwordConfirm => {
    this.setState({ passwordConfirm });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ ...styles.container, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.goBack}>
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color={Colors.tabIconDefault}
          />
        </TouchableOpacity>
        <View style={{ ...styles.logoContainer, marginTop: 85 }}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>Servisim</Text>
        </View>
        <View style={styles.inputContainer}>
          <LoginInput icon="md-person" placeholder="E-posta Adresi" onChange={this.onUsernameChange} />
          <LoginInput icon="md-unlock" placeholder="Şifre" onChange={this.onPasswordChange} secure />
          <LoginInput icon="md-unlock" placeholder="Şifre Tekrar" onChange={this.onPasswordConfirmChange} secure />
          <Button style={{ marginTop: 20 }} text="Kayıt Ol" onPress={this.signup} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goBack: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 80,
    width: 60,
    resizeMode: 'contain',
  },
  logoText: {
    fontFamily: 'Akrobat-Bold',
    fontSize: 24,
    color: '#5F5D70',
  },
  inputContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  signupTextContainer: {
    marginTop: 40,
    flexDirection: 'row',
  },
  signupText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#5F5D70',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
