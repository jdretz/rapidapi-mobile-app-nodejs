import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function HomeScreen() {
  let [notes, setNotes] = React.useState('')
  let [activeNote, setActiveNote] = React.useState('')

  const getNotes = React.useCallback(() => {
    fetch('http://192.168.0.110:3001/notes')
      .then((response) => response.json())
      .then((json) => {
        setNotes(json.notes)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  React.useEffect(() => {
    getNotes()
  }, [getNotes])

  const createTwoButtonAlert = (id) => {
    setActiveNote(id)

    Alert.alert(
      "Note Options",
      "What action would you like to perform?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteNote(),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

  const deleteNote = () => {
    fetch('http://192.168.0.110:3001/notes/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        noteId: activeNote
      })
    })
      .then(() => {
        // make a copy of current notes
        const newNotes = [...notes]

        // filter out note that is being deleted
        const filtered = newNotes.filter(({ _id }) => {
          return _id !== activeNote
        })

        // set filtered array as new state
        setNotes(filtered)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>


      <View style={styles.description}>
        <Text style={{ textAlign: "center" }}>Keep track of all your notes in an easily accessible application!</Text>
        <TouchableOpacity
          onPress={() => getNotes()}>
          <Ionicons
            name={'md-refresh'}
            size={30}
            style={{ margin: 3 }}
            color={'green'}
          />
        </TouchableOpacity>
      </View>


      <FlatList
        data={notes}
        renderItem={({ item }) =>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            key={item._id}
            onPress={() => createTwoButtonAlert(item._id)}>
            <View key={item._id} style={styles.task}>
              <Text>{item.note}</Text>
            </View>
          </TouchableHighlight>
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  task: {
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: 'yellow',
    paddingHorizontal: 6,
    paddingVertical: 15
  },
  container: {
    flex: 1,
    display: "flex"
  },
  description: {
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  }
});

