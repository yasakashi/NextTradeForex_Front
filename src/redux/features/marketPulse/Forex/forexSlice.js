import { createSlice } from '@reduxjs/toolkit';
import { EditorState, ContentState } from 'draft-js';

// Initial State
const initialState = {
  firstCountryHeading: '',
  secondCountryHeading: '',
  singlePageChartImage: '',
  FlexibleBlocklist: [],
  FirstCountryDatalist: [],
  SecondCountryDatalist: [],
  editorStates: {
    oneYearEditor: EditorState.createEmpty(),
    chartDescriptionEditor: EditorState.createEmpty(),
    firstCountryEditor: EditorState.createEmpty(),
    secondCountryEditor: EditorState.createEmpty(),
    bottomDescriptionEditor: EditorState.createEmpty(),
    mainDescriptionEditor: EditorState.createEmpty(),
  },
};

// Slice
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setHeading(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setDatalist(state, action) {
      const { field, data } = action.payload;
      state[field] = data;
      
    },
    setSinglePageChartImage(state, action) {
      state.singlePageChartImage = action.payload;
    },
    setDatalist(state, action) {
      const { field, data } = action.payload;
      state[field] = data;
    },
    setEditorState(state, action) {
      const { editor, editorState } = action.payload;
      state.editorStates[editor] = editorState;
    },
    updateEditorContent(state, action) {
      const { editor, content } = action.payload;
      state.editorStates[editor] = EditorState.createWithContent(
        ContentState.createFromText(content)
      );
    },
  },
});

export const {
  setHeading,
  setSinglePageChartImage,
  setDatalist,
  setEditorState,
  updateEditorContent,
} = currencySlice.actions;

export const selectCurrencyData = (state) => state.currency;

export default currencySlice.reducer;
