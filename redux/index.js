import { createStore, combineReducers } from 'redux';
const { fromJS } = require('immutable')

let dataState = { id: null, path: null};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case "SETID":
            let Mstate = fromJS(state)
            let Mstate1 = Mstate.setIn(["id"], action.id)
            let Mstate2 = Mstate1.setIn(["path"], `user/${action.id}/friends` )
            return Mstate2.toJSON();
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    dataReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store;
