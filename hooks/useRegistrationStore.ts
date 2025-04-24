import { create } from 'zustand';

type RegistrationData = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  camperName: string;
  camperBirthDate: string;
  camperGender: string;
  eventId: string;
  products: Array<{
    id: number;
    quantity: number;
    size?: string;
  }>;
};

type RegistrationStore = {
  data: Partial<RegistrationData>;
  setData: (data: Partial<RegistrationData>) => void;
  reset: () => void;
};

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  data: {},
  setData: (newData) => set((state) => ({ 
    data: { ...state.data, ...newData } 
  })),
  reset: () => set({ data: {} }),
}));