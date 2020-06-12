import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import AddChapter from './pages/AddChapter'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/add">
          <AddChapter />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
