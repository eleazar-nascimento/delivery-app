import React from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';

import { styles} from './styles';
import { Participant } from '../../components/Participant';

export function Home() {
  const participants = ['Eleazar', 'Erick', 'Ricardo', 'Will', 'Luiz', 'Cristian', 'Matheus', 'James Tiberius Quito', 'Margô', 'Alfredo'];

  const handleParticipantAdd = () => {
    console.log('adicionou')
  }
  
  const handleParticipantRemove = () => {
    console.log('removeu')
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Nome do Evento</Text>

    <Text style={styles.text}>
      Sexta, 4 de Novembro de 2022
    </Text>

    <View style={styles.form}>
    <TextInput
      style={styles.input}
      placeholder='Nome do Participante'
      placeholderTextColor="#6B6B6B"
      />

    <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
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
        onRemove={handleParticipantRemove} 
        />
      )}
      
    />

  </View>
  );
}
