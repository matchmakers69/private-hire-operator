import { useBookingForm } from "../../_hooks/useBookingForm";
import { Controller } from "react-hook-form";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { CircularProgress, Alert } from "@mui/material";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { MuiTextField } from "@/shared/components/muiFormElements/MuiTextField";
import {
  datePickerPaperStyling,
  dateTimeTextFieldStyling,
  timePickerPaperStyling,
} from "@/shared/utils/muiStyles";
import { useActionState, useEffect } from "react";
import { BookingFormState, submitBookingForm } from "../../_actions/bookingEmail";
function BookingForm() {
  const {
    formMethods: {
      control,
      formState: { errors },
      reset,
      getValues,
    },
    datePickerOpen,
    setDatePickerOpen,
    timePickerOpen,
    setTimePickerOpen,
    theme,
  } = useBookingForm();

  const [state, formAction, isPending] = useActionState<BookingFormState, FormData>(submitBookingForm, {
    success: undefined,
    error: undefined,
    message: undefined,
  });

  // Reset form on success
  useEffect(() => {
    if (state.success) {
      reset();
    }
  }, [state.success, reset]);
  return (
    <div className="w-full mb-10">
      {state.success && (
        <Alert severity="success" className="mb-6">
          <p className="font-medium text-sm">{state.message}</p>
        </Alert>
      )}

      {state.error && (
        <Alert severity="error" className="mb-6">
          <p className="font-medium text-sm">{state.error}</p>
        </Alert>
      )}

      <form
        action={async (formData) => {
          const values = getValues(); // pobiera dane z RHF
          formData.set("departureDate", values.departureDate?.toISOString() || "");
          formData.set("departureTime", values.departureTime?.toISOString() || "");
          await formAction(formData);
        }}
        autoComplete="off"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                disabled={isPending}
              />
            )}
          />

          <div className="mb-8">
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
                  disabled={isPending}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                disabled={isPending}
              />
            )}
          />

          <div className="mb-8">
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
                  disabled={isPending}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-8">
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
                disabled={isPending}
              />
            )}
          />
        </div>

        <div className="mb-8">
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
                error={!!errors.to}
                fullWidth
                margin="none"
                disabled={isPending}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Controller
            name="departureDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Departure Date"
                format="dd/MM/yyyy"
                minDate={new Date()}
                disabled={isPending}
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
                    name: "departureDate",
                    sx: dateTimeTextFieldStyling(theme, !!errors.departureDate, datePickerOpen, isPending),
                  },
                  popper: {
                    sx: datePickerPaperStyling(theme),
                  },
                }}
              />
            )}
          />

          <div className="mb-8">
            <Controller
              name="departureTime"
              control={control}
              render={({ field }) => (
                <TimePicker
                  {...field}
                  label="Departure Time"
                  format="HH:mm"
                  ampm={false}
                  disabled={isPending}
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
                      name: "departureTime",
                      sx: dateTimeTextFieldStyling(theme, !!errors.departureTime, timePickerOpen, isPending),
                    },
                    popper: {
                      sx: timePickerPaperStyling(theme),
                    },
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="pt-10">
          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <CircularProgress size={24} className="mr-2" />
                Sending...
              </>
            ) : (
              "Book Journey"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
