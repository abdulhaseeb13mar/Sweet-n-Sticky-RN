/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WrapperScreen from '../SsComp/WrapperScreen';
import {View, Text} from 'react-native';
import {H_W} from '../SsComp/SsDim';
import {colors} from '../SsComp/SsColor';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import NavigationRef from '../SsComp/RefNavigation';
import {connect} from 'react-redux';
import {SsresetCart} from '../SsRedux/SsActions';

function SsConfirmOrder(props) {
  const ResetAndGoHome = () => {
    props.SsresetCart();
    NavigationRef.NavigateAndReset('SsHome');
  };
  return (
    <WrapperScreen
      style={{
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome5
          name="candy-cane"
          size={H_W.width * 0.4}
          color={colors.secondary}
        />
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
            width: H_W.width * 0.9,
            marginTop: 15,
          }}>
          WE HAVE RECEIEVED YOUR ORDER
        </Text>
        <Button
          onPress={ResetAndGoHome}
          title="Get More Sweats!"
          buttonStyle={{
            backgroundColor: colors.secondary,
            width: H_W.width * 0.6,
          }}
          raised
          titleStyle={{fontSize: 20, fontWeight: 'bold', borderRadius: 10}}
          containerStyle={{marginTop: 15, borderRadius: 10}}
        />
      </View>
    </WrapperScreen>
  );
}

export default connect(null, {SsresetCart})(React.memo(SsConfirmOrder));
