import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

export const BackupSettingsScreen = () => {
  const [lastBackup, setLastBackup] = useState<string | null>(null);

  const handleBackup = () => {
    // TODO: Implement backup functionality
    setLastBackup(new Date().toLocaleString());
  };

  const handleRestore = () => {
    // TODO: Implement restore functionality
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>การสำรองข้อมูล</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>สำรองข้อมูลล่าสุด</Text>
            <Text style={styles.settingValue}>
              {lastBackup || 'ยังไม่มีการสำรองข้อมูล'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleBackup}
          >
            <MaterialIcons name="backup" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>กู้คืนข้อมูล</Text>
            <Text style={styles.settingValue}>
              กู้คืนข้อมูลจากการสำรองล่าสุด
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleRestore}
          >
            <MaterialIcons name="restore" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    backgroundColor: colors.surface,
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text.primary,
  },
  settingValue: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  actionButton: {
    padding: 8,
    backgroundColor: colors.primary + '10',
    borderRadius: 8,
  },
}); 