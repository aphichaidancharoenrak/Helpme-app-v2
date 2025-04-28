import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  View, 
  Text,
  Modal,
  Pressable
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  NotificationSettings: undefined;
  DisplaySettings: undefined;
  BackupSettings: undefined;
  About: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const AddButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const menuItems = [
    {
      title: 'ตั้งค่าการแจ้งเตือน',
      icon: 'notifications',
      onPress: () => {
        setModalVisible(false);
        navigation.navigate('NotificationSettings');
      }
    },
    {
      title: 'ตั้งค่าการแสดงผล',
      icon: 'palette',
      onPress: () => {
        setModalVisible(false);
        navigation.navigate('DisplaySettings');
      }
    },
    {
      title: 'ตั้งค่าการสำรองข้อมูล',
      icon: 'backup',
      onPress: () => {
        setModalVisible(false);
        navigation.navigate('BackupSettings');
      }
    },
    {
      title: 'เกี่ยวกับแอป',
      icon: 'info',
      onPress: () => {
        setModalVisible(false);
        navigation.navigate('About');
      }
    }
  ];

  return (
    <>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="settings" size={24} color={colors.surface} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <MaterialIcons 
                  name={item.icon as any} 
                  size={24} 
                  color={colors.text.primary} 
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.card.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: colors.text.primary,
  },
}); 