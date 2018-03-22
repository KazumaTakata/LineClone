import { createStore, combineReducers } from 'redux';
const { fromJS } = require('immutable')

let dataState = { id: null, path: null, friends: null};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case "SETID":
            let Mstate = fromJS(state)
            let Mstate1 = Mstate.setIn(["id"], action.id)
            let Mstate2 = Mstate1.setIn(["path"], `user/${action.id}/friends` )
            return Mstate2.toJSON();
        case "SETFRIENDS":
            let Fstate = fromJS(state)
            let Fstate1 = Fstate.setIn(["friends"], action.friendList)
            return Fstate1.toJSON()
        case "ADDFRIEND":
            let Astate = fromJS(state)
            let Astate1 = Astate.updateIn(["friends"], list => list.push(action.friendId))
            return Astate1.toJSON()
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    dataReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store;
