import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  DismissKeyboard,
} from 'react-native'
import HistoryScreen from './HistoryScreen'
import { color, set } from 'react-native-reanimated'

function HomeScreen({ navigation }) {
    const [list, setList]  = useState([
    {key: '1', orgPrice: 100, savePrice:25, finalPrice:75}])
  const [orgPriceInput, setOrgPriceInput] = useState(0)
  const [discountInput, setDiscountInput] = useState(0)
  var [finalPriceOutput, setFinalPriceOutput] = useState(0)
  var [savePriceOutput, setSavePriceOutput] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  const calculate = () => {
    Keyboard.dismiss()
    if (orgPriceInput == 0 || discountInput == 0) {
        alert('Enter Original Price and Discount')
    } else if(discountInput < 0 || discountInput > 100){
        setSavePriceOutput(0)
        setFinalPriceOutput(0)
        alert('Discount value be 0-100')
    } else {
        setIsAdded(false)
        setFinalPriceOutput(Math.ceil(orgPriceInput - (discountInput / 100) * orgPriceInput))
        setSavePriceOutput(
        Math.floor(orgPriceInput - (orgPriceInput - (discountInput / 100) * orgPriceInput)),
      )
    }
  }
  const addHandler = () => {
     if(isAdded){
      alert("Already Added")
     } else{
        if (orgPriceInput == 0 || discountInput == 0) {
        alert('Enter values first')
     } else if(savePriceOutput == 0 && finalPriceOutput == 0){
        alert("Nothing to Add")
     } else if (savePriceOutput =="" || finalPriceOutput == ""){
        alert('Nothing to Add')
     } else{
        alert("Price Added")
        setIsAdded(true)
        setList((prevList) => {
          return[
            {orgPrice: orgPriceInput, savePrice: savePriceOutput, finalPrice: finalPriceOutput, key:list.length+1},
            ...prevList
        ]
      })
    }
  }
}
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.headerText}>Discount Calculator</Text>
      <Text style={styles.Text1}>Original Price(Rs)</Text>

      <TextInput
        style={styles.TextInput}
        keyboardType="number-pad"
        placeholder="Enter number here"
        maxLength={10}
        onChangeText={input => setOrgPriceInput(input)}
      />
      <Text style={styles.Text1}>Discount(%)</Text>
      <TextInput
        style={styles.TextInput}
        keyboardType="number-pad"
        placeholder="Enter discount (%)"
        maxLength={3}
        onChangeText={(input) => setDiscountInput(input)}
      />
      <View style={{margin: 20, alignItems: "center", justifyContent:"center"}}>
      <Text style={styles.Text2}>
        Final Price: Rs. {finalPriceOutput}
        {'\n'}Save Price: Rs. {savePriceOutput}
      </Text>
      </View>
      <TouchableOpacity style={styles.bigButton} onPress={() => calculate()}>
        <Text style={styles.buttonText}> Calculate </Text>
      </TouchableOpacity>
          <TouchableOpacity
        style={styles.bigButton}
        onPress={() => addHandler()}
      >
        <Text style={styles.buttonText}> Add to List </Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History', {list, setList})}
      >
        <Text style={styles.buttonText}> History </Text>
      </TouchableOpacity>
  
    </ScrollView>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 38,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    fontWeight: 'bold',
    paddingTop:40,
    paddingBottom:30,
    color: '#E30425',
  },
  Text1: {
    fontSize: 20,
    padding: 10,
  },
  Text2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 5,
  },
  TextInput: {
    height: 40,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,

  },
  bigButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: 30,
    padding: 10,
    marginBottom:10
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  historyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 30,
    padding: 10,

  },
})

