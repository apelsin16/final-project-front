// modalSlice для глобального керування модальними вікнами
// Всі коментарі — українською для навчання

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalType: null, // тип модалки: 'login', 'register', 'logout' або null
    modalProps: {}, // додаткові пропси для модалки (наприклад, текст, id тощо)
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, { payload }) {
            state.modalType = payload.type;
            state.modalProps = payload.props || {};
        },
        closeModal(state) {
            state.modalType = null;
            state.modalProps = {};
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
