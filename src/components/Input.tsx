type InputProps = {
  width?: number;
  placeHolder?: string;
} | typeof defaultProps;

const defaultProps = {
  width: 200,
  placeHolder: 'Text default'
}

export function Input(props: InputProps) {
  return (
    <>
      <input
        placeholder={props.placeHolder}
        style={{ width: props.width }}
      />
    </>
  );
}