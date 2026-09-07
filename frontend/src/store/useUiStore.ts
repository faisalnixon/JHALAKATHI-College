import { create } from "zustand";

type UiStore = {
  menuOpen: boolean;
  academicDrawerOpen: boolean;

  setMenuOpen: (open: boolean) => void;
  setAcademicDrawerOpen: (open: boolean) => void;

  toggleMenu: () => void;
  toggleAcademicDrawer: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  menuOpen: false,
  academicDrawerOpen: false,

  setMenuOpen: (open) => set({ menuOpen: open }),

  setAcademicDrawerOpen: (open) =>
    set({ academicDrawerOpen: open }),

  toggleMenu: () =>
    set((state) => ({
      menuOpen: !state.menuOpen,
    })),

  toggleAcademicDrawer: () =>
    set((state) => ({
      academicDrawerOpen: !state.academicDrawerOpen,
    })),
}));