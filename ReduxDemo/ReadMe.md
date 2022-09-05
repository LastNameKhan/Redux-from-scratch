Three Major concepts of Redux
let us just consider a real life scenario

Consider a cake shop
//Entities
shop - Stores cake on a shelf
Shopkeeper - At the front of the store
Customer - At the store entrance

//Activities
Customer - Buy a Cake
Shopkeeper - Remove a cake from the shelf - Reciept to keep the track of the cakes and purchase and sell

Now lets connect it with the Redux scenario
**Store**
A store that holds the state of your application.
In redux the Store safely holds the state of the application
**Action**
An Action that describes the changes in the state of the application.
Where it describes what happened intention to do something
An action describes what happened.
**Reducer**
A reducer which actually carries out the state transition depending on the action.
Reducer ties the store and the actions together in our case reducer is the shopkeeper who performs action buys and hands it over to the customer.
Ties the Store and Action together.

**Three Principles in Redux**
The frist priciple tells you about is the _The state of your whole application is stored in an Object tree within a single store_

Maintains our application state in a single Object which would be managed by the Redux store

Lets assume we are tracking the number of cakes on the shelf
{
numberOfCakes: 10
}

All of your state is stored into a single store.

Second Principle
_The only way to change the state is to emit an action,an object describing what happened_
To update the state of your application You need to let Redux kow about that with an action
Not allowed to directly update the state object
If we relate it to our example
You cannot buy the cake directly from the shop. instead we need to let the shopkeeper know about our action.Our action is to buy cake.
The way we express action in our code is by writing an object that contains a type property indicating your intention for our action which is written into an string.
Let shopkeeper know about our action - BUY_CAKE
{
type:BUY_CAKE
}

Third Principle
_To specify how the state tree is transformed by actions, You write pure reducers_

Reducer - (previousState,action)=> newState

Cake Shop

Reducer is the shopkeeper

const reducer = (state,action) => {
switch (action.type) {
case BUY_CAKE: return {
numberOfCakes: state.numOfCakes - 1
}
}
}

Javascript App - State is managed in Redux Store
It cannot directly change the state.
It has to dispacth an action to via reducer to change the state.
Again the updated value is passed down to the Javascript App from the redux store.
Because Javascript App is subscripbed to the Redux Store.

**Actions**
The only way your application can interact with the store
Carry some information from your app to the redux store
Plain Javascript objects
Have a 'type' property that indicated the type of action being perfomed.
Type property is typically defined as an string constant.

**Redux Store**
Holds application state
Allows access to state via getState()
Allows state to be updated via dispatch(action)
Register to listneners via subscribe(listener)
Handles unregistering of listeners via the function returned by subscribe(listener).It is executed any time the state in the redux store changes.

**Combine Reducers**
const combineReducers = redux.combineReducers;
It basically helps us in working with the two reducersto simplify our App.
For this we can have two action creators.Every action creator will have its own way to work out and some intial state.

intial state is going to be
const intialCakeState = {
numOfCakes: 10,
};

const intialIceCreamState = {
numOfIceCreams: 20,
};

Action Creators are going to be
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

We will be having two reducer functions seperately for every action which is
cakeReducer and IceCreamReducer

In this manner we will wrap out reducer into single object with respective key value pairs
const rootReducer = combineReducers({
cake: cakeReducer,
iceCream: iceCreamReducer,
});

**Middleware**
It is used to implement Redux with some multiple functionality.
To add extra features to the redux we will be using middleware.
It basically provides third-party extension point between dispatching a action, and the moment it reaches the reducer.
Use middleware for logging, crash reporting, performing asynchronous tasks etc.
To use middleware in our app redux library provides us with the function called applymiddleware to apply middleware

*MiddleWare syntax*

npm install redux-logger(or anyother middlware you want for logger it is going to log everything for us in the console)

const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

After this introduce middleware to the store
const store = createStore(rootReducer, applyMiddleware(logger));


