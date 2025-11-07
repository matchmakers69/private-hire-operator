"use client";

import { useAppDispatch } from "@/store/hooks";
import { Button } from "../Button";
import { openModal } from "@/store/features/modalSlice";

interface OpenModalButtonProps {
  buttonText?: string;
  modalType: "form" | "message";
  modalProps?: Record<string, unknown> | undefined;
}

function OpenModalButton({ buttonText, modalType, modalProps }: OpenModalButtonProps) {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => dispatch(openModal({ modalType, modalProps }))}
      type="button"
      intent="secondary"
      size="lg"
    >
      {buttonText}
    </Button>
  );
}

export default OpenModalButton;
