const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUy_ICECREAM";

//Action creator is a function that returns an action
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

//Reducers specify how the app's state changes in
//response to actions sent to the store.

//Function that accepts state and action as arguments,
//and returns the next state of the application

//(previousState,action) => newSate

// const intialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const intialCakeState = {
  numOfCakes: 10,
};

const intialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = intialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = intialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

// const reducer = (state = intialState, action) => {
//     switch (action.type) {
//       case BUY_CAKE:
//         return {
//           ...state,
//           numOfCakes: state.numOfCakes - 1,
//         };
//       case BUY_ICECREAM:
//         return {
//           ...state,
//           numOfIceCreams: state.numOfIceCreams - 1,
//         };
//       default:
//         return state;
//     }
//   };

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Intial State", store.getState());
// const unsubscribe = store.subscribe(() =>
//   console.log("Updated State", store.getState())
// );
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();

// Code Tracer :-
// The first line of code we are concerned
// with is const store.This is where we create
// a redux store method from the redux library
// that accepts a parameter it is the reducer
// function who controls how the state transition
// happens.
// Then we console the state of the application
// which is the Intial State as numOfCakes: 10.
// After that we setup a listener to the store
// so any time the store updated we log the state
// to the console.
// When we dispatch the first action the reducer
// sees that the action type is BUY_CAKE.Then it
// will try to match the type with the switch case
// it matched the first case and then simply decrease
// the numOfCakes by 1 and returns the new state.
// so now the store state gets updated the listener
// is called and which consoles the updated state.
// numOfCakes : 9.
