import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNotes } from '../context/NotesContext';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';

type EditNoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditNote'>;

export const EditNoteScreen: React.FC = () => {
  const navigation = useNavigation<EditNoteScreenNavigationProp>();
  const route = useRoute();
  const { notes, updateNote } = useNotes();
  
  const { id } = route.params as { id: string };
  const note = notes.find(n => n.id === id);

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [image, setImage] = useState<string | undefined>(note?.image);
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (!note) {
      Alert.alert('Error', 'Note not found');
      navigation.goBack();
    }
  }, [note, navigation]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your photos to add images to notes.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (title.trim() && content.trim()) {
      await updateNote(id, {
        title: title.trim(),
        content: content.trim(),
        image,
        tags,
      });
      navigation.goBack();
    }
  };

  if (!note) return null;

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.text.hint}
      />

      <View style={styles.imageSection}>
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setImage(undefined)}
            >
              <MaterialIcons name="close" size={24} color={colors.error} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
            <MaterialIcons name="add-photo-alternate" size={40} color={colors.text.hint} />
            <Text style={styles.addImageText}>Add Image</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.contentInput}
        placeholder="Write your note here..."
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor={colors.text.hint}
      />

      <View style={styles.tagsContainer}>
        <View style={styles.tagInput}>
          <TextInput
            style={styles.tagInputField}
            placeholder="Add tags..."
            value={newTag}
            onChangeText={setNewTag}
            onSubmitEditing={addTag}
            placeholderTextColor={colors.text.hint}
          />
          <TouchableOpacity onPress={addTag} style={styles.addTagButton}>
            <MaterialIcons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.tagsList}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
              <TouchableOpacity onPress={() => removeTag(tag)}>
                <MaterialIcons name="close" size={16} color={colors.text.hint} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, (!title.trim() || !content.trim()) && styles.disabledButton]} 
        onPress={handleSave}
        disabled={!title.trim() || !content.trim()}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  imageSection: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 4,
  },
  addImageButton: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    marginTop: 8,
    color: colors.text.hint,
    fontSize: 16,
  },
  contentInput: {
    fontSize: 16,
    color: colors.text.primary,
    padding: 16,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  tagsContainer: {
    padding: 16,
  },
  tagInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagInputField: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.text.primary,
  },
  addTagButton: {
    marginLeft: 8,
    padding: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: colors.primary,
    marginRight: 4,
  },
  saveButton: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.border,
  },
  saveButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
}); 
