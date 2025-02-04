import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type sidebarStoreProps = {
  selectedOption: string | null;
  setSelectedOption: (option: string) => void;
}

export const useSidebarStore = create(
  persist<sidebarStoreProps>(
    (set) => ({
      selectedOption: null,
      setSelectedOption: (option) => set({ selectedOption: option })
    }),
    {
      name: 'sidebarProps'
    }
  ));