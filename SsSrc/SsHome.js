/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../SsComp/WrapperScreen';
import {colors} from '../SsComp/SsColor';
import {H_W} from '../SsComp/SsDim';
import Data from '../SSData';
import Loop from '../SsComp/SsFlatList';
import RefNavigation from '../SsComp/RefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  SssetCurrentProductAction,
  SsremoveFavAction,
  SssetFavAction,
} from '../SsRedux/SsActions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyHeader from '../SsComp/SsHeader';
import {Button} from 'react-native-elements';

function SsHome(props) {
  useEffect(() => {
    changeTab(Data.catagory[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [categories, setCategories] = useState(Data.catagory);
  const [currentCat, setCurrentCat] = useState(Data.catagory[0]);
  const [tabProducts, setTabProducts] = useState([]);
  // const [mostPopular, setMostPopular] = useState([]);
  // const [newArrival, setNewArrival] = useState([]);
  const changeTab = (tab) => {
    setCurrentCat(tab);
    const filteredProducts = Data.products.filter(
      (item) => item.catagoryId === tab.id,
    );
    setTabProducts(filteredProducts);
  };

  // const SsGotoCart = () => RefNavigation.NavigateAndReset('SsCart');
  // const SsGotoSearch = () => RefNavigation.Navigate('SsSearch');
  // const SsGoToSingleProduct = (item) => {
  //   props.SssetCurrentProductAction(item);
  //   RefNavigation.NavigateAndReset('SsSP');
  // };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView>
        <View>
          <Loop
            data={categories}
            renderItem={({item}) => (
              <TabList
                item={item}
                currentCat={currentCat}
                changeTab={changeTab}
              />
            )}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: H_W.width * 0.6,
              width: H_W.width * 0.16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              backgroundColor: colors.primary,
            }}>
            <View
              style={{
                transform: [{rotate: '270deg'}],
                alignSelf: 'stretch',
                width: H_W.width * 0.52,
                // height: HEIGHT * 0.25,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  height: H_W.width * 0.2,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: 'white',
                  // width: H_W.width * 0.25,
                }}>
                {currentCat.CatagoryName}
              </Text>
            </View>
          </View>
          <Loop
            data={tabProducts}
            renderItem={({item}) => <ProductList item={item} />}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

export const ProductList = ({item}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 20,
        marginHorizontal: H_W.width * 0.03,
      }}>
      <View
        style={{
          flex: 1,
          width: H_W.width * 0.6,
          backgroundColor: 'white',
          padding: H_W.width * 0.03,
          alignItems: 'center',
          borderRadius: 20,
          justifyContent: 'flex-start',
        }}>
        <ImageBackground
          source={item.images}
          style={{width: '100%', height: HEIGHT * 0.3}}
          resizeMode="contain"
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            color: colors.primary,
            alignSelf: 'flex-start',
          }}>
          {item.productName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: HEIGHT * 0.002,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: colors.lightGrey3,
              fontWeight: 'bold',
            }}>
            {item.catagoryName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: colors.lightGrey3,
              fontWeight: 'bold',
            }}>
            {item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, changeTab, currentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 20,
        marginHorizontal: H_W.width * 0.03,
      }}
      onPress={() => changeTab(item)}>
      <View
        style={{
          width: H_W.width * 0.3,
          backgroundColor:
            item.CatagoryName === currentCat.CatagoryName
              ? `rgba(${colors.rgb_Primary},0.7)`
              : 'white',
          height: HEIGHT * 0.2,
          padding: H_W.width * 0.03,
          alignItems: 'center',
          borderRadius: 20,
          justifyContent: 'space-between',
        }}>
        <ImageBackground
          source={
            item.CatagoryName === currentCat.CatagoryName
              ? item.iconw
              : item.icon
          }
          style={{width: '100%', height: HEIGHT * 0.1}}
          resizeMode="contain"
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 19,
            color:
              item.CatagoryName === currentCat.CatagoryName
                ? 'white'
                : colors.primary,
          }}>
          {item.CatagoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SsHome_CE21: {},
  SsHome_CE20: {},
  SsHome_CE19: {},
  SsHome_CE18: {},
  SsHome_CE17: {},
  SsHome_CE16: {},
  SsHome_CE15: {},
  SsHome_CE14: {},
  SsHome_CE13: {},
  SsHome_CE12: {},
  SsHome_CE11: {},
  SsHome_CE10: {},
  SsHome_CE9: {},
  SsHome_CE8: {},
  SsHome_CE7: {},
  SsHome_CE6: {},
  SsHome_CE5: {},
  SsHome_CE4: {},
  SsHome_CE3: {},
  SsHome_CE2: {},
  SsHome_CE1: {},
});

const mapStateToProps = (state) => {
  return {
    SsTotal: state.SsCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {
  SssetCurrentProductAction,
  SsremoveFavAction,
  SssetFavAction,
})(SsHome);
