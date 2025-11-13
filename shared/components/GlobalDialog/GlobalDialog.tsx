"use client";

import { Dialog, DialogContent, DialogActions, SxProps, Theme, Box } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeModal } from "@/store/features/modalSlice";
import BookingForm from "@/app/[locale]/(marketing)/_components/BookingForm";
import { BaseProps } from "@/shared/types";
import { X } from "lucide-react";
import { IconButton } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { Button } from "../Button";

type GlobalDialogProps = {
  additionalPaperSx?: SxProps<Theme>;
  title?: string;
} & BaseProps;

function GlobalDialog({ additionalPaperSx }: GlobalDialogProps) {
  const dispatch = useAppDispatch();
  const { open, modalType, modalProps } = useAppSelector((state) => state.modal);

  let content: React.ReactNode = null;
  if (modalType === "form") content = <BookingForm {...modalProps} />;
  // add other modal types here, e.g. "message", "confirmation", etc.

  const basePaperSx: SystemStyleObject<Theme> = {
    width: "100%",
    maxWidth: "var(--container-max-width-md)",
    margin: "1.5rem auto",
    padding: "30px 0 20px 0",
    minWidth: "30rem",
    borderRadius: "2rem",
    "@media (min-width: 768px)": { minWidth: "52rem", padding: "30px 10px 20px 10px" },
    "@media (min-width: 960px)": { minWidth: "62rem" },
  };

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
      {modalProps?.title && typeof modalProps.title === "string" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            paddingBottom: 0,
          }}
        >
          <h3 id="global-dialog-title" className="text-[2rem] font-semibold text-text-light sm:text-[2.4rem]">
            {modalProps.title}
          </h3>
          <IconButton
            onClick={() => dispatch(closeModal())}
            size="small"
            aria-label="close modal"
            sx={{ color: "text.secondary" }}
          >
            <X size={20} />
          </IconButton>
        </Box>
      )}
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <div className="w-full flex justify-end py-6">
          <Button onClick={() => dispatch(closeModal())} size="md" intent="secondary">
            {modalProps?.closeButton || "Close"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default GlobalDialog;
