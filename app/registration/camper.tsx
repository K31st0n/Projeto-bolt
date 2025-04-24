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
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import MaskInput from 'react-native-mask-input';
import React from 'react';

const genderOptions = [
  { label: 'Masculino', value: 'masculino' },
  { label: 'Feminino', value: 'feminino' },
];

const relationshipOptions = [
  { label: 'Pai', value: 'pai' },
  { label: 'Mãe', value: 'mae' },
  { label: 'Tio(a)', value: 'tio' },
  { label: 'Avô/Avó', value: 'avo' },
  { label: 'Responsável Legal', value: 'responsavel' },
];

const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const DATE_MASK = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

const schema = z.object({
  fullName: z.string().min(1, 'Nome é obrigatório'),
  gender: z.string().min(1, 'Gênero é obrigatório'),
  birthDate: z.string().min(10, 'Data de nascimento é obrigatória'),
  cpf: z.string().min(14, 'CPF inválido'),
  relationship: z.string().min(1, 'Grau de parentesco é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export default function CamperRegistrationScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      gender: '',
      birthDate: '',
      cpf: '',
      relationship: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Here you would typically save the data to your backend
      console.log('Form data:', data);
      router.push('/registration/event');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dados do Acampante</Text>
        <Text style={styles.subtitle}>
          Preencha os dados do acampante
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
                placeholder="Digite o nome completo"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sexo</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <View style={[
                styles.pickerContainer,
                errors.gender && styles.inputError
              ]}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                >
                  <Picker.Item 
                    label="Selecione o sexo" 
                    value="" 
                    color="#9ca3af"
                  />
                  {genderOptions.map((option) => (
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
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender.message}</Text>
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
          <Text style={styles.label}>Grau de Parentesco</Text>
          <Controller
            control={control}
            name="relationship"
            render={({ field: { onChange, value } }) => (
              <View style={[
                styles.pickerContainer,
                errors.relationship && styles.inputError
              ]}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                >
                  <Picker.Item 
                    label="Selecione o grau de parentesco" 
                    value="" 
                    color="#9ca3af"
                  />
                  {relationshipOptions.map((option) => (
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
          {errors.relationship && (
            <Text style={styles.errorText}>{errors.relationship.message}</Text>
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
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Carregando...' : 'Continuar'}
            </Text>
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
  form: {
    padding: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
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