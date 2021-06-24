import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type propertiesExtra = {
  isOutlined?: boolean;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & propertiesExtra;

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <>
      <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
    </>
  );
}
