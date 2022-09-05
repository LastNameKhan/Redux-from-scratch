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

_MiddleWare syntax_

npm install redux-logger(or anyother middlware you want for logger it is going to log everything for us in the console)

const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

After this introduce middleware to the store
const store = createStore(rootReducer, applyMiddleware(logger));

**Asynchronous Actions**
Till now we have been working with the synchronous actions
As soon as an action was dispatched, the state was immediately updated.
If you disptach the BUY_CAKE action, the numOfCakes was right away decremented by 1.
Same goes with BUY_ICECREAM action as well.

_Now getting into Aynchronous Actions_
Asynchronous API calls to fetch data from an end point and use that data in your application.

_Our Application_
The app we are going to build is going to fetch a list of users from an API end point and stores it in the redux store.

**State**
State of our application is going to look like
state is going to have a loading flag which is going to tell us about the data being fetched or not.
If you have a UI this flag will help you display a loading spinner in your component.
Now we have the data as an empty array to store the data we are going to get from the api that is list of users.
We also have an error: it will be goving us an error if in case out api fails to load or fetch the data.This message can be used to display the msg to the user in case of not fetching the data.

state = {
loading: true,
data: [],
error: '',
}

loading: Display loading spinner in your component.
Data: List of Users.
error: Display error to the user.

**Actions**
FETCH_USERS_REQUEST - Fetch list of users
The second and third action are dependent on the first action.
FETCH_USERS_SUCCESS - Fetched Successfully.
FETCH_USERS_FAILURE - Error fetching the data.

**Reducers**
case: FETCH_USERS_REQUEST
loading: true

case: FETCH_USERS_SUCCESS
loading: false
users: data(from API)

case: FETCH_USERS_FAILURE
loading: false
error: error (from API)

const intialState = {
  loading: false,
  users: [],
  error: "",
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};