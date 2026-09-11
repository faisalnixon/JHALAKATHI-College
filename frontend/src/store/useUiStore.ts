import { create } from "zustand";

type UiStore = {
  /* ---------------------------------------------------------------------- */
  /* PUBLIC UI                                                              */
  /* ---------------------------------------------------------------------- */
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  academicDrawerOpen: boolean;
  setAcademicDrawerOpen: (open: boolean) => void;
  toggleAcademicDrawer: () => void;

  /* ---------------------------------------------------------------------- */
  /* PROFESSOR FORM                                                         */
  /* ---------------------------------------------------------------------- */
  professorFormOpen: boolean;
  professorFormMode: "add" | "edit" | null;

  openProfessorAddForm: () => void;
  openProfessorEditForm: () => void;
  closeProfessorForm: () => void;

  /* ---------------------------------------------------------------------- */
  /* EMPLOYEE FORM                                                          */
  /* ---------------------------------------------------------------------- */
  employeeFormOpen: boolean;
  employeeFormMode: "add" | "edit" | null;

  openEmployeeAddForm: () => void;
  openEmployeeEditForm: () => void;
  closeEmployeeForm: () => void;

  /* ---------------------------------------------------------------------- */
  /* CREDENTIALS                                                            */
  /* ---------------------------------------------------------------------- */
  credentialsFormOpen: boolean;
  openCredentialsForm: () => void;
  closeCredentialsForm: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  /* ---------------------------------------------------------------------- */
  /* PUBLIC UI                                                              */
  /* ---------------------------------------------------------------------- */
  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),

  academicDrawerOpen: false,
  setAcademicDrawerOpen: (open) => set({ academicDrawerOpen: open }),
  toggleAcademicDrawer: () =>
    set((state) => ({ academicDrawerOpen: !state.academicDrawerOpen })),

  /* ---------------------------------------------------------------------- */
  /* PROFESSOR FORM                                                         */
  /* ---------------------------------------------------------------------- */
  professorFormOpen: false,
  professorFormMode: null,

  openProfessorAddForm: () =>
    set({ professorFormOpen: true, professorFormMode: "add" }),
  openProfessorEditForm: () =>
    set({ professorFormOpen: true, professorFormMode: "edit" }),
  closeProfessorForm: () =>
    set({ professorFormOpen: false, professorFormMode: null }),

  /* ---------------------------------------------------------------------- */
  /* EMPLOYEE FORM                                                          */
  /* ---------------------------------------------------------------------- */

  employeeFormOpen: false,
  employeeFormMode: null,

  openEmployeeAddForm: () =>
    set({ employeeFormOpen: true, employeeFormMode: "add" }),
  openEmployeeEditForm: () =>
    set({ employeeFormOpen: true, employeeFormMode: "edit" }),
  closeEmployeeForm: () =>
    set({ employeeFormOpen: false, employeeFormMode: null, }),

  /* ---------------------------------------------------------------------- */
  /* CREDENTIALS                                                            */
  /* ---------------------------------------------------------------------- */
  credentialsFormOpen: false,
  openCredentialsForm: () => set({credentialsFormOpen: true, }),

  closeCredentialsForm: () => set({ credentialsFormOpen: false, }),
}));
