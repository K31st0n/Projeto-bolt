import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, CreditCard, Smartphone, Barcode } from 'lucide-react-native';
import MaskInput from 'react-native-mask-input';
import React from 'react';

const CARD_MASK = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
const EXPIRY_MASK = [/\d/, /\d/, '/', /\d/, /\d/];

type PaymentMethod = 'credit' | 'debit' | 'pix' | 'boleto';

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Here you would typically process the payment
      console.log('Processing payment...');
      // On success, navigate to success screen or home
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'credit':
      case 'debit':
        return (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número do Cartão</Text>
              <MaskInput
                style={styles.input}
                value={cardNumber}
                onChangeText={setCardNumber}
                mask={CARD_MASK}
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome no Cartão</Text>
              <TextInput
                style={styles.input}
                value={cardName}
                onChangeText={setCardName}
                placeholder="Nome como está no cartão"
                placeholderTextColor="#9ca3af"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.label}>Validade</Text>
                <MaskInput
                  style={styles.input}
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  mask={EXPIRY_MASK}
                  placeholder="MM/AA"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cardCvv}
                  onChangeText={setCardCvv}
                  placeholder="123"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>
          </View>
        );

      case 'pix':
        return (
          <View style={styles.pixContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=400' }}
              style={styles.qrCode}
            />
            <Text style={styles.pixInstructions}>
              Escaneie o QR Code acima com o seu aplicativo de pagamento ou copie o código PIX abaixo
            </Text>
            <TouchableOpacity style={styles.pixCodeButton}>
              <Text style={styles.pixCodeButtonText}>Copiar Código PIX</Text>
            </TouchableOpacity>
          </View>
        );

      case 'boleto':
        return (
          <View style={styles.boletoContainer}>
            <Text style={styles.boletoInstructions}>
              O boleto será gerado após a confirmação. Você receberá o boleto por email e poderá acessá-lo também em "Meus Pagamentos".
            </Text>
            <Text style={styles.boletoWarning}>
              Atenção: O boleto tem vencimento em 3 dias úteis. A inscrição só será confirmada após o pagamento.
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pagamento</Text>
        <Text style={styles.subtitle}>
          Escolha a forma de pagamento
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.methodsContainer}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              selectedMethod === 'credit' && styles.selectedMethod
            ]}
            onPress={() => setSelectedMethod('credit')}
          >
            <CreditCard 
              size={24} 
              color={selectedMethod === 'credit' ? '#0891b2' : '#6b7280'} 
            />
            <Text style={[
              styles.methodText,
              selectedMethod === 'credit' && styles.selectedMethodText
            ]}>Cartão de Crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              selectedMethod === 'debit' && styles.selectedMethod
            ]}
            onPress={() => setSelectedMethod('debit')}
          >
            <CreditCard 
              size={24} 
              color={selectedMethod === 'debit' ? '#0891b2' : '#6b7280'} 
            />
            <Text style={[
              styles.methodText,
              selectedMethod === 'debit' && styles.selectedMethodText
            ]}>Cartão de Débito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              selectedMethod === 'pix' && styles.selectedMethod
            ]}
            onPress={() => setSelectedMethod('pix')}
          >
            <Smartphone 
              size={24} 
              color={selectedMethod === 'pix' ? '#0891b2' : '#6b7280'} 
            />
            <Text style={[
              styles.methodText,
              selectedMethod === 'pix' && styles.selectedMethodText
            ]}>PIX</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              selectedMethod === 'boleto' && styles.selectedMethod
            ]}
            onPress={() => setSelectedMethod('boleto')}
          >
            <Barcode 
              size={24} 
              color={selectedMethod === 'boleto' ? '#0891b2' : '#6b7280'} 
            />
            <Text style={[
              styles.methodText,
              selectedMethod === 'boleto' && styles.selectedMethodText
            ]}>Boleto</Text>
          </TouchableOpacity>
        </View>

        {renderPaymentForm()}

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Resumo do Pagamento</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Valor Total</Text>
            <Text style={styles.summaryValue}>R$ 1.200,00</Text>
          </View>
          {selectedMethod === 'credit' && (
            <View style={styles.installments}>
              <Text style={styles.installmentsText}>
                Em até 12x de R$ 100,00 sem juros
              </Text>
            </View>
          )}
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
            onPress={handlePayment}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Processando...' : 'Finalizar Pagamento'}
            </Text>
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
  methodsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9fafb',
  },
  selectedMethod: {
    backgroundColor: '#f0f9ff',
    borderColor: '#0891b2',
    borderWidth: 1,
  },
  methodText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedMethodText: {
    color: '#0891b2',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
  },
  pixContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  pixInstructions: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  pixCodeButton: {
    backgroundColor: '#0891b2',
    padding: 12,
    borderRadius: 8,
  },
  pixCodeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  boletoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  boletoInstructions: {
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  boletoWarning: {
    color: '#dc2626',
    fontWeight: '500',
  },
  summary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0891b2',
  },
  installments: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f0f9ff',
    borderRadius: 4,
  },
  installmentsText: {
    color: '#0891b2',
    fontSize: 14,
    textAlign: 'center',
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
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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