import { Stack } from 'expo-router';
import React from 'react';

export default function RegistrationLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0891b2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Dados do Responsável',
        }}
      />
      <Stack.Screen
        name="camper"
        options={{
          title: 'Dados do Acampante',
        }}
      />
      <Stack.Screen
        name="event"
        options={{
          title: 'Escolha do Evento',
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          title: 'Produtos Adicionais',
        }}
      />
      <Stack.Screen
        name="review"
        options={{
          title: 'Revisão da Inscrição',
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: 'Pagamento',
        }}
      />
    </Stack>
  );
}