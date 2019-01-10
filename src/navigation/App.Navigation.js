import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainScreen from '../screen/MainScreen';

const AppStackNavigator = createStackNavigator({

    MainScreen: { screen: MainScreen }
}, { headerMode: 'none' });

const AppContainer = createAppContainer(AppStackNavigator);

export default AppContainer;