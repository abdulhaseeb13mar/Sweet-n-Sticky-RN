/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {
  SsremoveCartAction,
  SsaddCartAction,
  SssetCurrentProductAction,
} from '../SsRedux/SsActions';
import WrapperScreen from '../SsComp/WrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../SsComp/SsColor';
import {H_W} from '../SsComp/SsDim';
import RefNavigation from '../SsComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import MyHeader from '../SsComp/SsHeader';
import {HorizontalList} from './SsHome';
import SsItemCounterWrapper from '../SsComp/SsItemCounterWrapper';

export const Cart = (props) => {
  const insets = useSafeAreaInsets();
  const SsCartArray = Object.keys(props.SsCart);
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const goBack = () => RefNavigation.Navigate('SsHome');

  const SsGoToSingleProduct = (item) => {
    props.SssetCurrentProductAction(item);
    RefNavigation.Navigate('SsSP');
  };

  const SsinfoScreen = () => RefNavigation.Navigate('SsContact');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <ScrollView bounces={false} style={{flex: 1}}>
          <MyHeader
            leftIcon={Entypo}
            leftIconName="chevron-left"
            leftIconAction={goBack}
            Title="Cart"
            leftIconStyle={styles.cart_CE1}
            titleStyle={styles.cart_CE1}
          />
          <View>
            {SsCartArray.length > 0 ? (
              SsCartArray.map((id, index) => {
                const item = props.SsCart[id];
                return (
                  <View key={index} style={styles.cart_CE2}>
                    <SsItemCounterWrapper
                      position="left"
                      Counterlength={HEIGHT * 0.11}
                      style={{margin: 17}}
                      item={item}
                      SsGoToSingleProduct={SsGoToSingleProduct}>
                      <HorizontalList
                        item={item}
                        SsGoToSingleProduct={SsGoToSingleProduct}
                        cart={true}
                      />
                    </SsItemCounterWrapper>
                  </View>
                );
              })
            ) : (
              <Text style={styles.cart_CE3}>Your Cart is empty...</Text>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            ...styles.cart_CE4,
            marginBottom: -insets.bottom,
            height: HEIGHT * 0.2,
          }}>
          <View>
            <Text style={styles.cart_CE5}>Total: ${props.SsTotal}</Text>
            <Button
              onPress={SsinfoScreen}
              title="Checkout"
              disabled={props.SsTotal < 1}
              raised
              titleStyle={styles.cart_CE6}
              buttonStyle={styles.cart_CE7}
              containerStyle={{marginTop: 8, width: '40%'}}
            />
          </View>
          <ImageBackground
            source={require('../SsAssets/ice22.png')}
            style={{
              ...styles.cart_CE8,
              height: HEIGHT * 0.3,
              top: -HEIGHT * 0.05,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  cart_CE8: {
    width: H_W.width * 0.4,
    position: 'absolute',
    right: 0,
  },
  cart_CE7: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cart_CE6: {
    color: colors.primary,
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  cart_CE5: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cart_CE4: {
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    backgroundColor: `rgba(${colors.rgb_Primary},1)`,
    position: 'relative',
    paddingHorizontal: H_W.width * 0.07,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderBottomColor: 'transparent',
  },
  cart_CE3: {
    width: '100%',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  cart_CE2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart_CE1: {
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
});

const mapStateToProps = (state) => ({
  SsCart: state.SsCartReducer.items,
  SsTotal: state.SsCartReducer.totalAmount,
});

export default connect(mapStateToProps, {
  SsremoveCartAction,
  SsaddCartAction,
  SssetCurrentProductAction,
})(Cart);
