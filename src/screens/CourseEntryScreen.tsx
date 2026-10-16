import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { getDb } from '../database/db';
import { calculateAbsoluteGPA, calculateContinuousGPA, calculateRelativeGPA } from '../utils/calculator';
import { Plus, Trash2 } from 'lucide-react-native';

export default function CourseEntryScreen({ route, navigation }: any) {
  const { uni_id, uni_name } = route.params;
  const [schemas, setSchemas] = useState<any[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<any>(null);
  const [brackets, setBrackets] = useState<any[]>([]);
  
  const [courses, setCourses] = useState<any[]>([
    { id: 1, name: 'Course 1', credits: '3', marks: '', mean: '', stdDev: '' }
  ]);

  useEffect(() => {
    const db = getDb();
    const uniSchemas = db.getAllSync('SELECT * FROM schemas WHERE uni_id = ?', [uni_id]);
    setSchemas(uniSchemas);
    if (uniSchemas.length > 0) {
      handleSchemaSelect(uniSchemas[0]); // Default to first schema
    }
  }, [uni_id]);

  const handleSchemaSelect = (schema: any) => {
    setSelectedSchema(schema);
    if (schema.is_absolute === 1) {
      const db = getDb();
      const bracks = db.getAllSync('SELECT * FROM absolute_brackets WHERE schema_id = ?', [schema.id]);
      setBrackets(bracks);
    }
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: \`Course \${courses.length + 1}\`, credits: '3', marks: '', mean: '', stdDev: '' }]);
  };

  const updateCourse = (id: number, field: string, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const calculate = () => {
    let totalCredits = 0;
    let totalQualityPoints = 0;

    const processedCourses = courses.map(c => {
      const credits = parseFloat(c.credits) || 0;
      const marks = parseFloat(c.marks) || 0;
      let result = { grade: 'F', gpa: 0 };

      if (selectedSchema.is_absolute === 1) {
        result = calculateAbsoluteGPA(marks, brackets);
      } else if (selectedSchema.is_continuous === 1) {
        result = calculateContinuousGPA(marks, uni_id);
      } else if (selectedSchema.is_relative === 1) {
        const mean = parseFloat(c.mean) || 0;
        const stdDev = parseFloat(c.stdDev) || 0;
        result = calculateRelativeGPA(marks, mean, stdDev);
      }

      totalCredits += credits;
      totalQualityPoints += (result.gpa * credits);

      return { ...c, ...result };
    });

    const sgpa = totalCredits > 0 ? (totalQualityPoints / totalCredits) : 0;
    
    navigation.navigate('Dashboard', {
      uni_id,
      uni_name,
      sgpa: sgpa.toFixed(2),
      totalCredits,
      courses: processedCourses
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.uniName}>{uni_name}</Text>
          <Text style={styles.subtitle}>Enter your course details below</Text>
        </View>

        {schemas.length > 1 && (
          <View style={styles.schemaSelector}>
            <Text style={styles.label}>Select Program / Grading Mode:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {schemas.map(s => (
                <TouchableOpacity 
                  key={s.id} 
                  style={[styles.schemaPill, selectedSchema?.id === s.id && styles.schemaPillActive]}
                  onPress={() => handleSchemaSelect(s)}
                >
                  <Text style={[styles.schemaPillText, selectedSchema?.id === s.id && styles.schemaPillTextActive]}>
                    {s.program}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {courses.map((course, index) => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>Course {index + 1}</Text>
              {courses.length > 1 && (
                <TouchableOpacity onPress={() => removeCourse(course.id)}>
                  <Trash2 color="#ff4444" size={20} />
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Credit Hours</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric" 
                  value={course.credits}
                  onChangeText={(val) => updateCourse(course.id, 'credits', val)}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Raw Marks (%)</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric" 
                  value={course.marks}
                  placeholder="e.g. 85"
                  placeholderTextColor="#555"
                  onChangeText={(val) => updateCourse(course.id, 'marks', val)}
                />
              </View>
            </View>

            {selectedSchema?.is_relative === 1 && (
              <View style={[styles.row, { marginTop: 10 }]}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Class Mean (μ)</Text>
                  <TextInput 
                    style={styles.input} 
                    keyboardType="numeric" 
                    value={course.mean}
                    onChangeText={(val) => updateCourse(course.id, 'mean', val)}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Std Dev (σ)</Text>
                  <TextInput 
                    style={styles.input} 
                    keyboardType="numeric" 
                    value={course.stdDev}
                    onChangeText={(val) => updateCourse(course.id, 'stdDev', val)}
                  />
                </View>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addCourse}>
          <Plus color="#4ade80" size={24} />
          <Text style={styles.addButtonText}>Add Another Course</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
          <Text style={styles.calculateButtonText}>Calculate SGPA</Text>
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
    paddingBottom: 50,
  },
  header: {
    marginBottom: 20,
  },
  uniName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0b0',
    marginTop: 5,
  },
  schemaSelector: {
    marginBottom: 20,
  },
  label: {
    color: '#a0a0b0',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  schemaPill: {
    backgroundColor: '#1c1c2e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  schemaPillActive: {
    backgroundColor: '#3f51b5',
    borderColor: '#5c6bc0',
  },
  schemaPillText: {
    color: '#a0a0b0',
    fontWeight: 'bold',
  },
  schemaPillTextActive: {
    color: '#fff',
  },
  courseCard: {
    backgroundColor: '#1c1c2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  courseTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 0.48,
  },
  input: {
    backgroundColor: '#0f0f1a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2d2d44',
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#4ade80',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  calculateButton: {
    backgroundColor: '#6366f1',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  calculateButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
