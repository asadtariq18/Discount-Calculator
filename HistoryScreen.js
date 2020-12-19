import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
  
} from 'react-native';
import Constants from 'expo-constants';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);



export default function HistoryScreen({route, navigation}) {

const { list, setList  } = route.params;

  const removeHandler = (key) => {
    setList((prevList) => {
      return prevList.filter(list => list.key != key)
    })
    navigation.navigate('Home')
    alert('removed')
    }


return(
   <SafeAreaView style={styles.container}>
   <FlatList
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress ={() => removeHandler(item.key)}>
            <View style={styles.item}>
              <Text style={styles.nameText}>Original Price: {item.orgPrice}</Text>
              <Text style={styles.text}>You Save: {item.savePrice}</Text>
              <Text style={styles.text}>Final Price: {item.finalPrice}</Text>
              </View>
              </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Text style={{color: '#888', marginBottom:10, marginLeft:110}}> Touch any item to remove </Text>
       </SafeAreaView>

)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
    header: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'column',
    margin: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'Black',
  },
  nameText: {
    color: 'dodgerblue',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10,
    marginLeft:10
  },
    text: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft:20
  },
});
