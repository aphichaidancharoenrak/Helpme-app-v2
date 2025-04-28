import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Note } from '../types/note';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}

type NoteCardNavigationProp = StackNavigationProp<RootStackParamList, 'NoteDetail'>;

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress, onDelete }) => {
  const navigation = useNavigation<NoteCardNavigationProp>();

  const handlePress = () => {
    navigation.navigate('NoteDetail', { id: note.id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {note.image && (
        <Image source={{ uri: note.image }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.text} numberOfLines={2}>
          {note.content}
        </Text>
        {note.tags && note.tags.length > 0 && (
          <View style={styles.tags}>
            {note.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.footer}>
          <Text style={styles.date}>
            {new Date(note.updatedAt).toLocaleDateString()}
          </Text>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <MaterialIcons name="delete" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.card.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
  },
  date: {
    fontSize: 12,
    color: colors.text.hint,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 4,
  },
}); 