import { createStore } from "zustand/vanilla";

export type ModalType = "edit-playlist";

export interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
}

export interface ModalActions {
  open: (type: ModalType) => void;
  close: () => void;
}

export type ModalStore = ModalState & ModalActions;

export const defaultInitialState = {
  type: null,
  isOpen: false,
} satisfies ModalState;

export const createModalStore = (
  initialState: ModalState = defaultInitialState,
) => {
  return createStore<ModalStore>((set) => ({
    ...initialState,
    open: (type) => set({ type, isOpen: true }),
    close: () =>
      set({
        isOpen: false,
        type: null,
      }),
  }));
};
