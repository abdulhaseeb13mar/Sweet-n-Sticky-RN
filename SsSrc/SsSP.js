/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H_W} from '../SsComp/SsDim';
import WrapperScreen from '../SsComp/WrapperScreen';
import {connect} from 'react-redux';
import Data from '../SSData';
import {colors} from '../SsComp/SsColor';
import NavigationRef from '../SsComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SsSearchBar from '../SsComp/SsSearchBar';
import {Button, Avatar} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  SsremoveFavAction,
  SssetFavAction,
  SsaddCartAction,
  SsremoveCartAction,
} from '../SsRedux/SsActions';

function SingleProduct(props) {
  useEffect(() => {
    // fetchFlavours();
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [flavours, setFlavours] = useState([]);
  const [CurrFlavours, setCurrFlavours] = useState({});
  const SsProduct = props.SsProduct;

  // const fetchFlavours = () => {
  //   let fc = 0;
  //   let fl = [];
  //   for (let ce = 0; ce < Data.topping.length; ce++) {
  //     if (Data.topping[ce].productid === SsProduct.id) {
  //       fl.push(Data.topping[ce]);
  //       if (fc === 3) {
  //         break;
  //       }
  //       fc++;
  //     }
  //   }
  //   setCurrFlavours(fl[0]);
  //   setFlavours(fl);
  // };

  const SsAddToCart = () => {
    props.SsaddCartAction({...SsProduct});
  };
  const SsRemoveFromCart = () => {
    props.SsCart[SsProduct.id].added !== 0 &&
      props.SsremoveCartAction(SsProduct);
  };

  const SsGotoSearch = () => NavigationRef.Navigate('SsSearch');
  const SsGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`,
      }}>
      <View
        style={{
          width: H_W.width,
          height: HEIGHT * 0.3,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: colors.primary,
          position: 'absolute',
          top: 0,
          zIndex: -1,
        }}
      />
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          paddingHorizontal: H_W.width * 0.04,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: HEIGHT * 0.02,
            marginBottom: HEIGHT * 0.05,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={SsGoBack}>
            <Entypo name="chevron-left" color="white" size={H_W.width * 0.06} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={SsGotoSearch}
            style={{width: '85%', marginLeft: H_W.width * 0.05}}>
            <SsSearchBar editable={false} />
          </TouchableOpacity>
        </View>
        <View style={{...border, justifyContent: 'space-between'}}>
          <View style={{...border}}>
            <Avatar
              rounded
              size={H_W.width * 0.75}
              source={SsProduct.images}
              containerStyle={{
                backgroundColor: colors.secondary,
                elevation: 24,
                marginLeft: H_W.width * 0.04,
              }}
            />
          </View>
          <Text
            style={{
              ...border,
              fontWeight: 'bold',
              width: H_W.width * 0.8,
              color: colors.primary,
              fontSize: 28,
              marginTop: HEIGHT * 0.04,
            }}>
            {SsProduct.productName}
          </Text>
          <Text
            style={{
              ...border,
              // width: H_W.width * 0.85,
              color: `rgba(${colors.rgb_Primary}, 0.6)`,
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: HEIGHT * 0.02,
            }}>
            {SsProduct.Description}
          </Text>
          <View
            style={{
              ...border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: HEIGHT * 0.035,
            }}>
            {props.SsCart[SsProduct.id] !== undefined &&
            props.SsCart[SsProduct.id].added !== 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  width: H_W.width * 0.4,
                  alignSelf: 'stretch',
                  backgroundColor: 'white',
                  borderColor: colors.primary,
                  borderWidth: 1.5,
                  borderRadius: 15,
                }}>
                <TouchableOpacity onPress={SsRemoveFromCart}>
                  <Entypo name="minus" size={H_W.width * 0.055} />
                </TouchableOpacity>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {props.SsCart[SsProduct.id].added}
                </Text>
                <TouchableOpacity onPress={SsAddToCart}>
                  <Entypo name="plus" size={H_W.width * 0.055} />
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                title="Add to Cart"
                onPress={SsAddToCart}
                buttonStyle={{
                  borderRadius: 15,
                  backgroundColor: colors.secondary,
                  width: H_W.width * 0.4,
                  paddingVertical: HEIGHT * 0.017,
                }}
                containerStyle={{
                  borderRadius: 15,
                  backgroundColor: colors.secondary,
                }}
              />
            )}
            <Text
              style={{
                backgroundColor: colors.secondary,
                fontWeight: 'bold',
                fontSize: 19,
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center',
                padding: H_W.width * 0.03,
                borderRadius: 10,
              }}>
              ${SsProduct.Price}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}
const border = {
  // borderWidth: 1,
  // borderColor: 'red',
};
const styles = StyleSheet.create({
  singleProduct_CE23: {},
  singleProduct_CE20: {},
  singleProduct_CE19: {},
  singleProduct_CE18: {},
  singleProduct_CE16: {},
  singleProduct_CE15: {},
  singleProduct_CE14: {},
  singleProduct_CE13: {},
  singleProduct_CE12: {},
  singleProduct_CE11: {},
  singleProduct_CE10: {},
  singleProduct_CE9: {},
  singleProduct_CE8: {},
  singleProduct_CE7: {},
  singleProduct_CE6: {},
  singleProduct_CE5: {},
  singleProduct_CE4: {},
  singleProduct_CE3: {},
  singleProduct_CE2: {},
});

const mapStateToProps = (state) => {
  return {
    SsProduct: state.SsCrntPrdtReducer,
    SsFavs: state.SsToggleFav,
    SsCart: state.SsCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  SssetFavAction,
  SsremoveFavAction,
  SsremoveCartAction,
  SsaddCartAction,
})(React.memo(SingleProduct));
