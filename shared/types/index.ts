import { ComponentProps } from "react";
import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export type BaseProps<T = ReactNode> = {
  children?: T;
  ["data-testid"]?: string;
  id?: string;
  sx?: SxProps<Theme>;
};

export type SvgComponentProps = ComponentProps<"svg"> & { title?: string };