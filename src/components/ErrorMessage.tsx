type Props = {
  message: string;
};

function ErrorTag({ message }: Props) {
  return (
    <div id="errors" className="" style={{ color: "red" }}>
      {message}
    </div>
  );
}

export default ErrorTag;
