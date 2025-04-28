import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated,} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export type SortOption = 'date' | 'title' | 'tags' | 'none';
export type SortOrder = 'asc' | 'desc';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: SortOption, order: SortOrder) => void;
  currentOption: SortOption;
  currentOrder: SortOrder;
}

export const SortModal: React.FC<SortModalProps> = ({
  visible,
  onClose,
  onSelect,
  currentOption,
  currentOrder,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const renderSortOption = (option: SortOption, label: string) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => onSelect(option, currentOrder)}
    >
      <Text style={[
        styles.optionText,
        currentOption === option && styles.selectedOption
      ]}>
        {label}
      </Text>
      {currentOption === option && (
        <MaterialIcons
          name={currentOrder === 'asc' ? 'arrow-upward' : 'arrow-downward'}
          size={20}
          color={colors.primary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Sort By</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
          
          {renderSortOption('date', 'Date')}
          {renderSortOption('title', 'Title')}
          {renderSortOption('tags', 'Tags')}
          {renderSortOption('none', 'None')}
          
          <TouchableOpacity
            style={styles.toggleOrder}
            onPress={() => onSelect(currentOption, currentOrder === 'asc' ? 'desc' : 'asc')}
          >
            <Text style={styles.toggleOrderText}>
              {currentOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Text>
            <MaterialIcons
              name={currentOrder === 'asc' ? 'arrow-upward' : 'arrow-downward'}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '80%',
    elevation: 8,
    shadowColor: colors.card.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  selectedOption: {
    color: colors.primary,
    fontWeight: '600',
  },
  toggleOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
  },
  toggleOrderText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '600',
  },
}); 