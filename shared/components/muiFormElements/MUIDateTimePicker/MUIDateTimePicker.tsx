"use client";

import React, { useState, forwardRef } from "react";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { FormLabel } from "../FormLabel";
import { MUIDateTimePickerProps } from "./defs";

import {
  datePickerPaperStyling,
  dateTimeTextFieldStyling,
} from "@/utils/stylesUtils";
import { Theme } from "@mui/material";
import { Calendar } from "lucide-react";

const DateTimePickerWrapper = forwardRef<HTMLDivElement, DatePickerProps<Date>>(
  (props, ref) => {
    const { ...rest } = props as any;
    return <DatePicker ref={ref} {...rest} />;
  },
);

DateTimePickerWrapper.displayName = "DateTimePickerWrapper";

const MUIDateTimePicker = forwardRef<HTMLDivElement, MUIDateTimePickerProps>(
  (
    {
      disabled = false,
      disableFuture = false,
      disablePast = false,
      error = false,
      format = "dd MMM yyyy",
      labelOptionalText,
      labelText,
      maxDate,
      minDate,
      onChange = () => undefined,
      placeholder = "Select date",
      sx = {},
      timezone = "system",
      value,
      name = "",
      "data-testid": dataTestId = `${labelText}-open-icon`,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const parsedMaxDate = maxDate ? new Date(maxDate) : undefined;
    const parsedMinDate = minDate ? new Date(minDate) : undefined;
    return (
      <>
        {labelText && (
          <FormLabel
            htmlFor={labelText}
            label={labelText}
            optionalText={labelOptionalText || ""}
          />
        )}
        <DateTimePickerWrapper
          ref={ref}
          disabled={disabled}
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format}
          name={name}
          maxDate={parsedMaxDate}
          minDate={parsedMinDate}
          onChange={(newVal) => {
            onChange(newVal);
          }}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={disabled ? false : open}
          data-testid={dataTestId}
          slotProps={{
            inputAdornment: {
              position: "end",
              sx: {
                paddingLeft: "0.1rem",
              },
            },
            openPickerIcon: { "data-testid": dataTestId },
            textField: {
              placeholder,
              error: !!error,
              id: labelText,
              sx: (theme: Theme) =>
                dateTimeTextFieldStyling(theme, error, open, disabled),
            },
            desktopPaper: {
              sx: (theme: Theme) => datePickerPaperStyling(theme),
            },
            mobilePaper: {
              sx: (theme: Theme) => datePickerPaperStyling(theme),
            },
          }}
          sx={{ ...sx }}
          timezone={timezone}
          value={value}
          slots={{
            openPickerIcon: () => <Calendar size={20} />,
          }}
        />
      </>
    );
  },
);

MUIDateTimePicker.displayName = "MUIDateTimePicker";

export default MUIDateTimePicker;
