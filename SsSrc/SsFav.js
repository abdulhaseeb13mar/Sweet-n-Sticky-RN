/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {
  SsremoveFavAction,
  SssetFavAction,
  SssetCurrentProductAction,
} from '../SsRedux/SsActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../SsComp/SsHeader';
import WrapperScreen from '../SsComp/WrapperScreen';
import NavigationRef from '../SsComp/RefNavigation';
import Loop from '../SsComp/SsFlatList';
import {FruityTiles} from './SsHome';
import {H_W} from '../SsComp/SsDim';
const SsFavourites = (props) => {
  const SsGoToSingleProduct = (item) => {
    props.SssetCurrentProductAction(item);
    NavigationRef.Navigate('SsSingleProduct');
  };

  const SsGoBack = () => NavigationRef.Navigate('SsHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={SsGoBack}
        Title="Favourites"
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: H_W.width * 0.05,
          fontWeight: 'bold',
          marginTop: H_W.height * 0.08,
        }}>
        You have {props.SsFavs.length} Favourite items
      </Text>
      <ScrollView bounces={false}>
        <View style={styles.fav_SL1}>
          <Loop
            data={props.SsFavs}
            renderItem={({item}) => (
              <FruityTiles
                item={item}
                SsGoToSingleProduct={SsGoToSingleProduct}
                SsFavs={props.SsFavs}
                SsRemoveFavAct={(i) => props.SsremoveFavAction(i)}
                SsSetFavAct={(i) => props.SssetFavAction(i)}
              />
            )}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  fav_SL2: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  fav_SL1: {
    flex: 1,
    paddingLeft: H_W.width * 0.027,
    paddingTop: H_W.height * 0.025,
  },
});

const mapStateToProps = (state) => {
  return {
    SsFavs: state.SsToggleFav,
  };
};

export default connect(mapStateToProps, {
  SssetFavAction,
  SssetCurrentProductAction,
  SsremoveFavAction,
})(SsFavourites);
