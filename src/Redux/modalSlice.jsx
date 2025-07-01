import { createSlice } from '@reduxjs/toolkit';

const lastSeen = localStorage.getItem('lastInviteModalSeen');
const daysSince = lastSeen ? (Date.now() - new Date(lastSeen)) / (1000 * 60 * 60 * 24) : Infinity;

const initialState = {
  showModal: daysSince >= 7, // Show if 14 days have passed or never shown
  modalOpen: true,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    hideModal(state) {
      state.showModal = false;
      localStorage.setItem('lastInviteModalSeen', new Date().toISOString());
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    openModal(state) {
      state.modalOpen = true;
    },
  },
});

export const { hideModal, closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
