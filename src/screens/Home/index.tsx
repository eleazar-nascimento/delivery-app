import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Alert
} from 'react-native';

import { styles} from './styles';
import { Participant } from '../../components/Participant';

const ACTUAL_DATE = new Date();

export function Home() {
  const [participants, setParticipants] = useState<Array<string>>([]);
  const [participantName, setParticipantName] = useState<string>('');

  const handleParticipantAdd = (name: string) => {
    if(participants.includes(name)) {
      return Alert.alert('Participante Existe', 'Já existe um participante na lista com esse nome.')
    }
    setParticipants((prevState) => [...prevState, name]);
  }
  
  const handleParticipantRemove = (name: string) => {
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          handleRemove(name);
          Alert.alert("Deletado!");
        }
      },
      {
        text: "Não",
        style: 'cancel'
      }
    ]);
  };

  const handleRemove = (name: string) => {
    participants.find((participant: string, key) => {
      if(participant === name) {
        participants.splice(key, 1);
      }
    });
  }
  
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Nome do Evento</Text>

    <Text style={styles.text}>
      {Intl.DateTimeFormat('pt-br', {
        dateStyle: 'full',
      }).format(ACTUAL_DATE)}
    </Text>

    <View style={styles.form}>
    <TextInput
      style={styles.input}
      placeholder='Nome do Participante'
      placeholderTextColor="#6B6B6B"
      onChangeText={setParticipantName}
    />

    <TouchableOpacity 
      style={styles.button} 
      onPress={
        () => 
        handleParticipantAdd(participantName.trim())
      }>
      <Text style={styles.buttonText}>
        +
      </Text>
    </TouchableOpacity>
    </View>

    <FlatList
      data={participants}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item}
      ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}> 
          Ninguém chegou no evento ainda? {"\n"} Adicione participantes a sua lista de presença.
        </Text>
      )}
      renderItem={({ item }) => (
        <Participant 
        key={item}
        name={item} 
        onRemove={() => handleParticipantRemove(item)} 
        />
      )}
      
    />
  </View>
  );
}
