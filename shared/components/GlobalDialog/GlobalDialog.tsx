"use client";

import { Dialog, DialogContent, DialogActions, SxProps, Theme } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/features/modalSlice";
import BookingForm from "@/app/[locale]/(marketing)/_components/BookingForm";
import { BaseProps } from "@/shared/types";
import { SystemStyleObject } from "@mui/system";
import { Button } from "../Button";

type GlobalDialogProps = {
  additionalPaperSx?: SxProps<Theme>;
  title?: string;
} & BaseProps;

function GlobalDialog({ additionalPaperSx }: GlobalDialogProps) {
  const dispatch = useAppDispatch();
  const { open, modalType, modalProps } = useAppSelector((state) => state.modal);

  // determine content based on modalType
  let content: React.ReactNode = null;
  if (modalType === "form") content = <BookingForm {...modalProps} />;
  // add other modal types here, e.g. "message", "confirmation", etc.

  // base paper styles
  const basePaperSx: SystemStyleObject<Theme> = {
    width: "100%",
    maxWidth: "var(--container-max-width-md)",
    margin: "1.5rem auto",
    padding: "2rem",
    minWidth: "50rem",
    backgroundColor: "var(--color-background)",
    border: "1px solid hsla(0,0%,100%,0.15)",
    boxShadow: "0px 4px 8px -4px rgb(0 0 0 / 48%)",
    borderRadius: "2rem",
    "@media (min-width: 768px)": { minWidth: "52rem" },
    "@media (min-width: 960px)": { minWidth: "62rem" },
  };

  // merge additionalPaperSx safely
  const mergedPaperSx: SxProps<Theme> = Array.isArray(additionalPaperSx)
    ? [basePaperSx, ...additionalPaperSx]
    : { ...basePaperSx, ...(additionalPaperSx as SystemStyleObject<Theme>) };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="global-dialog-title"
      aria-describedby="global-dialog-description"
      slotProps={{
        paper: {
          sx: mergedPaperSx,
          role: "document",
        },
      }}
    >
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())} size="md" intent="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GlobalDialog;
