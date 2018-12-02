import React from 'react';
import axios from 'axios';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { WebBrowser, MapView } from 'expo';
import Polyline from '@mapbox/polyline';

import Button from '../components/Button';

const mapStyle = [
  {
    featureType: 'administrative.province',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    vehicle: {
      lat: '',
      lng: '',
    },
    coords: [],
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      const resp = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyCoIq1v0zM4YbH68GzgoB92Hu_ppJSLcqI`);
      const respJson = resp.data;
      console.log(respJson);

      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
      this.setState(state => ({ coords: state.coords.concat(coords) }));
      return coords;
    } catch (error) {
      return error;
    }
  }

  componentDidMount() {
    this.fetchLocationInterval = setInterval(this.fetchVehicleLocation, 1000 * 10);
    this.getDirections('41.085250,29.046162', '41.076824,29.043070');
  }

  componentWillUnmount() {
    clearInterval(this.fetchLocationInterval);
  }

  fetchVehicleLocation = async () => {
    const response = await axios.get('https://servisimapp.herokuapp.com/api/v1/mercedes/vehicle_location/394730478C7E507215?access_token=fd606713-eba8-4de3-a3fe-d91c6ee2b46e');
    const lat = response.data.latitude.value;
    const lng = response.data.longitude.value;
    this.setState({ vehicle: { lat, lng } });
  }

  renderRating() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 56 }}>
          <View style={styles.ratingCircle} />
          <View style={styles.ratingCircle} />
          <View style={styles.ratingCircle} />
          <View style={styles.ratingCircle} />
          <View style={styles.ratingCircle} />
        </View>
        <Text style={styles.ratingText}>5 / 5</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsTraffic
          style={{ flex: 1 }}
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
        >
          <MapView.Marker
            title=""
            description="Beautiful view of Twin Lakes off this hidden forest road."
            coordinate={{
              latitude: this.state.vehicle.lat,
              longitude: this.state.vehicle.lng,
            }}
          />

          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"
          />

        </MapView>

        <View style={styles.topInfoContainer}>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Image
              source={require('../assets/images/driver.png')}
              style={{
                width: 80, height: 80, borderRadius: 40,
              }}
            />
          </View>
          <View style={{ marginLeft: 20, flex: 2 }}>
            <Text style={styles.name}>Hande Büyük</Text>
            {this.renderRating()}
            <Text style={{ ...styles.topInfoText, marginTop: 10 }}>M.Benz Servis / 2017 Model</Text>
            <Text style={{ ...styles.topInfoText, marginTop: 3 }}>Tecrübe: 4 yıl, 577 sefer</Text>
          </View>
        </View>

        <View style={styles.tabBarInfoContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 21, color: '#35343D' }}>5 dk</Text>
            <Text style={{
              fontFamily: 'Montserrat', fontSize: 21, color: '#003F00', marginLeft: 3,
            }}
            >(1.4 km)
            </Text>
            <Text style={{
              fontFamily: 'Montserrat', fontSize: 16, color: '#9B99A9', marginLeft: 10,
            }}
            >
            Hız: 16,8km/s
            </Text>
          </View>
          <Text style={{
            fontFamily: 'Montserrat', fontSize: 16, color: '#35343D', marginTop: 5,
          }}
          >
            Bir sonraki çoçuğa ulaşmana az kaldı!
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
            <Button style={{ backgroundColor: '#F5A623', height: 42 }} text="Gecikeceğim" width={150} />
            <Button style={{ backgroundColor: '#D0021B', height: 42, marginLeft: 5 }} text="Gelemiyorum" width={150} />
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    }
    return (
      <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
      </Text>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes',
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  button: {
    borderRadius: 100, width: 150, height: 42, alignItems: 'center', justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  ratingCircle: {
    backgroundColor: '#00CA9D', width: 8, height: 8, borderRadius: 8,
  },
  ratingText: {
    fontFamily: 'Montserrat-Medium', fontSize: 11, color: '#9B99A9', marginLeft: 8,
  },
  topInfoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingTop: 40,
    paddingBottom: 20,
  },
  name: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    color: '#35343D',
  },
  topInfoText: {
    fontFamily: 'Montserrat', fontSize: 14, color: '#35343D',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 20,
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
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
