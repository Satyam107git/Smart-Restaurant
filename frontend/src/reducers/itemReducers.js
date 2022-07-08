
export const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    // So this is when our API call returns back.

    case 'ITEM_LIST_REQUEST':
      return { loading: true, items: [] };
    // So the first case is going to be if the items are loading.
    case 'ITEM_LIST_SUCCESS':
      return {
        loading: false,
        items: action.payload,
        //So we're going to return back a payload of data and this is what we get back from the API call is that payload
      };

    // And the last state we want to load in and when we fail.
    case 'ITEM_LIST_FAIL':
      return { loading: false, error: action.payload };

    default:
          return state;
        //   So if for some reason one of our switch cases don't match one of these right here, we just want to
        //   return back to the initial stage.
  }
};




export const itemDetailsReducer = (state = { item: { reviews: [] } }, action) => {
  switch (action.type) {
      case 'ITEM_DETAILS_REQUEST':
          return { loading: true, ...state }

      case 'ITEM_DETAILS_SUCCESS':
          return { loading: false, item: action.payload }

      case 'ITEM_DETAILS_FAIL':
          return { loading: false, error: action.payload }

      default:
          return state
  }
}


export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
      case 'ITEM_DELETE_REQUEST':
          return { loading: true }

      case 'ITEM_DELETE_SUCCESS':
          return { loading: false, success: true }

      case 'ITEM_DELETE_FAIL':
          return { loading: false, error: action.payload }

      default:
          return state
  }
}



export const itemCreateReducer = (state = {}, action) => {
  switch (action.type) {
      case 'ITEM_CREATE_REQUEST':
          return { loading: true }

      case 'ITEM_CREATE_SUCCESS':
          return { loading: false, success: true, item: action.payload }

      case 'ITEM_CREATE_FAIL':
          return { loading: false, error: action.payload }

      case 'ITEM_CREATE_RESET':
          return {}

      default:
          return state
  }
}


export const itemUpdateReducer = (state = { item: {} }, action) => {
  switch (action.type) {
      case 'ITEM_UPDATE_REQUEST':
          return { loading: true }

      case 'ITEM_UPDATE_SUCCESS':
          return { loading: false, success: true, item: action.payload }

      case 'ITEM_UPDATE_FAIL':
          return { loading: false, error: action.payload }

      case 'ITEM_UPDATE_RESET':
          return { item: {} }

      default:
          return state
  }
}



export const itemReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
      case 'ITEM_CREATE_REVIEW_REQUEST':
          return { loading: true }

      case 'ITEM_CREATE_REVIEW_SUCCESS':
          return { loading: false, success: true, }

      case 'ITEM_CREATE_REVIEW_FAIL':
          return { loading: false, error: action.payload }

      case 'ITEM_CREATE_REVIEW_RESET':
          return {}

      default:
          return state
  }
}


export const itemTopRatedReducer = (state = { items: [] }, action) => {
  switch (action.type) {
      case 'ITEM_TOP_REQUEST':
          return { loading: true, items: [] }

      case 'ITEM_TOP_SUCCESS':
          return { loading: false, items: action.payload, }

      case 'ITEM_TOP_FAIL':
          return { loading: false, error: action.payload }

      default:
          return state
  }
}

