import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function ReviewScreen() {
  const registration = {
    parent: {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 98765-4321',
    },
    camper: {
      name: 'Maria Silva',
      age: 14,
      gender: 'Feminino',
    },
    event: {
      name: 'Teens 1 verão 2024',
      period: '10 a 14 de Janeiro',
      price: 1055.00,
    },
    products: [
      {
        name: 'Camiseta do Acampamento',
        size: 'M',
        quantity: 1,
        price: 85.00,
      },
      {
        name: 'Boné do Acampamento',
        quantity: 1,
        price: 60.00,
      },
    ],
  };

  const calculateTotal = () => {
    const eventPrice = registration.event.price;
    const productsTotal = registration.products.reduce(
      (total, product) => total + (product.price * product.quantity),
      0
    );
    return eventPrice + productsTotal;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Revisão da Inscrição</Text>
        <Text style={styles.subtitle}>
          Confira os dados da sua inscrição
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Responsável</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.value}>{registration.parent.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{registration.parent.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Telefone</Text>
              <Text style={styles.value}>{registration.parent.phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Acampante</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.value}>{registration.camper.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Idade</Text>
              <Text style={styles.value}>{registration.camper.age} anos</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Sexo</Text>
              <Text style={styles.value}>{registration.camper.gender}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evento</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.value}>{registration.event.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Período</Text>
              <Text style={styles.value}>{registration.event.period}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Valor</Text>
              <Text style={styles.value}>
                {registration.event.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produtos Adicionais</Text>
          <View style={styles.card}>
            {registration.products.map((product, index) => (
              <View key={index} style={styles.productRow}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  {product.size && (
                    <Text style={styles.productSize}>Tamanho: {product.size}</Text>
                  )}
                </View>
                <View style={styles.productPricing}>
                  <Text style={styles.productQuantity}>x{product.quantity}</Text>
                  <Text style={styles.productPrice}>
                    {(product.price * product.quantity).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Valor Total</Text>
          <Text style={styles.totalValue}>
            {calculateTotal().toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#0891b2" size={20} />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/registration/payment')}
          >
            <Text style={styles.buttonText}>Ir para Pagamento</Text>
            <ChevronRight color="#fff" size={20} />
          </TouchableOpacity>
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
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
  },
  value: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  productSize: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  productPricing: {
    alignItems: 'flex-end',
  },
  productQuantity: {
    fontSize: 12,
    color: '#6b7280',
  },
  productPrice: {
    fontSize: 14,
    color: '#0891b2',
    fontWeight: '600',
    marginTop: 2,
  },
  totalSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0891b2',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
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