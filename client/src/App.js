import React from 'react';
import AppNavbar from "./components/AppNavbar"
import ShoppingList from "./components/ShoppingList"
import { Provider } from "react-redux"
import store from "./store"
import ItemModal from "./components/itemModal"
import { Container } from "react-bootstrap"
import { loadUser  } from "./actions/authActions"

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';



function App() {

  React.useEffect(()=> {
    store.dispatch(loadUser())
  },[])
  
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
        hello
    </div>
    </Provider>
  );
}

export default App;
