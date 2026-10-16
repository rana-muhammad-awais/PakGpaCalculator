import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { getDb } from '../database/db';
import { convertCGPAToPercentage } from '../utils/calculator';
import { Award, AlertTriangle, BookOpen } from 'lucide-react-native';

export default function DashboardScreen({ route, navigation }: any) {
  const { uni_id, uni_name, sgpa, totalCredits, courses } = route.params;
  const [percentage, setPercentage] = useState<string>('0.00');

  useEffect(() => {
    const db = getDb();
    const conv = db.getFirstSync<any>('SELECT * FROM conversions WHERE uni_id = ?', [uni_id]);
    
    let m = 25;
    let c = 0;
    
    if (conv) {
      m = conv.m;
      c = conv.c;
    }

    const calcPercentage = convertCGPAToPercentage(parseFloat(sgpa), m, c);
    setPercentage(calcPercentage.toFixed(2));
  }, [uni_id, sgpa]);

  const numSgpa = parseFloat(sgpa);
  const isProbation = numSgpa < 2.0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Main Result Card */}
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Semester GPA</Text>
          <Text style={styles.gpaText}>{sgpa}</Text>
          <Text style={styles.uniText}>{uni_name}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Percentage</Text>
              <Text style={styles.statValue}>{percentage}%</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Credits</Text>
              <Text style={styles.statValue}>{totalCredits}</Text>
            </View>
          </View>
        </View>

        {/* Probation Alert */}
        {isProbation && (
          <View style={styles.alertCard}>
            <AlertTriangle color="#ff4444" size={24} />
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>Academic Probation Risk</Text>
              <Text style={styles.alertDesc}>Your SGPA is below 2.0. Please check your institution's specific probation policies.</Text>
            </View>
          </View>
        )}

        {/* Course Breakdown */}
        <Text style={styles.sectionTitle}>Course Breakdown</Text>
        {courses.map((c: any, i: number) => (
          <View key={i} style={styles.courseItem}>
            <View style={styles.courseIcon}>
              <BookOpen color="#6366f1" size={20} />
            </View>
            <View style={styles.courseDetails}>
              <Text style={styles.courseName}>{c.name || \`Course \${i+1}\`}</Text>
              <Text style={styles.courseMeta}>{c.credits} Credits • {c.marks}%</Text>
            </View>
            <View style={styles.courseGradeBox}>
              <Text style={styles.courseGrade}>{c.grade}</Text>
              <Text style={styles.courseGpa}>{c.gpa.toFixed(2)}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.actionButtonText}>Calculate Another Semester</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultCard: {
    backgroundColor: '#6366f1',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  resultTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 5,
  },
  gpaText: {
    color: '#ffffff',
    fontSize: 64,
    fontWeight: '900',
    marginBottom: 5,
  },
  uniText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 25,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    padding: 15,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  alertCard: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  alertTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertDesc: {
    color: '#ffaaaa',
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  courseItem: {
    backgroundColor: '#1c1c2e',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  courseIcon: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    padding: 12,
    borderRadius: 12,
  },
  courseDetails: {
    flex: 1,
    marginLeft: 15,
  },
  courseName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  courseMeta: {
    color: '#a0a0b0',
    fontSize: 13,
  },
  courseGradeBox: {
    alignItems: 'flex-end',
  },
  courseGrade: {
    color: '#4ade80',
    fontSize: 20,
    fontWeight: '900',
  },
  courseGpa: {
    color: '#a0a0b0',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#2d2d44',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
