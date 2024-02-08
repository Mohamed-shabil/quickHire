import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    open: boolean;
}

const initialState: ModalState = {
    open: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setOpen: (state) => {
            state.open = true;
        },
        setClose: (state) => {
            state.open = false;
        }
    },
});

export const { setClose, setOpen } = modalSlice.actions;
export default modalSlice.reducer;
