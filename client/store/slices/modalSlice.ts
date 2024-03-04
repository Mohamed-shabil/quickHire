import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "AboutFormModal" | "EducationFormModal" | "ExperienceFormModal" | 
    "LinkFormModal" | "ProjectFormModal" |"ProfileAvatar" | "CreatePost" | "editPost"| "createJob"

interface ModalState {
    open: boolean;
    type:ModalType | null
}


const initialState: ModalState = {
    open: false,
    type: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setOpen: (state,action) => {
            state.open = true;
            state.type = action.payload
        },
        setClose: (state) => {
            state.open = false;
        }
    },
});



export const { setClose, setOpen } = modalSlice.actions;
export default modalSlice.reducer;
