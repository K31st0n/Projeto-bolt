import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MaskInput from 'react-native-mask-input';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';

const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const DATE_MASK = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  birthDate: z.string().min(10, 'Data de nascimento é obrigatória'),
  cpf: z.string().min(14, 'CPF inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      birthDate: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const [day, month, year] = data.birthDate.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      await signUp(data.email, data.password, {
        full_name: data.name,
        birth_date: formattedDate,
        cpf: data.cpf.replace(/\D/g, ''),
      });
      
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Register error:', error);
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        setError('email', {
          message: 'Este email já está em uso',
        });
      } else if (error.message.includes('cpf')) {
        setError('cpf', {
          message: 'Este CPF já está cadastrado',
        });
      } else {
        setError('root', {
          message: 'Erro ao criar conta. Tente novamente.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="words"
                  autoComplete="name"
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite seu email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
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
            <Text style={styles.label}>Senha</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  autoComplete="new-password"
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Confirme sua senha"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  autoComplete="new-password"
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
            )}
          </View>

          {errors.root && (
            <Text style={styles.errorText}>{errors.root.message}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  scrollContent: {
    flexGrow: 1,
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
  button: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});