import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './SsComp/RefNavigation';
import SsHome from './SsSrc/SsHome';
import SsSP from './SsSrc/SsSP';
import SsCart from './SsSrc/SsCart';
import SsContact from './SsSrc/SsContact';
import SsSearch from './SsSrc/SsSearch';
import SsConfirmOrder from './SsSrc/SsConfirmOrder';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="SsConfirmOrder"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="SsHome" component={SsHome} />
        <Stack.Screen name="SsSP" component={SsSP} />
        <Stack.Screen name="SsCart" component={SsCart} />
        <Stack.Screen name="SsSearch" component={SsSearch} />
        <Stack.Screen name="SsContact" component={SsContact} />
        <Stack.Screen name="SsConfirmOrder" component={SsConfirmOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
