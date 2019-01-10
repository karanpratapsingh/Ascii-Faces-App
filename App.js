import React from 'react';
import { View } from 'react-native';
import { Font, SplashScreen } from 'expo';
import AppContainer from './src/navigation/App.Navigation';

export default class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      isFontLoaded: false
    };

    SplashScreen.preventAutoHide();
  };

  componentDidMount = async () => {

    await Font.loadAsync({

      'Airbnb-Cereal': require('./assets/fonts/AirbnbCereal-Light.ttf')
    });

    this.setState({ ...this.state, isFontLoaded: true });

    setTimeout(() => {
      SplashScreen.hide();      
    }, 500);
  };

  render() {

    return (
      
      <React.Fragment>
        {
          this.state.isFontLoaded ? (
            <AppContainer />
          ) : 
          <View style={{ flex: 1, backgroundColor: '#FAFAFA'}}></View>
        }
      </React.Fragment>
    );
  };
};