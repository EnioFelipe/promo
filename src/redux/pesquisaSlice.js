import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    id: null,
    nome: null
}

export const pesquisaSlice = createSlice({
    name: 'pesquisa',
    initialState: initialValues,
    reducers: {
        reducerSetPesquisa: (state, action) => {
            state.id = action.payload.id;
            state.nome = action.payload.nome;
            state.pessimo = action.payload.pessimo;
            state.ruim = action.payload.ruim;
            state.neutro = action.payload.neutro;
            state.bom = action.payload.bom;
            state.excelente = action.payload.excelente;
        }
    }
})

export const {reducerSetPesquisa} = pesquisaSlice.actions

export default pesquisaSlice.reducer