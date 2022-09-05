const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";

//Action creator is a function that returns an action
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

//Reducers specify how the app's state changes in
//response to actions sent to the store.

//Function that accepts state and action as arguments,
//and returns the next state of the application

//(previousState,action) => newSate

const intialState = {
  numOfCakes: 10,
};

const reducer = (state = intialState, action) => {
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

const store = createStore(reducer);
console.log("Intial State", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();

// Code Tracer :-
// The first line of code we are concerned
// with is line no 38.This is where we create
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
