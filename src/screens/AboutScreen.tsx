import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

export const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About HelpMe App</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.text}>
            • Create and manage notes{'\n'}
            • Add images to notes{'\n'}
            • Set reminders for important notes{'\n'}
            • Organize notes with tags{'\n'}
            • Search and filter notes
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions or suggestions, please contact us at:{'\n'}
            support@helpmeapp.com
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.text}>
            Your data is stored locally on your device. We do not collect any personal information.
          </Text>
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
  },
}); 