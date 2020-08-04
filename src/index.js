import React, { useEffect,useReducer } from "react";
import ReactDOM from "react-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Registe";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import firbase from "./firebase/firebase";

const rootElement = document.getElementById("root");

const INITIAL={
  currentUser:null,
  channel:''
}
const reducer=(state,action)=>{
  switch (action.type) {
    case 'CurrentUser':
      return {
       ...state,currentUser:action.payload 
      }
      break;
    case 'ClearUser':
      return {
        ...state,currentUser:'' 
      }
      break;
    case 'CHANGE_CHANNEL':
      return{
        ...state,
        channel:action.payload
      }
    default:
      return state;
  }
}
//Set Current User
const SetCurrentUser=(user)=>({
  type:'CurrentUser',
  payload:user
})

//Clear User State
const ClearUser=()=>({
  type:'ClearUser'
})

//Put Channel To State
const setChannel=(channel)=>({
  type:'CHANGE_CHANNEL',
  payload:channel
})


const Root = ({ history }) => {
 const [state,dispatch]=useReducer(reducer,INITIAL)
 const {currentUser,channel}=state
  useEffect(() => {
    //Understanding to user exist
    firbase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        history.push("/");
        dispatch(SetCurrentUser(userAuth));
      } else {
        history.push("/register");
      }
    });
  },[]);
  const clean=()=>{
   dispatch( ClearUser())

  }
  //Create Function for Set Channel
  const setChan=(channel)=>{
    dispatch(setChannel(channel))
    console.log(channel);
  }
  return (
    <Switch>
      <Route exact path="/" render={() => <App setChannel={setChan} currentChannel={channel} clean={clean} user={currentUser} />} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

const Wrap = withRouter(Root);
ReactDOM.render(
  <Router>
    <Wrap />
  </Router>,
  rootElement
);
