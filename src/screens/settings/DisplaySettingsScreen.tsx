import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';

export const DisplaySettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [showImages, setShowImages] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>การแสดงผล</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>โหมดมืด</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>ตัวอักษรขนาดใหญ่</Text>
          <Switch
            value={largeText}
            onValueChange={setLargeText}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>แสดงรูปภาพ</Text>
          <Switch
            value={showImages}
            onValueChange={setShowImages}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
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
  settingLabel: {
    fontSize: 16,
    color: colors.text.primary,
  },
}); 