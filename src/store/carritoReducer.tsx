
const types = {
    getItems: 'GET_ITEMS',
    addItem: 'ADD_ITEM',
    removeItem: 'REMOVE_ITEM',
    addGems: 'ADD_GEMS',
    quitGems: 'QUIT_GEMS',
    resetState: 'RESET_STATE'
}

const initialState = {
    items: [],
    gems: 3,
    cart: []
}

const carritoReducer = (state = initialState, action: { type: string; payload: any }) => {
    switch(action.type) {
        case types.getItems:
            return {
                ...state,
                items: action.payload
            }

        case types.addItem:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            }

        case types.removeItem:
            return {
                ...state,
                cart: action.payload,
            }

        case types.addGems:
            return {
                ...state,
                gems: state.gems + action.payload.precio
            }

        case types.quitGems:
            return {
                ...state,
                gems: state.gems - action.payload,
            }

        case types.resetState:
            return initialState

        default:
            return state;
    }
}

export { initialState, types }
export default carritoReducer