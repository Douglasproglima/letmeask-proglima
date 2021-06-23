import { useState } from "react";

type InputProps = {
  width?: number;
  placeHolder?: string;
  visible?: boolean;
} | typeof defaultProps;

const defaultProps = {
  width: 200,
  placeHolder: 'Text default',
  visible: false
}

export function Input(props: InputProps) {
  return (
    <>
      {props.visible
        ? (
          <input
              placeholder={props.placeHolder}
              style={{ width: props.width }}
            >
            </input>
        )
        : null
      }
    </>
  );
}