import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React from 'react';

const events = [
  {
    id: 1,
    name: 'Teens 1 verão 2026',
    period: '10 a 14 de Janeiro',
    ageRange: '12 a 16 anos',
    price: 1055.00,
    availableSpots: 30,
  },
  {
    id: 2,
    name: 'Teens 2 verão 2026',
    period: '17 a 21 de Janeiro',
    ageRange: '12 a 16 anos',
    price: 1055.00,
    availableSpots: 25,
  },
  {
    id: 3,
    name: 'Kids verão 2026',
    period: '24 a 28 de Janeiro',
    ageRange: '7 a 11 anos',
    price: 955.00,
    availableSpots: 40,
  },
];

export default function EventSelectionScreen() {
  const handleEventSelection = (eventId: number) => {
    // Here you would typically save the selected event
    console.log('Selected event:', eventId);
    router.push('/registration/products');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Escolha do Evento</Text>
        <Text style={styles.subtitle}>
          Selecione o evento que deseja participar
        </Text>
      </View>

      <View style={styles.content}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => handleEventSelection(event.id)}
          >
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventPeriod}>{event.period}</Text>
              <Text style={styles.eventAge}>{event.ageRange}</Text>
              <Text style={styles.eventPrice}>
                {event.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>
            </View>
            <View style={styles.spotsBadge}>
              <Text style={styles.spotsText}>
                {event.availableSpots} vagas restantes
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color="#0891b2" size={20} />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
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
  content: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  eventInfo: {
    marginBottom: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  eventPeriod: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  eventAge: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  eventPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0891b2',
  },
  spotsBadge: {
    backgroundColor: '#f0fdf4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  spotsText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 0,
  },
  backButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0891b2',
  },
  backButtonText: {
    color: '#0891b2',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});