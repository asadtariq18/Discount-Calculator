import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  DismissKeyboard,
  FlatList,
} from 'react-native'
import { color, set } from 'react-native-reanimated'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [orgPrice, setOrgPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  var [finalPrice, setFinalPrice] = useState(0)
  var [savePrice, setSavePrice] = useState(0)

  const calculate = () => {
    Keyboard.dismiss()
    if (orgPrice == 0 || discount == 0) {
      if (orgPrice == 0 && discount != 0) {
        alert('Enter Original Price')
      } else if (orgPrice != 0 && discount == 0) {
        alert('Enter discount')
      } else {
        alert('Enter Original Price and Discount')
      }
    } else {
      setFinalPrice(Math.ceil(orgPrice - (discount / 100) * orgPrice))
      setSavePrice(
        Math.floor(orgPrice - (orgPrice - (discount / 100) * orgPrice)),
      )
    }
  }

  const add = () => {
    if (orgPrice == 0 || discount == 0) {
      alert('No recent price checked')
    } else {
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Discount Calculator</Text>
      <Text style={styles.Text1}>Original Price(Rs)</Text>

      <TextInput
        style={styles.TextInput}
        keyboardType="number-pad"
        placeholder="Enter number here"
        onChangeText={(val1) => setOrgPrice(val1)}
      />
      <Text style={styles.Text1}>Discount(%)</Text>
      <TextInput
        style={styles.TextInput}
        keyboardType="number-pad"
        placeholder="Enter discount (%)"
        onChangeText={(val2) => setDiscount(val2)}
      />
      <TouchableOpacity style={styles.bigButton} onPress={() => calculate()}>
        <Text style={styles.buttonText1}> Calculate </Text>
      </TouchableOpacity>
      <Text style={styles.Text2}>
        Final Price: Rs. {finalPrice}
        {'\n'}Save Price: Rs. {savePrice}
      </Text>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => setModalOpen(true)}
      >
        <Text style={styles.buttonText2}> Show History </Text>
      </TouchableOpacity>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.Text2}> Last Checked: </Text>
          <Text style={styles.modalText}>
            Original Price: Rs.{'\t'}
            {orgPrice}
            {'\n'}Final Price: Rs.{'\t'}
            {finalPrice}
            {'\n'}You Saved: Rs.:{'\t'}
            {savePrice}
          </Text>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalOpen(false)}
            >
              <Text style={styles.buttonText2}> Hide History </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 35,
  },
  headerText: {
    fontSize: 38,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 23,
    fontWeight: 'bold',
    color: '#E30425',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
    elevation: 10,
  },
  Text1: {
    fontSize: 20,
    padding: 10,
    alignSelf: 'flex-start',
    marginLeft: 35,
  },
  Text2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
    padding: 5,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
    elevation: 10,
  },
  TextInput: {
    height: 40,
    width: '80%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
    elevation: 5,
  },
  bigButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 20,
    padding: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 10,
  },
  buttonText1: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 0.5,
    elevation: 10,
  },
  buttonText2: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'darkblue',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
    elevation: 10,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  modalText: {
    fontSize: 20,
    padding: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  historyButton: {
    margin: 10,
    backgroundColor: 'dodgerblue',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 10,
  },
  modalButton: {
    margin: 10,
    backgroundColor: 'dodgerblue',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
