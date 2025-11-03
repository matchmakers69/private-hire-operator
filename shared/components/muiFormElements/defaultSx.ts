import { SxProps, Theme } from "@mui/material";

/** Dropdown item styles */
export const dropDownOptionsSx: SxProps<Theme> = {
	fontSize: "var(--text-sm)",
	color: "var(--color-text-dark)",
	fontFamily: "var(--font-inter)",
};

/** Dropdown menu (Paper) styles */
export const dropDownPaperOptionsSx: SxProps<Theme> = {
	borderRadius: "1rem",
	backgroundColor: "var(--color-background)",
	border: "1px solid var(--color-grey-medium)",
	fontSize: "var(--text-sm)",
	fontFamily: "var(--font-inter)",
	color: "var(--color-text-dark)",
	"& .MuiMenuItem-root": {
		fontSize: "var(--text-sm)",
		padding: "1rem 1.6rem",
		"&:hover": {
			backgroundColor: "var(--color-grey-light)",
		},
		"&.Mui-selected": {
			backgroundColor: "var(--color-taxi-yellow)",
			color: "var(--color-dark-navy)",
			fontWeight: "var(--font-weight-bold-text)",
		},
	},
};

/** Default input + label style overrides */
export const getDefaultSx = (sx: SxProps<Theme> = {}): SxProps<Theme> => ({
	...sx,

	"& .MuiInputLabel-outlined": {
		color: "var(--color-text-dark)",
		fontSize: "var(--text-sm)",
	},
	"& .MuiInputLabel-outlined.Mui-disabled": {
		color: "var(--color-text-muted)",
		opacity: 0.4,
	},
	"& .MuiInputLabel-outlined.Mui-focused": {
		color: "var(--color-taxi-red)",
	},

	"& .MuiInputBase-input": {
		fontSize: "var(--text-base)",
		color: "var(--color-text-dark)",
		"&::placeholder": {
			opacity: 0.4,
			color: "var(--color-text-muted)",
		},
	},

	"& .MuiOutlinedInput-root": {
		fontSize: "var(--text-base)",
		color: "var(--color-text-dark)",
		borderRadius: "1rem",
		transition: "border-color 120ms ease-in",

		"& fieldset": {
			border: "1px solid var(--color-grey-medium)",
		},
		"&:hover fieldset": {
			borderColor: "var(--color-taxi-yellow)",
		},
		"&.Mui-focused fieldset": {
			borderColor: "var(--color-taxi-red)",
			outline: 0,
		},
	},
});
