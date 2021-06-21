import { useState } from 'react';
import { Input } from './Input';

type ButtonProps = {
  text?: string;
  textInput?: string;
  children?: string;
  visible?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <>
      <Input placeHolder={props.textInput} visible={props.visible || false} />
      <div/>
      <button >{props.text || props.children}</button>
    </>
  );
}
