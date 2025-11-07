// store/features/modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "form" | "message" | "confirmation"; 

interface ModalPayload {
  modalType: ModalType;
  modalProps?: Record<string, unknown>; 
}

interface ModalState {
  open: boolean;
  modalType: ModalType | null;
  modalProps?: Record<string, unknown>;
}

const initialState: ModalState = {
  open: false,
  modalType: null,
  modalProps: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalPayload>) => {
      state.open = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    closeModal: (state) => {
      state.open = false;
      state.modalType = null;
      state.modalProps = undefined;
    },
    toggleModal: (state) => {
      state.open = !state.open;
      if (!state.open) {
        state.modalType = null;
        state.modalProps = undefined;
      }
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
