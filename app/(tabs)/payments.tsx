import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react-native';
import React from 'react';

export default function PaymentsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pagamentos</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parcelas</Text>
        
        <View style={styles.paymentCard}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Parcela 1/3</Text>
            <Text style={styles.paymentDate}>Vencimento: 10/02/2024</Text>
            <Text style={styles.paymentValue}>R$ 300,00</Text>
          </View>
          <View style={styles.statusPaid}>
            <CheckCircle2 size={24} color="#059669" />
            <Text style={styles.statusTextPaid}>Pago</Text>
          </View>
        </View>

        <View style={styles.paymentCard}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Parcela 2/3</Text>
            <Text style={styles.paymentDate}>Vencimento: 10/03/2024</Text>
            <Text style={styles.paymentValue}>R$ 300,00</Text>
          </View>
          <View style={styles.statusPending}>
            <XCircle size={24} color="#dc2626" />
            <Text style={styles.statusTextPending}>Pendente</Text>
          </View>
        </View>

        <View style={styles.paymentCard}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Parcela 3/3</Text>
            <Text style={styles.paymentDate}>Vencimento: 10/04/2024</Text>
            <Text style={styles.paymentValue}>R$ 300,00</Text>
          </View>
          <View style={styles.statusPending}>
            <XCircle size={24} color="#dc2626" />
            <Text style={styles.statusTextPending}>Pendente</Text>
          </View>
        </View>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Resumo</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Valor Total</Text>
          <Text style={styles.summaryValue}>R$ 900,00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Pago</Text>
          <Text style={styles.summaryValue}>R$ 300,00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Restante</Text>
          <Text style={styles.summaryValue}>R$ 600,00</Text>
        </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  paymentDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0891b2',
    marginTop: 4,
  },
  statusPaid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    padding: 8,
    borderRadius: 8,
  },
  statusPending: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 8,
  },
  statusTextPaid: {
    marginLeft: 4,
    color: '#059669',
    fontWeight: '500',
  },
  statusTextPending: {
    marginLeft: 4,
    color: '#dc2626',
    fontWeight: '500',
  },
  summary: {
    margin: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
});