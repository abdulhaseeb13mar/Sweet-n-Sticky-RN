/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
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
import Loop from '../SsComp/SsFlatList';
import SsItemCounterWrapper from '../SsComp/SsItemCounterWrapper';
import {ProductList} from './SsHome';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.SsCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.SsCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.SsCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const SsGoBack = () => RefNavigation.GoBack();

  const SsGoToSingleProduct = (item) => {
    props.SssetCurrentProductAction(item);
    RefNavigation.Navigate('SsSP');
  };

  const SsinfoScreen = () => RefNavigation.Navigate('SsContact');

  return (
    <WrapperScreen
      style={{backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <View
          style={{
            width: H_W.width,
            height: HEIGHT * 0.15,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: colors.primary,
            paddingHorizontal: H_W.width * 0.04,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
          }}>
          <View
            style={{
              marginTop: HEIGHT * 0.03,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={SsGoBack}>
              <Entypo
                name="chevron-left"
                color="white"
                size={H_W.width * 0.06}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 23,
                marginLeft: H_W.width * 0.25,
              }}>
              Your Cart
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: HEIGHT * 0.015,
              paddingHorizontal: H_W.width * 0.06,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: H_W.width * 0.045,
              }}>
              Total Bill:
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: H_W.width * 0.05,
                backgroundColor: colors.secondary,
                padding: 3,
                borderRadius: 8,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}>
              ${props.SsTotal}
            </Text>
          </View>
        </View>
        <View style={{marginTop: HEIGHT * 0.04}}>
          {HorizontalCartArray.length > 0 ? (
            <Loop
              data={HorizontalCartArray}
              renderItem={({item}) => (
                <SsItemCounterWrapper
                  position="bottom"
                  Counterlength={HEIGHT * 0.15}
                  style={{marginLeft: H_W.width * 0.02}}
                  item={item}
                  counterColor={colors.primary}
                  counterContentColor={'white'}
                  CeGoToSingleProduct={SsGoToSingleProduct}>
                  <ProductList
                    item={item}
                    SsGoToSingleProduct={SsGoToSingleProduct}
                  />
                </SsItemCounterWrapper>
              )}
            />
          ) : (
            <Text
              style={{
                width: '100%',
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
              }}>
              Your Cart is empty...
            </Text>
          )}
        </View>
      </ScrollView>
      <Button
        onPress={SsinfoScreen}
        title="Proceed to Checkout"
        disabled={props.SsTotal < 1}
        buttonStyle={{
          backgroundColor: colors.primary,
          paddingVertical: HEIGHT * 0.015,
          borderRadius: 0,
        }}
        containerStyle={{borderRadius: 0}}
      />
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  SsCart: state.SsCartReducer.items,
  SsTotal: state.SsCartReducer.totalAmount,
});

export default connect(mapStateToProps, {
  SsremoveCartAction,
  SsaddCartAction,
  SssetCurrentProductAction,
})(Cart);
