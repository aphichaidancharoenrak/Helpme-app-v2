import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView, Alert,} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { useNotes } from '../context/NotesContext';
import { NoteCard } from '../components/NoteCard';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { notes, deleteNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={handleSettings}
          style={styles.settingsButton}
        >
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = notes.filter(note => 
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        (note.tags && note.tags.some(tag => tag.toLowerCase().includes(query)))
      );
      setFilteredNotes(filtered);
    }
  }, [searchQuery, notes]);

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleAddNote = () => {
    navigation.navigate('AddNote');
  };

  const handleNotePress = (id: string) => {
    navigation.navigate('NoteDetail', { id });
  };

  const handleDeleteNote = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteNote(id),
        },
      ]
  );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Notes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddNote}
        >
          <MaterialIcons name="add" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={20}
          color={colors.text.hint}
          style={styles.searchIcon}
        />
      <TextInput
        style={styles.searchInput}
        placeholder="Search notes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
          placeholderTextColor={colors.text.hint}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <MaterialIcons name="close" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="note-add"
            size={48}
            color={colors.text.hint}
          />
          <Text style={styles.emptyText}>
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </Text>
          {!searchQuery && (
            <TouchableOpacity
              style={styles.addFirstNoteButton}
              onPress={handleAddNote}
            >
              <Text style={styles.addFirstNoteText}>Add your first note</Text>
            </TouchableOpacity>
          )}
    </View>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => handleNotePress(item.id)}
              onDelete={() => handleDeleteNote(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: colors.text.primary,
  },
  clearButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
  },
  addFirstNoteButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  addFirstNoteText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  settingsButton: {
    marginRight: 16,
    padding: 4,
  },
}); 