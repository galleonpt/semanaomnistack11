import React, {useState,useEffect} from 'react';
import "./style.css"
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from "react-router-dom"
import {FiPower, FiTrash2} from "react-icons/fi"
import api  from "../../services/api"

export default function Profile(){
  const [incidents, setIncidents]=useState([])//começa como array vazio pk os daods vem da bd e tem que ser validos
  const ongId=localStorage.getItem("ongId")
  const ongName=localStorage.getItem("ongName")
  const history=useHistory()

//pegar tds os incidentes de uma org
  //1ª funcao-> qual a funcao que vai ser executada
  //2ª funcao-> quando e que ela vai ser executada. e um array de dependencias, sempre que a informacao dele mudar ele vai executar a funcao denovo
  //se o array ficar vazio ele so vai executar a funcao 1x no fluxo do componente
  useEffect(()=>{
    api.get("/profile",{
      headers:{//qual a org que ta logada, isso vai pelo header com nome Authorization
        Authorization:ongId
      }
    }).then(response=>{//pegar os dados da resposta que esta smp no estado(state)
      setIncidents(response.data)
    })
  },[ongId])//disparar uma funcao a qql momento
  //td a variavel que usamo dentro de um useEfect devemos de por no array das dependencias

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`, {
        headers:{//e preciso mandar o id da oing para verificar se foi ela que o criou
          Authorization:ongId
        }
      })
      //atualizar a lista de casos automaticamente
      //vai ao array de incidents que ja tem e faz um filtro
      //para cada incident quero manter os que o id é diferente do id removido
      setIncidents(incidents.filter(incident=> incident.id!=id))

    }catch(err){
      alert("Erro ao apagar caso, tente novamente.")
    }
  }

  //para fazer logout precisamos de limpar os dados que foram adicionados no localstora no login
   function handleLogOut() {
    localStorage.clear()
    history.push("/") //enviar para a rota raiz
  }


  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Seja bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="e02041"/>
        </button>
      </header>
    

      <h1>Casos cadastrados</h1>

      <ul>
        {//map para correr o array que e retornado da api e a cada elemento do array fazer a listagemm dos dados
        //no primeiro elemento temos que passar uma key que e para o react saber qual e o item a deletar, modificar etc. Tem que ser um identificador unico
          incidents.map(incident =>(//metemos parentises pk tou a por diretament codigo jsx. se fosse {} tinhamos que por return
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>
              
              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>
              
              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt', { style:"currency", currency:"EUR"}).format(incident.value)}</p>
              {/**
               * temos que passar como arrow function pk se nao o fizermos ele vai executar a funcao handle.. e vai devolver o valor de retorno
               * e isso acontece assim que os componentes sao apresentados em tela isto e smp que carregar a pagina apagando todos os registos
               */}
              <button onClick={()=>{handleDeleteIncident(incident.id)}} type="button">
                <FiTrash2 size={20} color="a8a8b3"/>
              </button>
            </li>))
        }
      </ul>
    </div>
  )
}