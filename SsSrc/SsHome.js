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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Avatar, Badge} from 'react-native-elements';
import SsSearchBar from '../SsComp/SsSearchBar';
import dp from '../SsPhotos/dp.jpg';

function SsHome(props) {
  useEffect(() => {
    changeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [categories, setCategories] = useState(Data.category);
  const [currentCat, setCurrentCat] = useState(Data.category[0]);
  const [tabProducts, setTabProducts] = useState([]);

  const changeTab = (tab) => {
    setCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryId === tab.id,
    );
    setTabProducts(filteredProducts);
  };

  const SsGotoCart = () => RefNavigation.Navigate('SsCart');
  const SsGotoSearch = () => RefNavigation.Navigate('SsSearch');
  const SsGoToSingleProduct = (item) => {
    props.SssetCurrentProductAction(item);
    RefNavigation.Navigate('SsSP');
  };
  return (
    <WrapperScreen
      style={{backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`}}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: HEIGHT * 0.02,
            marginBottom: HEIGHT * 0.05,
            paddingHorizontal: H_W.width * 0.05,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={SsGotoSearch}
            style={{width: H_W.width * 0.65}}>
            <SsSearchBar editable={false} />
          </TouchableOpacity>
          <TouchableOpacity onPress={SsGotoCart} style={{padding: 4}}>
            <MaterialIcons
              name="shopping-bag"
              size={H_W.width * 0.1}
              color={colors.primary}
            />
            {props.SstotalItems > 0 && (
              <Badge
                value={props.SstotalItems}
                containerStyle={styles.badgeContainer}
                badgeStyle={{
                  backgroundColor: colors.secondary,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: H_W.width * 0.07,
            marginBottom: HEIGHT * 0.03,
          }}>
          <View>
            <Text
              style={{fontWeight: 'bold', color: colors.primary, fontSize: 23}}>
              Victoria Topsy
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 14,
                marginTop: HEIGHT * 0.005,
              }}>
              Away Last 15 min
            </Text>
          </View>
          <Avatar rounded size={H_W.width * 0.15} source={dp} />
        </View>
        <View style={{marginBottom: HEIGHT * 0.03}}>
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
        <View style={{}}>
          <Loop
            data={tabProducts}
            renderItem={({item}) => (
              <ProductList
                item={item}
                SsGoToSingleProduct={SsGoToSingleProduct}
              />
            )}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

export const ProductList = ({item, SsGoToSingleProduct}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity onPress={() => SsGoToSingleProduct(item)}>
      <ImageBackground
        source={item.images}
        resizeMode="contain"
        imageStyle={{borderRadius: 30}}
        style={{
          width: H_W.width * 0.7,
          height: HEIGHT * 0.6,
          backgroundColor: colors.secondary,
          borderRadius: 30,
          marginHorizontal: H_W.width * 0.05,
          position: 'relative',
          overflow: 'hidden',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: 'white',
            borderRadius: 50,
            opacity: 0.2,
            transform: [{scaleX: 4.5}, {scaleY: 4}],
            position: 'absolute',
            top: 0,
            zIndex: -1,
          }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const TabList = ({item, changeTab, currentCat}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() => changeTab(item)}>
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.categoryName === currentCat.categoryName
              ? colors.primary
              : `rgba(${colors.rgb_Primary}, 0.5)`,
        }}>
        {item.categoryName}
      </Text>
      {item.categoryName === currentCat.categoryName ? (
        <View style={styles.tabIndicator} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SsHome21: {},
  SsHome20: {},
  SsHome19: {},
  SsHome18: {},
  SsHome17: {},
  SsHome16: {},
  SsHome15: {},
  SsHome14: {},
  SsHome13: {},
  SsHome12: {},
  SsHome11: {},
  SsHome10: {},
  SsHome9: {},
  SsHome8: {},
  SsHome7: {},
  SsHome6: {},
  SsHome5: {},
  SsHome4: {},
  SsHome3: {},
  SsHome2: {},
  SsHome1: {},
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  tabIndicator: {
    width: '100%',
    borderWidth: 1.8,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: colors.primary,
  },
  HomeTabsText: {
    fontSize: 16,
    fontWeight: '700',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: H_W.width * 0.05,
    height: H_W.width * 0.1,
    paddingHorizontal: H_W.width * 0.02,
    paddingTop: H_W.width * 0.02,
  },
});

const mapStateToProps = (state) => {
  return {
    SstotalItems: state.SsCartReducer.totalItems,
  };
};

export default connect(mapStateToProps, {
  SssetCurrentProductAction,
  SsremoveFavAction,
  SssetFavAction,
})(SsHome);
