import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AddNoteScreen } from '../screens/AddNoteScreen';
import { EditNoteScreen } from '../screens/EditNoteScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { NoteDetailScreen } from '../screens/NoteDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from '../types';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'My Notes',
          }}
        />
        <Stack.Screen 
          name="NoteDetail" 
          component={NoteDetailScreen}
          options={{
            title: 'Note Detail',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="AddNote" 
          component={AddNoteScreen}
          options={{
            title: 'Add Note',
          }}
        />
        <Stack.Screen 
          name="EditNote" 
          component={EditNoteScreen}
          options={{
            title: 'Edit Note',
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'About',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 