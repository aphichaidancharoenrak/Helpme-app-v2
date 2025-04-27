import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotesProvider } from './context/NotesContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { AddNoteScreen } from './src/screens/AddNoteScreen';
import { EditNoteScreen } from './src/screens/EditNoteScreen';
import { TouchableOpacity, Text, AppRegistry } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  AddNote: undefined;
  EditNote: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'My Notes',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddNote')}
                  style={{ marginRight: 16 }}
                >
                  <Text style={{ color: '#007AFF', fontSize: 16 }}>Add</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen 
            name="AddNote" 
            component={AddNoteScreen}
            options={{ title: 'Add Note' }}
          />
          <Stack.Screen 
            name="EditNote" 
            component={EditNoteScreen}
            options={{ title: 'Edit Note' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}

AppRegistry.registerComponent('main', () => App);

export default App; 