import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNotes } from '../../context/NotesContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { NoteForm } from '../components/NoteForm';

type EditNoteScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditNote'>;
  route: { params: { id: string } };
};

export const EditNoteScreen: React.FC<EditNoteScreenProps> = ({ navigation, route }) => {
  const { getNote, updateNote } = useNotes();
  const note = getNote(route.params.id);

  const handleSubmit = (data: { title: string; content: string; category: string }) => {
    if (!data.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    if (!data.content.trim()) {
      Alert.alert('Error', 'Please enter content');
      return;
    }

    updateNote(route.params.id, data);
    navigation.goBack();
  };

  if (!note) {
    return null;
  }

  return (
    <NoteForm
      initialTitle={note.title}
      initialContent={note.content}
      initialCategory={note.category}
      onSubmit={handleSubmit}
      onCancel={() => navigation.goBack()}
      submitButtonText="Update Note"
    />
  );
}; 