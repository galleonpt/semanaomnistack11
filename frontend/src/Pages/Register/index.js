import React, { useState } from 'react';
import logoImg from "../../assets/logo.svg"
import {Link, useHistory} from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import "./styles.css"
import api from "../../services/api"

export default function Register(){
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [number, setNumber]=useState("");
  const [city, setCity]=useState("");
  const [district, setDistrict]=useState("");
  
  const history=useHistory();

  async function handleRegister(e){
    e.preventDefault();//qdn o formulario e enviado a pagina recarrega(por definicao). fazendo isto a pagina ja nao recarrega
    
    const data={
      name, 
      email, 
      number, 
      city, 
      district 
    }
  
    try{
      const response=await api.post("ongs", data)

      alert(`Seu ID de acesso é: ${response.data.id}`);

      history.push('/');//qnd e efetuado um registo o user e direcionado para a pagina de login
    }catch(err){
      alert("Erro no cadastro, tente novamente")
    }
  }


  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"></img>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
        
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e=> setName(e.target.value)}
          />

          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={e=> setEmail(e.target.value)}
          />

          <input 
            placeholder="Numero telemovel"
            value={number}
            onChange={e=> setNumber(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e=> setCity(e.target.value)}
            />

            <input 
              placeholder="Distrito" 
              style={{width:200}}
              value={district}
              onChange={e=> setDistrict(e.target.value)}
            />  
          </div>

          <button className="button" type="submit">Resgistar</button>
        </form>
      </div>
    </div>
  )
}