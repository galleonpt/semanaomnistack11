import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Logon from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import NewIncident from './Pages//NewIncident'

//Switch garante que so uma rota seja executada por momento
//path e a rota
//logon e a pagina que ele vai abrir
export default function Routes(){
  //exact para que qnd se mete uma rota ele nao entre no logon pk ele reconhece logo o /
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon}/>
        <Route path="/register" component={Register}/>
        
        <Route path="/profile" component={Profile}/>
        <Route path="/incidents/new" component={NewIncident}/>

      </Switch>
    </BrowserRouter>
  )
}