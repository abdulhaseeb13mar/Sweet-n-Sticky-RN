import ActionTypes from './actionTypes';

export const SsUserAction = (userinfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.USER_INFO,
      payload: userinfo,
    });
  };
};

export const SssetCurrentProductAction = (productInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_PRODUCT,
      payload: productInfo,
    });
  };
};

export const SssetFavAction = (favItem) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_FAVOURITE,
      payload: favItem,
    });
  };
};

export const SsremoveFavAction = (itemId) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_FAVOURITE,
      payload: itemId,
    });
  };
};

export const SsaddCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_ITEM_CART,
      payload: item,
    });
  };
};

export const SsremoveCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_ITEM_CART,
      payload: item,
    });
  };
};

export const SsresetCart = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.RESET_CART,
    });
  };
};
