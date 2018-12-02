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
import LoginInput from '../components/LoginInput';
import Button from '../components/Button';
import request from '../utils/request';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    username: null,
    password: null,
    loading: false,
  };

  login = async () => {
    this.setState({ loading: true });
    try {
      const res = await request.post('/parents/login', { username: this.state.username, password: this.state.password });
      this.props.navigation.navigate('Home');
    } catch (err) {
      this.setState({ loading: false });
      if (err && err.status === 401) {
        Alert.alert('Giriş başarısız', 'Girilen bilgileri kontrol ediniz.');
      } else {
        Alert.alert('Bir hata oluştu', err.message);
      }
    }
  }

  onUsernameChange = username => {
    this.setState({ username });
  }

  onPasswordChange = password => {
    this.setState({ password });
  }

  onSignupPress = () => {
    this.props.navigation.navigate('Signup');
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
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>Servisim</Text>
        </View>
        <View style={styles.inputContainer}>
          <LoginInput icon="md-person" placeholder="E-posta Adresi" onChangeText={this.onUsernameChange} />
          <LoginInput icon="md-unlock" placeholder="Şifre" onChangeText={this.onPasswordChange} secure />
          <Button style={{ marginTop: 20 }} text="Giriş Yap" onPress={this.login} />
          <View style={styles.signupTextContainer}>
            <Text style={styles.signupText}>Hesabın yok mu?</Text>
            <TouchableOpacity onPress={this.onSignupPress}><Text style={{ ...styles.signupText, textDecorationLine: 'underline', marginLeft: 5 }}>Kayıt ol</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 85,
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
