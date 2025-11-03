"use client";

import { forwardRef } from "react";
import { TextField, MenuItem, SxProps, Theme, Box, TextFieldProps } from "@mui/material";
import { dropDownOptionsSx, getDefaultSx } from "../defaultSx";

export interface OptionType {
	label: string;
	value: string | number;
	disabled?: boolean;
}

export interface MUITextFieldSelectProps extends Omit<TextFieldProps, "onChange"> {
	id?: string;
	labelText?: string;
	emptyLabel?: string;
	displayEmpty?: boolean;
	error?: boolean;
	options: OptionType[];
	value: OptionType["value"];
	onChange: (_selected: OptionType) => void;
	name?: string;
	maxWidth?: number;
	minWidth?: number;
	sx?: SxProps;
	["data-testid"]?: string;
	["aria-label"]?: string;
	displayValue?: boolean;
	placeholder?: string;
}

const MUITextFieldSelect = forwardRef<HTMLInputElement, MUITextFieldSelectProps>(
	(
		{
			variant = "outlined",
			labelText,
			name,
			id = "text-id",
			sx = {},
			"data-testid": dataTestid,
			"aria-label": ariaLabel,
			options,
			value,
			onChange,
			displayEmpty = false,
			emptyLabel = "Select an option",
			displayValue = false,
			placeholder = "",
			...props
		},
		ref,
	) => {
		const defaultSx: SxProps<Theme> = {
			"& .MuiInputLabel-outlined": {
				color: "var(--text-light)",
				fontSize: "1.4rem",
			},

			"& .MuiInputLabel-outlined.Mui-focused": {
				color: "var(--text-light)",
				fontSize: "1.4rem",
			},
			"& .MuiInputBase-input": {
				fontSize: "1.5rem",
				fontFamily: "var(--font-ibm)",
				...(displayValue && {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
				}),
				"&::placeholder": {
					opacity: 0.3,
				},
			},
			"& .MuiOutlinedInput-root": {
				fontSize: "1.5rem",
				fontFamily: "var(--font-ibm)",
				borderRadius: "10px",
				color: "var(--text-light)",

				"& fieldset": {
					border: "1px solid",
					borderColor: "hsla(0,0%,100%,0.15)",
				},
				"&:hover fieldset": {
					border: "1px solid",
					borderColor: "var(--text-light)",
				},
				"&.Mui-focused fieldset": {
					border: "1px solid",
					borderColor: "var(--text-light)",
				},
				".MuiOutlinedInput-notchedOutline": {
					borderRadius: "10px",
				},
			},
		};
		const mergedSx: SxProps<Theme> = {
			...(getDefaultSx() as object),
			...(sx as object),
			...defaultSx,
		};

		return (
			<TextField
				ref={ref}
				data-testid={dataTestid}
				aria-label={ariaLabel}
				id={id}
				name={name}
				label={labelText}
				variant={variant}
				sx={mergedSx}
				placeholder={placeholder}
				select
				value={value}
				slotProps={{
					select: {
						MenuProps: {
							sx: {
								"& .MuiPaper-root": {
									backgroundColor: "hsl(var(--background))",
									border: "1px solid hsla(0,0%,100%,0.15)",
									fontSize: "1.5rem",
									fontFamily: "var(--font-ibm)",
									color: "var(--text-light)",
									borderRadius: "10px",
								},
								"& .MuiMenuItem-root": {
									fontSize: "1.4rem",
									padding: "10px 16px",
									"&:hover": {
										backgroundColor: "hsla(0,0%,100%,0.15)",
									},
									"&.Mui-selected": {
										backgroundColor: "hsla(0,0%,100%,0.15)",
									},
								},
							},
						},
					},
				}}
				onChange={(e) => {
					const selectedOption = options.find((opt) => opt.value === e.target.value);
					if (selectedOption) {
						onChange(selectedOption);
					}
				}}
				{...props}
			>
				{displayEmpty && (
					<MenuItem sx={dropDownOptionsSx} value="" disabled>
						{emptyLabel}
					</MenuItem>
				)}
				{options.map((option) => (
					<MenuItem
						key={option.value}
						value={option.value}
						disabled={option.disabled}
						sx={{
							...dropDownOptionsSx,
							...(displayValue && {
								display: "flex",
								alignItems: "center",
								gap: 1,
							}),
						}}
					>
						{option.label}
						{displayValue && (
							<Box sx={{ fontWeight: "normal" }} component="span">
								{option.value}
							</Box>
						)}
					</MenuItem>
				))}
			</TextField>
		);
	},
);

MUITextFieldSelect.displayName = "MUITextFieldSelect";

export default MUITextFieldSelect;
