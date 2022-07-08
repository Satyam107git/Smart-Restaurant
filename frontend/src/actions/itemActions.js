import axios from "axios";


// So this function is going to be in charge of replacing the API call that we made in our home screen.
//So we're going to take this action right here and we're going to move it in here into our action.

export const listItems = () => async (dispatch) => {
  try {
    dispatch({ type: 'ITEM_LIST_REQUEST' });

    const { data } = await axios.get(`http://127.0.0.1:8000/api/items`);
    dispatch({
      type: 'ITEM_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'ITEM_LIST_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};




export const listItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'ITEM_DETAILS_REQUEST' });

    const { data } = await axios.get(`/api/items/${id}`);

    dispatch({
      type: 'ITEM_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'ITEM_DETAILS_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};





export const deleteItem = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ITEM_DELETE_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/items/delete/${id}/`,
            config
        )

        dispatch({
            type: 'ITEM_DELETE_SUCCESS',
        })

    } catch (error) {
        dispatch({
            type: 'ITEM_DELETE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createItem = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ITEM_CREATE_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/items/create/`,
            {},
            config
        )
        dispatch({
            type: 'ITEM_CREATE_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'ITEM_CREATE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateItem = (item) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ITEM_UPDATE_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/items/update/${item._id}/`,
            item,
            config
        )
        dispatch({
            type: 'ITEM_UPDATE_SUCCESS',
            payload: data,
        })

        dispatch({
            type: 'ITEM_DETAILS_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'ITEM_UPDATE_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createItemReview = (itemId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ITEM_CREATE_REVIEW_REQUEST'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/items/${itemId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: 'ITEM_CREATE_REVIEW_SUCCESS',
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: 'ITEM_CREATE_REVIEW_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
