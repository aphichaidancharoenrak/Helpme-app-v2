import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

export const AboutScreen = () => {
  const appVersion = '1.0.0';
  const appName = 'HelpMe App';

  const handlePrivacyPolicy = () => {
    // TODO: Add privacy policy URL
    Linking.openURL('https://example.com/privacy');
  };

  const handleTermsOfService = () => {
    // TODO: Add terms of service URL
    Linking.openURL('https://example.com/terms');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.appIcon}>
          <MaterialIcons name="note" size={48} color={colors.primary} />
        </View>
        <Text style={styles.appName}>{appName}</Text>
        <Text style={styles.version}>Version {appVersion}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>เกี่ยวกับแอป</Text>
        <Text style={styles.description}>
          แอปพลิเคชันสำหรับบันทึกโน๊ตและตั้งการแจ้งเตือน 
          ช่วยให้คุณจัดการงานและความจำได้อย่างมีประสิทธิภาพ
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ข้อมูลเพิ่มเติม</Text>
        <TouchableOpacity 
          style={styles.linkItem}
          onPress={handlePrivacyPolicy}
        >
          <Text style={styles.linkText}>นโยบายความเป็นส่วนตัว</Text>
          <MaterialIcons name="chevron-right" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.linkItem}
          onPress={handleTermsOfService}
        >
          <Text style={styles.linkText}>ข้อกำหนดการใช้งาน</Text>
          <MaterialIcons name="chevron-right" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.surface,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: colors.text.secondary,
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
  description: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  linkText: {
    fontSize: 16,
    color: colors.text.primary,
  },
}); 