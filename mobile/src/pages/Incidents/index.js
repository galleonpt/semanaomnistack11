import React, {useEffect, useState} from "react"
import {Feather} from "@expo/vector-icons"
import {View, Image, Text, TouchableOpacity , FlatList} from "react-native"
import {useNavigation} from "@react-navigation/native"
import api from "../../services/api"
import logoImg from "../../assets/logo.png"
import styles from "./styles"

export default function Incidents(){
  const navigation=useNavigation()
  const [incidents, setIncidents]=useState([])//passamos como array pk o response.data vai retornar um array entao deve-se manter o mesmo tipo de dados
  const [total, setTotal]=useState(0)//comeca a 0
  
  const [page, setPage]=useState(1)//para fazer paginacao infinita, comeca na pagina1
  
  const [loading, setLoading]=useState(false)//armazenar uma informacao qnd estamos a buscar dados novos para evitar que esses dados seja procurados novamente
  
  function navigatToDetail(incident){
    navigation.navigate("Detail", {incident})//envia para a rota do Detail e envia tambem os dados do incident
  }
  
  async function loadIncidents(){
    //se o user ja a tela ja tiver a carregar nao da para carregar outra ao msm tempo
    if(loading){
      return;
    }

    //caso ja tenha carregado td nao deixa fazer mais requisicoes
    if(total>0 &&incidents.length===total)
      return;

    setLoading(true)//esta carregando
    const response=await api.get("incidents", {
      params:{page}//passar a pagina por parametro para a api saber em qual e que estamos
    })

    //pega nos incidents que vem da resposta e anexa aos que ja existiam em vez de os substituir
    setIncidents([...incidents,...response.data])
    setTotal(response.headers["x-total-count"])
    setPage(page+1)//qnd faz a requisicao avança de pagina
    setLoading(false)//acabou de carregar
  }

  useEffect(()=>{
    loadIncidents()
  },[])


  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
    
    {/**
     * onEndReachedThreshold -> se o user estiver a menos de 20% do fim sutomaticamente ja carrega a proxima pagina
     */}
    <FlatList
      data={incidents}
      style={styles.incidentsList}
      keyExtractor= {incident=>String(incidents.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={loadIncidents}
      onEndReachedThreshold={0.2}
      renderItem={({item:incident})=>(//o item passa a ter os dados do incident
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>Caso:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Valor:</Text>
          <Text style={styles.incidentValue}>{Intl
            .NumberFormat('pt', {
              style:"currency", 
              currency:"EUR"})
            .format(incident.value)}</Text>
          
          {/**
           * criar um botao. criamos um elemento "tocavel", que diminui a opcacidade
           * onPress é obrigatorio. temos que dizer o que e que ele vai fazer qnd foi carregado
           */}
          <TouchableOpacity style={styles.detailsButton}    onPress={()=>navigatToDetail(incident)}>
            <Text style={styles.detailsButtonText}> Ver mais detalhes. </Text>
            <Feather name="arrow-right" size={16} color="#e02041"/>
          </TouchableOpacity>
        </View>
      )}
    />
    </View>
  )
}