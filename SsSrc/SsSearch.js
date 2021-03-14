/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WrapperScreen from '../SsComp/WrapperScreen';
import {H_W} from '../SsComp/SsDim';
import NavigationRef from '../SsComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../SsComp/SsSearchBar';
import Data from '../SSData';
import {HorizontalList} from './SsHome';
import {connect} from 'react-redux';
import {SssetCurrentProductAction} from '../SsRedux/SsActions';
import UseHeader from '../SsComp/SsHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.names.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const SsGoToSingleProduct = (item) => {
    props.SssetCurrentProductAction(item);
    NavigationRef.Navigate('SsSP');
  };

  const CardRender = (Arr) => {
    return Arr.map((item, index) => (
      <View
        key={index}
        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <HorizontalList item={item} SsGoToSingleProduct={SsGoToSingleProduct} />
      </View>
    ));
  };
  const SsGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        Title="All Ice Creams"
        leftIconAction={SsGoBack}
        titleStyle={styles.TextShadow}
        leftIconStyle={styles.TextShadow}
      />
      <View style={styles.SearchBarWrapper}>
        <SearchBar changeSearchText={changeSearchText} />
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{marginTop: H_W.height * 0.03}}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  SsFavs: state.SsToggleFav,
});

export default connect(mapStateToProps, {
  SssetCurrentProductAction,
})(Search);

const styles = StyleSheet.create({
  TextShadow: {
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: H_W.height * 0.003,
  },
  container: {flex: 1},
});
