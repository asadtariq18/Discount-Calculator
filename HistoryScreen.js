import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';

export default function HistoryScreen({ route, navigation }) {
  const { list, setList } = route.params;

  const removeHandler = (key) => {
    setList((prevList) => {
      return prevList.filter((list) => list.key != key);
    });
    navigation.navigate('Home');
    alert('removed');
  };

  const clearHistory = () => {
    setList([]);
    navigation.navigate('Home');
    alert('History Cleared');
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => clearHistory()} title="Clear History" />
      ),
    });
  }, [navigation, list]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Text style={styles.title}> Original Price </Text>
        <Text style={styles.title}> Final Price </Text>
        <Text style={styles.title}> You Save </Text>
      </View>
      <FlatList
        style={{ flexDirection: 'row' }}
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeHandler(item.key)}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Text style={styles.text}> {item.orgPrice} </Text>
              <Text style={styles.text}> {item.finalPrice} </Text>
              <Text style={styles.text}> {item.savePrice} </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Text style={{ color: '#888', marginBottom: 10, marginLeft: 110 }}>
        {' '}
        Touch any item to remove{' '}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  title: {
    paddingHorizontal: 30,
    color: 'dodgerblue',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
  },
  text: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 20,
  },
});
