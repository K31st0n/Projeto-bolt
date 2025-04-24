import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import MaskInput from 'react-native-mask-input';
import React from 'react';

const maritalStatusOptions = [
  { label: 'Solteiro(a)', value: 'solteiro' },
  { label: 'Casado(a)', value: 'casado' },
  { label: 'Separado(a)', value: 'separado' },
  { label: 'Divorciado(a)', value: 'divorciado' },
  { label: 'Viúvo(a)', value: 'viuvo' },
];

const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const DATE_MASK = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

const schema = z.object({
  fullName: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.string().min(10, 'Data de nascimento é obrigatória'),
  cpf: z.string().min(14, 'CPF inválido'),
  maritalStatus: z.string().min(1, 'Estado civil é obrigatório'),
  profession: z.string().min(1, 'Profissão é obrigatória'),
  address: z.object({
    country: z.string().min(1, 'País é obrigatório'),
    zipCode: z.string().min(8, 'CEP inválido'),
    street: z.string().min(1, 'Endereço é obrigatório'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório'),
    reference: z.string().optional(),
  }),
  email: z.string().email('Email inválido'),
  church: z.string().min(1, 'Igreja é obrigatória'),
  phone1: z.string().min(10, 'Telefone inválido'),
  phone2: z.string().min(10, 'Telefone inválido'),
});

type FormData = z.infer<typeof schema>;

export default function ParentRegistrationScreen() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      birthDate: '',
      cpf: '',
      maritalStatus: '',
      profession: '',
      address: {
        country: 'Brasil',
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        reference: '',
      },
      email: '',
      church: '',
      phone1: '',
      phone2: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const searchCEP = async (cep: string) => {
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setValue('address.street', data.logradouro);
        setValue('address.neighborhood', data.bairro);
        setValue('address.city', data.localidade);
        setValue('address.state', data.uf);
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Here you would typically save the data to your backend
      console.log('Form data:', data);
      router.push('/registration/camper');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dados do Responsável</Text>
        <Text style={styles.subtitle}>
          Preencha os dados do responsável pelo acampante
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.fullName && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, value } }) => (
              <MaskInput
                style={[styles.input, errors.birthDate && styles.inputError]}
                value={value}
                onChangeText={onChange}
                mask={DATE_MASK}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            )}
          />
          {errors.birthDate && (
            <Text style={styles.errorText}>{errors.birthDate.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <MaskInput
                style={[styles.input, errors.cpf && styles.inputError]}
                value={value}
                onChangeText={onChange}
                mask={CPF_MASK}
                placeholder="000.000.000-00"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
              />
            )}
          />
          {errors.cpf && (
            <Text style={styles.errorText}>{errors.cpf.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Estado Civil</Text>
          <Controller
            control={control}
            name="maritalStatus"
            render={({ field: { onChange, value } }) => (
              <View style={[
                styles.pickerContainer,
                errors.maritalStatus && styles.inputError
              ]}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                >
                  <Picker.Item 
                    label="Selecione seu estado civil" 
                    value="" 
                    color="#9ca3af"
                  />
                  {maritalStatusOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
            )}
          />
          {errors.maritalStatus && (
            <Text style={styles.errorText}>{errors.maritalStatus.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Profissão</Text>
          <Controller
            control={control}
            name="profession"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.profession && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="Digite sua profissão"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.profession && (
            <Text style={styles.errorText}>{errors.profession.message}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CEP</Text>
            <Controller
              control={control}
              name="address.zipCode"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.address?.zipCode && styles.inputError]}
                  onChangeText={(text) => {
                    onChange(text);
                    if (text.length === 8) {
                      searchCEP(text);
                    }
                  }}
                  value={value}
                  placeholder="00000-000"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.address?.zipCode && (
              <Text style={styles.errorText}>{errors.address.zipCode.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Endereço</Text>
            <Controller
              control={control}
              name="address.street"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.address?.street && styles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu endereço"
                  placeholderTextColor="#9ca3af"
                />
              )}
            />
            {errors.address?.street && (
              <Text style={styles.errorText}>{errors.address.street.message}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Número</Text>
              <Controller
                control={control}
                name="address.number"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.address?.number && styles.inputError]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Nº"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.address?.number && (
                <Text style={styles.errorText}>{errors.address.number.message}</Text>
              )}
            </View>

            <View style={[styles.inputGroup, { flex: 2 }]}>
              <Text style={styles.label}>Complemento</Text>
              <Controller
                control={control}
                name="address.complement"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Apto, Bloco, etc."
                    placeholderTextColor="#9ca3af"
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bairro</Text>
            <Controller
              control={control}
              name="address.neighborhood"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.address?.neighborhood && styles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu bairro"
                  placeholderTextColor="#9ca3af"
                />
              )}
            />
            {errors.address?.neighborhood && (
              <Text style={styles.errorText}>{errors.address.neighborhood.message}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
              <Text style={styles.label}>Cidade</Text>
              <Controller
                control={control}
                name="address.city"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.address?.city && styles.inputError]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Digite sua cidade"
                    placeholderTextColor="#9ca3af"
                  />
                )}
              />
              {errors.address?.city && (
                <Text style={styles.errorText}>{errors.address.city.message}</Text>
              )}
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Estado</Text>
              <Controller
                control={control}
                name="address.state"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.address?.state && styles.inputError]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="UF"
                    placeholderTextColor="#9ca3af"
                    maxLength={2}
                  />
                )}
              />
              {errors.address?.state && (
                <Text style={styles.errorText}>{errors.address.state.message}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ponto de Referência</Text>
            <Controller
              control={control}
              name="address.reference"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite um ponto de referência"
                  placeholderTextColor="#9ca3af"
                />
              )}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Igreja</Text>
          <Controller
            control={control}
            name="church"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.church && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="Digite o nome da sua igreja"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.church && (
            <Text style={styles.errorText}>{errors.church.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone 1</Text>
          <Controller
            control={control}
            name="phone1"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.phone1 && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone1 && (
            <Text style={styles.errorText}>{errors.phone1.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone 2</Text>
          <Controller
            control={control}
            name="phone2"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.phone2 && styles.inputError]}
                onChangeText={onChange}
                value={value}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone2 && (
            <Text style={styles.errorText}>{errors.phone2.message}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Carregando...' : 'Continuar'}
          </Text>
          <ChevronRight color="#fff" size={20} />
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
  form: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  picker: {
    ...Platform.select({
      ios: {
        height: 120,
      },
      android: {
        height: 50,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});