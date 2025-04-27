import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Note } from '../../types';

type NoteCardProps = {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress, onDelete }) => {
  return (
    <TouchableOpacity style={styles.noteCard} onPress={onPress}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.noteContent}>{note.content}</Text>
      <View style={styles.noteFooter}>
        <Text style={styles.noteCategory}>{note.category}</Text>
        <Text style={styles.noteDate}>{note.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteCategory: {
    fontSize: 14,
    color: '#666',
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
  },
}); 