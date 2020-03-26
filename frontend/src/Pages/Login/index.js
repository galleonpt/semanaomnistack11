import React, {useState} from 'react';
import {FiLogIn} from "react-icons/fi" //importar os icons do feather icons
import {Link, useHistory} from "react-router-dom"
import "./styles.css"
import heroesImg from "../../assets/heroes.png"
import logoImg from "../../assets/logo.svg"
import api  from "../../services/api"

export default function Login(){
  const [id, setId]=useState("")
  const history=useHistory();

  async function handleLogin(e){
    e.preventDefault()

    try{//enviar o id da ong que ta querendo logar
      const response=await api.post("sessions", {id})

      //como precisamos de ter o nomne e o id disponivel na app toda entao guardamos no locastorage
      localStorage.setItem("ongId",id)
      localStorage.setItem("ongName",response.data.name)
      history.push("/profile")
    }catch(err){
      alert("Falha no login, tente novamente")
    }
  }

  //em vez de usar a tag <a> usamos o Link para que qnd esta pagina seja acedida nao seja necessario carregar a pagina td
  //to=href
  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Heor"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e=>setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="heores"/>
    </div>
  )
}