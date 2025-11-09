import { useBookingForm } from "../../_hooks/useBookingForm";
import { Controller } from "react-hook-form";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { CircularProgress, Box } from "@mui/material";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { MuiTextField } from "@/shared/components/muiFormElements/MuiTextField";
import { FormHelperText } from "@/shared/components/muiFormElements/FormHelperText";
import {
  datePickerPaperStyling,
  dateTimeTextFieldStyling,
  timePickerPaperStyling,
} from "@/shared/utils/muiStyles";
function BookingForm() {
  const {
    formMethods: {
      control,
      handleSubmit,
      formState: { errors },
    },
    submitBooking,
    submitStatus,
    datePickerOpen,
    setDatePickerOpen,
    timePickerOpen,
    setTimePickerOpen,
    theme,
  } = useBookingForm();
  return (
    <form className="w-full mb-10" autoComplete="off" noValidate onSubmit={handleSubmit(submitBooking)}>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-6">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <MuiTextField
                {...field}
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                label="First name"
                variant="outlined"
                error={!!errors.firstName}
                fullWidth
                margin="none"
              />
            )}
          />
          {errors.firstName?.message && <FormHelperText>{errors.firstName.message}</FormHelperText>}
        </div>
        <div className="mb-6">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <MuiTextField
                {...field}
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                label="Last name"
                variant="outlined"
                error={!!errors.lastName}
                fullWidth
                margin="none"
              />
            )}
          />
          {errors.lastName?.message && <FormHelperText>{errors.lastName.message}</FormHelperText>}
        </div>
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-6">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <MuiTextField
                {...field}
                type="email"
                id="email"
                placeholder="Enter your email"
                label="Email"
                variant="outlined"
                error={!!errors.email}
                fullWidth
                margin="none"
              />
            )}
          />
          {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
        </div>

        <div className="mb-6">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MuiTextField
                {...field}
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                label="Phone"
                variant="outlined"
                error={!!errors.phone}
                fullWidth
                margin="none"
              />
            )}
          />
          {errors.phone && <FormHelperText>{errors.phone.message}</FormHelperText>}
        </div>
      </Box>

      <div className="mb-6">
        <Controller
          name="from"
          control={control}
          render={({ field }) => (
            <MuiTextField
              {...field}
              type="text"
              id="from"
              placeholder="e.g. Boston, High Street 1"
              label="Pickup Location"
              variant="outlined"
              error={!!errors.from}
              fullWidth
              margin="none"
            />
          )}
        />
        {errors.from && <FormHelperText>{errors.from.message}</FormHelperText>}
      </div>
      <div className="mb-6">
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <MuiTextField
              {...field}
              type="text"
              id="to"
              placeholder="e.g. London Heathrow Airport"
              label="Destination"
              variant="outlined"
              error={!!errors.from}
              fullWidth
              margin="none"
            />
          )}
        />
        {errors.to && <FormHelperText>{errors.to.message}</FormHelperText>}
      </div>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-6">
          <Controller
            name="departureDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Departure Date"
                format="dd/MM/yyyy"
                minDate={new Date()}
                disabled={submitStatus === "loading"}
                value={field.value ?? null}
                onChange={(date) => field.onChange(date)}
                onOpen={() => setDatePickerOpen(true)}
                onClose={() => setDatePickerOpen(false)}
                slots={{
                  openPickerIcon: () => <Calendar size={20} />,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.departureDate,
                    id: "departure-date",
                    sx: dateTimeTextFieldStyling(
                      theme,
                      !!errors.departureDate,
                      datePickerOpen,
                      submitStatus === "loading",
                    ),
                  },
                  popper: {
                    sx: datePickerPaperStyling(theme),
                  },
                }}
              />
            )}
          />
          {errors.departureDate && <FormHelperText>{String(errors.departureDate?.message)}</FormHelperText>}
        </div>
        <div className="mb-6">
          <Controller
            name="departureTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                {...field}
                label="Departure Time"
                format="HH:mm"
                ampm={false}
                disabled={submitStatus === "loading"}
                value={field.value ?? null}
                onChange={(time) => field.onChange(time)}
                onOpen={() => setTimePickerOpen(true)}
                onClose={() => setTimePickerOpen(false)}
                slots={{
                  openPickerIcon: () => <Clock size={20} />,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.departureTime,
                    id: "departure-time",
                    sx: dateTimeTextFieldStyling(
                      theme,
                      !!errors.departureTime,
                      timePickerOpen,
                      submitStatus === "loading",
                    ),
                  },
                  popper: {
                    sx: timePickerPaperStyling(theme),
                  },
                }}
              />
            )}
          />
          {errors.departureTime && <FormHelperText>{String(errors.departureTime?.message)}</FormHelperText>}
        </div>
      </Box>

      <Box className="pt-14">
        <Button type="submit" size="lg" className="w-full" disabled={submitStatus === "loading"}>
          {submitStatus === "loading" ? (
            <>
              <CircularProgress size={24} className="mr-2" />
              Sending...
            </>
          ) : (
            "Book Journey"
          )}
        </Button>
      </Box>
    </form>
  );
}

export default BookingForm;
