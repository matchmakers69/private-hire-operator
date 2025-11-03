import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'english' | 'polish';

interface LangState {
  language: Language;
}

const getInitialTheme = (): Language => {
  if (typeof window !== 'undefined') {
    // 1. check localStorage
    const stored = localStorage.getItem('language') as Language | null;
    if (stored) return stored;
  }
  return 'english';
};

const initialState: LangState = {
  language: getInitialTheme(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.language = state.language === 'polish' ? 'english' : 'polish';
      if (typeof window !== 'undefined') localStorage.setItem('language', state.language);
    },
    setTheme: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      if (typeof window !== 'undefined') localStorage.setItem('language', state.language);
    },
  },
});

export const { toggleTheme, setTheme } = languageSlice.actions;
export default languageSlice.reducer;
