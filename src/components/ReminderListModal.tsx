import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Alert,} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import NotificationService from '../services/NotificationService';
import * as Notifications from 'expo-notifications';

interface ReminderListModalProps {
  visible: boolean;
  onClose: () => void;
  noteId: string;
}

interface Reminder {
  id: string;
  message: string;
  date: Date;
}

export const ReminderListModal: React.FC<ReminderListModalProps> = ({
  visible,
  onClose,
  noteId,
}) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    if (visible) {
      loadReminders();
    }
  }, [visible]);

  const loadReminders = async () => {
    try {
      const notifications = await NotificationService.getScheduledNotifications();
      const noteReminders = notifications
        .filter((notification: Notifications.NotificationRequest) => {
          const trigger = notification.trigger as Notifications.DateTriggerInput;
          return trigger.date && notification.content.data?.noteId === noteId;
        })
        .map((notification: Notifications.NotificationRequest) => ({
          id: notification.identifier,
          message: notification.content.body || '',
          date: new Date((notification.trigger as Notifications.DateTriggerInput).date),
        }));
      setReminders(noteReminders);
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const handleDeleteReminder = async (reminderId: string) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await NotificationService.cancelNotification(reminderId);
              setReminders(reminders.filter(r => r.id !== reminderId));
            } catch (error) {
              console.error('Error deleting reminder:', error);
              Alert.alert('Error', 'Failed to delete reminder');
            }
          },
        },
      ]
    );
  };

  const renderReminder = ({ item }: { item: Reminder }) => (
    <View style={styles.reminderItem}>
      <View style={styles.reminderInfo}>
        <Text style={styles.reminderMessage}>{item.message}</Text>
        <Text style={styles.reminderDate}>
          {item.date.toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteReminder(item.id)}
      >
        <MaterialIcons name="delete" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

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
            <Text style={styles.title}>Reminders</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {reminders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons
                name="notifications-off"
                size={48}
                color={colors.text.hint}
              />
              <Text style={styles.emptyText}>No reminders set</Text>
            </View>
          ) : (
            <FlatList
              data={reminders}
              renderItem={renderReminder}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
            />
          )}
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
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  listContent: {
    paddingBottom: 16,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderMessage: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  reminderDate: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
  },
}); 