import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { getRegistrations } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';

export default function HomeScreen() {
  const { session } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      loadRegistrations();
    }
  }, [session]);

  const loadRegistrations = async () => {
    try {
      const data = await getRegistrations(session!.user.id);
      setRegistrations(data);
    } catch (error) {
      console.error('Error loading registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Acampamento 2024</Text>
        <Text style={styles.subtitle}>Bem-vindo ao nosso app!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nova Inscrição</Text>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/registration')}
        >
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardTitle}>Iniciar Inscrição</Text>
              <Text style={styles.cardDescription}>
                Faça sua inscrição para o próximo acampamento
              </Text>
            </View>
            <ChevronRight size={24} color="#0891b2" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minhas Inscrições</Text>
        {loading ? (
          <View style={styles.card}>
            <Text style={styles.loadingText}>Carregando inscrições...</Text>
          </View>
        ) : registrations.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.emptyText}>
              Você ainda não possui inscrições ativas
            </Text>
          </View>
        ) : (
          registrations.map((registration: any) => (
            <View key={registration.id} style={styles.registrationCard}>
              <View>
                <Text style={styles.registrationTitle}>
                  {registration.registration_details[0].camper_name}
                </Text>
                <Text style={styles.registrationStatus}>
                  Status: {registration.status}
                </Text>
              </View>
              <ChevronRight size={24} color="#6b7280" />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#0891b2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  loadingText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  registrationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  registrationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  registrationStatus: {
    fontSize: 14,
    color: '#6b7280',
  },
});