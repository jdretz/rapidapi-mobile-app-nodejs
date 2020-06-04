import * as React from 'react';
import { StyleSheet, TouchableHighlight, Modal, Text, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function LinksScreen() {
  const [text, onChangeText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const addNote = () => {
    fetch('http://192.168.0.110:3001/notes/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        note: text
      })
    })
    .then(() => {
      onChangeText('');
      setModalVisible(true)
    })
  }

  return (
    <ScrollView style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Success!</Text>
            <Ionicons
              name={'md-checkmark-circle'}
              size={50}
              style={{ marginBottom: -3 }}
              color={'green'}
            />
            <TouchableHighlight
              style={{ ...styles.openButton, borderWidth: 1, borderStyle: "solid", borderColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Add Another Note</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={text}
          multiline
          numberOfLines={10}
          placeholder={'Learn typescript..'}
        />
        <View style={styles.button}>
          <Button
              onPress={() => {
                addNote();
              }}
              title="Add"
              color="white"
            />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 20,
    padding: 10
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: 'blue',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderColor: "#F194FF",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "#2196F3",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 40
  }
});