import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, TouchableOpacity,} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface SearchBarProps {
  onSearch: (text: string) => void;
  onSort: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSort }) => {
  const [searchText, setSearchText] = useState('');
  const scaleAnim = new Animated.Value(1);

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={colors.text.hint} />
        <TextInput
          style={styles.input}
          placeholder="Search notes..."
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor={colors.text.hint}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <MaterialIcons name="close" size={24} color={colors.text.hint} />
          </TouchableOpacity>
        )}
      </View>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={onSort}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <MaterialIcons name="sort" size={24} color={colors.primary} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: colors.card.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text.primary,
  },
  sortButton: {
    backgroundColor: colors.surface,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.card.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
}); 