import React from 'react';
import { Alert } from 'react-native';
import { useNotes } from '../../context/NotesContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { NoteForm } from '../components/NoteForm';

type AddNoteScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddNote'>;
};

export const AddNoteScreen: React.FC<AddNoteScreenProps> = ({ navigation }) => {
  const { addNote } = useNotes();

  const handleSubmit = (data: { title: string; content: string; category: string }) => {
    if (!data.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    if (!data.content.trim()) {
      Alert.alert('Error', 'Please enter content');
      return;
    }

    addNote(data);
    navigation.goBack();
  };

  return (
    <NoteForm
      onSubmit={handleSubmit}
      onCancel={() => navigation.goBack()}
      submitButtonText="Add Note"
    />
  );
}; 