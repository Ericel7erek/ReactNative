import React, { useState } from 'react';
import { SafeAreaView, StatusBar, TextInput, Text, Pressable, View, FlatList, Alert } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {Box} from "./styles"

const items = [
  {
    id: 1,
    name: 'Document 1',
    type: 'pdf',
    size: '2.5 MB',
    dateModified: '2024-05-13',
    path: 'path/to/document1.pdf'
  },
  {
    id: 2,
    name: 'Image 1',
    type: 'jpg',
    size: '1.1 MB',
    dateModified: '2024-05-12',
    path: 'path/to/image1.jpg'
  },
  {
    id: 3,
    name: 'Presentation',
    type: 'pptx',
    size: '5.3 MB',
    dateModified: '2024-05-11',
    path: 'path/to/presentation.pptx'
  },
];

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [itemsList, setItemsList] = useState(items);
  const [selected, setSelected] = useState()

  const handleDeleteItem = (ItemName:any,itemId:any) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete this "${ItemName}"? `,
      [
        {
          text: 'Cancel',
          style: "cancel"
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedList = itemsList.filter(item => item.id !== itemId);
            setItemsList(updatedList);
          },
          style: "destructive"
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddItem = () => {
    // Add your logic to add items here
    // For example:
    const newItem = { id: itemsList.length + 1, name: input};
    setItemsList([...itemsList, newItem]);
  };

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <Text>Add Item:</Text>
      <TextInput value={input} onChangeText={setInput} style={{ backgroundColor: 'red' }} />
      <Pressable onPress={handleAddItem} style={{ backgroundColor: 'grey' }}>
        <Text>Add</Text>
      </Pressable>
      <FlatList
        data={itemsList}
        renderItem={({ item }) => (
          <View>
            
          <Pressable onPress={() => {setSelected(item.name);setOpen(!isOpen)}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Box style={{color: "white"}}>{item.name}</Box>
              <Pressable onPress={() => handleDeleteItem(item.name,item.id)}>
                <Text style={{ marginLeft: 10, color: 'red' }}>Delete</Text>
              </Pressable>
            </View>
          </Pressable>
                <View>
        <ReactNativeModal isVisible={isOpen} >
          <View style={{ flex: 1, marginTop: '50%' }}>
            <Pressable onPress={() => setOpen(!isOpen)}>
              <Text style={{ color: 'white', textAlign: 'center' }}>X</Text>
            </Pressable>
            <Text style={{ color: 'white' }}>{selected}</Text>
          </View>
        </ReactNativeModal>
      </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

    </SafeAreaView>
  );
}
