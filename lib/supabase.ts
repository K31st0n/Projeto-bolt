import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function createRegistration(data: {
  userId: string;
  eventId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  camperName: string;
  camperBirthDate: string;
  camperGender: string;
  products?: Array<{
    id: number;
    quantity: number;
    size?: string;
  }>;
}) {
  // Create registration
  const { data: registration, error: registrationError } = await supabase
    .from('registrations')
    .insert([{
      user_id: data.userId,
      event_id: data.eventId,
    }])
    .select()
    .single();

  if (registrationError) throw registrationError;

  // Create registration details
  const { error: detailsError } = await supabase
    .from('registration_details')
    .insert([{
      registration_id: registration.id,
      parent_name: data.parentName,
      parent_email: data.parentEmail,
      parent_phone: data.parentPhone,
      camper_name: data.camperName,
      camper_birth_date: data.camperBirthDate,
      camper_gender: data.camperGender,
    }]);

  if (detailsError) throw detailsError;

  // If there are products, create registration products
  if (data.products && data.products.length > 0) {
    const { error: productsError } = await supabase
      .from('registration_products')
      .insert(
        data.products.map(product => ({
          registration_id: registration.id,
          product_id: product.id,
          quantity: product.quantity,
          size: product.size,
        }))
      );

    if (productsError) throw productsError;
  }

  return registration;
}

export async function getRegistrations(userId: string) {
  const { data, error } = await supabase
    .from('registrations')
    .select(`
      *,
      registration_details (*),
      registration_products (*)
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}