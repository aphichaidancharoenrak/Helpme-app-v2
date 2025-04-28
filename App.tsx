import React from 'react';
import { NotesProvider } from './src/context/NotesContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NotesProvider>
      <AppNavigator />
    </NotesProvider>
  );
}
