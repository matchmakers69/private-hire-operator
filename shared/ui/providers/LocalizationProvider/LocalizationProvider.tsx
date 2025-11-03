"use client";

import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
	return <MUILocalizationProvider dateAdapter={AdapterDateFns}>{children}</MUILocalizationProvider>;
};

export default LocalizationProvider;
