import { SxProps, Theme } from "@mui/material";

/* --- Base Input Styling --- */
export const InputSx: SxProps<Theme> = {
  "& .MuiInputLabel-outlined": {
    color: "var(--color-text-dark)",
    fontSize: "var(--text-sm)",
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "var(--color-text-dark)",
  },
  "& .MuiOutlinedInput-root": {
    fontSize: "var(--text-base)",
    color: "var(--color-text-dark)",
    borderRadius: "10px",
    transition: "border-color 120ms ease-in",

    "& .MuiInputBase-input": {
      fontSize: "var(--text-base)",
      color: "var(--color-text-dark)",
      "&::placeholder": {
        opacity: 0.4,
        color: "var(--color-text-muted)",
      },
    },

    "& fieldset": {
      border: "1px solid var(--color-grey-medium)",
    },
    "&:hover fieldset": {
      borderColor: "var(--color-text-dark)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-text-dark)",
      background: "none",
    },
  },
};

/* --- DateTime TextField Styling --- */
export const dateTimeTextFieldStyling = (
  theme: Theme,
  error: boolean,
  open: boolean,
  disabled: boolean,
): SxProps<Theme> => {
  let borderColor = error ? theme.palette.error.main : "var(--color-grey-medium)";
  let hoverBorderColor = error ? theme.palette.error.main : "var(--color-text-dark)";
  let focusedBorderColor = error ? theme.palette.error.main : "var(--color-text-dark)";

  if (open) borderColor = focusedBorderColor;
  if (disabled) {
    borderColor = hoverBorderColor = focusedBorderColor = "var(--color-grey-medium)";
  }

  return {
    "& .MuiInputLabel-outlined": {
      color: "var(--color-text-dark)",
      fontSize: "var(--text-sm)",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: error ? theme.palette.error.main : "var(--color-text-dark)",
    },
    "& .MuiInputLabel-outlined.Mui-disabled": {
      color: "var(--color-text-muted)",
      opacity: 0.6,
    },

    "& .MuiPickersInputBase-root": {
      color: "var(--color-text-dark)",
      fontSize: "var(--text-sm)",
      "&::placeholder": {
        opacity: 0.4,
        color: "var(--color-text-muted)",
      },
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

    "& .MuiInputAdornment-root .MuiIconButton-root": {
      color: "var(--color-text-dark)",
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
      "&.Mui-disabled": { opacity: 0.4 },
    },

    "& .MuiOutlinedInput-root": {
      fontSize: "var(--text-base)",
      borderRadius: "10px",
      "& fieldset": { borderColor },
      "&:hover fieldset": { borderColor: hoverBorderColor },
      "&.Mui-focused fieldset": { borderColor: focusedBorderColor },
      "&.Mui-disabled fieldset": { opacity: 0.5 },
    },

    "& .MuiFormHelperText-root": {
      fontSize: "var(--text-xs)",
      marginTop: "0.25rem",
      color: error ? theme.palette.error.main : "var(--color-text-muted)",
    },
  };
};

/* --- Shared Popper Base Styling --- */
const basePickerPaperStyling = (theme: Theme): SxProps<Theme> => ({
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.5rem",
  backgroundColor: "var(--color-background)",
  padding: "0.5rem",

  "& svg": {
    stroke: "var(--color-text-dark)",
    width: "1.4rem",
    height: "1.4rem",
    strokeWidth: "0.25rem",
  },

  "& .MuiDialogActions-root .MuiButtonBase-root": {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-dark)",
    fontWeight: 600,
    textTransform: "none",
    "&:hover": { backgroundColor: "var(--color-grey-light)" },
  },
});

/* --- DatePicker Popper Styling --- */
export const datePickerPaperStyling = (theme: Theme): SxProps<Theme> => ({
  ...basePickerPaperStyling(theme),

  "& .MuiPickersCalendarHeader-labelContainer": {
    color: "var(--color-secondary)",
    fontSize: "var(--text-md)",
  },

  "& .MuiPickersArrowSwitcher-root": {
    display: "flex",
    gap: ".5rem",
    alignItems: "center",
  },

  "& .MuiPickersArrowSwitcher-root button": {
    backgroundColor: "var(--color-taxi-yellow)",
    color: "var(--color-white)",
  },

  "& .MuiDayCalendar-header": {
    backgroundColor: "var(--color-grey-light)",
    "& .MuiTypography-root": {
      color: "var(--color-text-dark)",
      fontSize: "1.2rem",
    },
  },

  "& .MuiPickersDay-root": {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-dark)",
    "&:hover": { backgroundColor: "var(--color-grey-light)" },
    "&.Mui-selected": {
      color: "var(--color-white)",
      backgroundColor: "var(--color-primary) !important",
      "&:hover": { backgroundColor: "var(--color-taxi-yellow) !important" },
    },
  },

  "& .MuiPickersDay-today": {
    border: `2px solid var(--color-primary)`,
    fontWeight: "bold",
  },
});

/* --- TimePicker Popper Styling --- */
export const timePickerPaperStyling = (theme: Theme): SxProps<Theme> => ({
  ...basePickerPaperStyling(theme),

  "& .MuiMultiSectionDigitalClock-root": {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },

  "& .MuiMultiSectionDigitalClockSection-item": {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-dark)",
    "&.Mui-selected": {
      backgroundColor: "var(--color-primary)",
      color: "var(--color-white)",
    },
    "&:hover": {
      backgroundColor: "var(--color-grey-light)",
    },
  },

  "& .MuiPickersToolbar-root": {
    backgroundColor: "transparent",
    color: "var(--color-text-dark)",
  },
});
