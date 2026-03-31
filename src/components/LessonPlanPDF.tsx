import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 11, lineHeight: 1.5 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  sectionHeader: { fontSize: 13, fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: 6, marginTop: 16, marginBottom: 4 },
  activity: { marginBottom: 8, paddingLeft: 12 },
  duration: { fontSize: 10, color: '#666', marginBottom: 2 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 9, color: '#999', textAlign: 'center' }
});

// Added ": { plan: any }" so TypeScript knows what to expect
export function LessonPlanPDF({ plan }: { plan: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{plan.title}</Text>
        
        <View style={styles.sectionHeader}>
          <Text>Learning Objectives</Text>
        </View>
        {plan.objectives.map((obj: string, i: number) => (
          <Text key={i} style={styles.activity}>• {obj}</Text>
        ))}
        
        <View style={styles.sectionHeader}>
          <Text>Warm-Up ({plan.warmup.duration} min)</Text>
        </View>
        <Text style={styles.activity}>{plan.warmup.description}</Text>
        
        <View style={styles.sectionHeader}>
          <Text>Main Activities</Text>
        </View>
        {plan.mainContent.map((section: any, i: number) => (
          <View key={i} style={styles.activity}>
            <Text style={styles.duration}>{section.duration} minutes</Text>
            <Text style={{ fontWeight: 'bold' }}>{section.activity}</Text>
            <Text>{section.description}</Text>
          </View>
        ))}
        
        <Text style={styles.footer}>
          Generated with AI Lesson Maker • {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
}