import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Education, Experience } from "@/types/types";

export type ModalType =
    | "AboutFormModal"
    | "EducationFormModal"
    | "ExperienceFormModal"
    | "LinkFormModal"
    | "ProjectFormModal"
    | "ProfileAvatar"
    | "CreatePost"
    | "editPost"
    | "createJob";

interface ModalState {
    open: boolean;
    type: ModalType | null;
    data: Education | Experience | null;
}

const initialState: ModalState = {
    open: false,
    type: null,
    data: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = true;
            state.type = action.payload.type;
            if (state.type === "EducationFormModal") {
                state.data = action.payload.data as Education;
            } else if (state.type === "ExperienceFormModal") {
                state.data = action.payload.data as Experience;
            }
        },
        setClose: (state) => {
            state.open = false;
        },
    },
});

export const { setClose, setOpen } = modalSlice.actions;
export default modalSlice.reducer;
