import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { getDb } from '../database/db';

export default function HomeScreen({ navigation }: any) {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadInstitutions();
  }, []);

  const loadInstitutions = () => {
    const db = getDb();
    const result = db.getAllSync('SELECT * FROM institutions ORDER BY name ASC');
    setInstitutions(result);
  };

  const filteredInstitutions = institutions.filter(inst => 
    inst.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUniversity = (uni: any) => {
    navigation.navigate('CourseEntry', { uni_id: uni.id, uni_name: uni.name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Your University</Text>
        <Text style={styles.subtitle}>Find your institution to apply the correct grading rules</Text>
      </View>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a university..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredInstitutions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => handleSelectUniversity(item)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.uniName}>{item.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.sector}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a', // Deep dark theme
  },
  header: {
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0b0',
    lineHeight: 22,
  },
  searchInput: {
    backgroundColor: '#1c1c2e',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 16,
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#1c1c2e',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2d2d44',
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uniName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#3f51b5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
