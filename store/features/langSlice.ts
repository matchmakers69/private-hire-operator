import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "eng" | "pl";

interface LangState {
	language: Language;
}

const getInitialTheme = (): Language => {
	if (typeof window !== "undefined") {
		// 1. check localStorage
		const stored = localStorage.getItem("language") as Language | null;
		if (stored) return stored;
	}
	return "pl";
};

const initialState: LangState = {
	language: getInitialTheme(),
};

const languageSlice = createSlice({
	name: "language",
	initialState,
	reducers: {
		toggleLanguage: (state) => {
			state.language = state.language === "pl" ? "eng" : "pl";
			if (typeof window !== "undefined") localStorage.setItem("language", state.language);
		},
		setLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload;
			if (typeof window !== "undefined") localStorage.setItem("language", state.language);
		},
	},
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
