import { useState } from 'react';
import { createRegistration } from '@/lib/supabase';
import { useAuth } from './useAuth';

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();

  const submit = async (data: {
    eventId: string;
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    camperName: string;
    camperBirthDate: string;
    camperGender: string;
  }) => {
    if (!session?.user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    try {
      await createRegistration({
        userId: session.user.id,
        ...data,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
  };
}