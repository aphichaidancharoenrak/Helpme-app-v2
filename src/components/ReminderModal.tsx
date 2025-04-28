import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Platform,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface ReminderModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (date: Date, message: string) => void;
  noteTitle: string;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  visible,
  onClose,
  onSave,
  noteTitle,
}) => {
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (message.trim()) {
      onSave(date, message.trim());
      setMessage('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Set Reminder</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.noteTitle} numberOfLines={1}>
            {noteTitle}
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.dateText}>
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Reminder message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity
            style={[styles.saveButton, !message.trim() && styles.disabledButton]}
            onPress={handleSave}
            disabled={!message.trim()}
          >
            <Text style={styles.saveButtonText}>Save Reminder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
  noteTitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.text.primary,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.text.primary,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.text.hint,
  },
  saveButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
}); 