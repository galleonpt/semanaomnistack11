import React from "react"
import {View, Image, TouchableOpacity, Text, Linking} from "react-native"
import {Feather} from "@expo/vector-icons"
import {useNavigation, useRoute} from "@react-navigation/native"
//useRoute serve para pegar informacoes especificas da pagina atual
import * as MailComposer from "expo-mail-composer"
import styles from "./styles"

import logoImg from "../../assets/logo.png"

export default function Details(){
  const navigation=useNavigation()
  const route=useRoute()

  //pega no parametro incident(passado no navigate dos incidents) que a rota recebeu
  const incident=route.params.incident
  const message=`Olá ${incident.name} estou entrando em contacto sobre o caso ${incident.title} com o valor de ${Intl
    .NumberFormat('pt', {style:"currency", currency:"EUR"}).format(incident.value)}`

  function navigateBack(){
    navigation.goBack() //funcao do navigation
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject:`Heroi do caso: ${incident.title}`,//assunto
      recipients:[incident.email],//destinatarios
      body:message,//corpo do mail
    })
  }

  function sendCall(){
    Linking.openURL(`whatsapp://send?phone=${incident.number}&text=${message}`)
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041"/>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
          <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name} de {incident.city} ({incident.district})</Text>

          <Text style={styles.incidentProperty}>Caso:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Valor:</Text>
          <Text style={styles.incidentValue}>{Intl
            .NumberFormat('pt', {
              style:"currency", 
              currency:"EUR"})
            .format(incident.value)}</Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

          <Text style={styles.heroDescription}>Entre em contacto:</Text>
        
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendCall}>
              <Text style={styles.actionText}>Telemovel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        
        </View>
    </View>
  )
}