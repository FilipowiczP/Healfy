import Button from "@material-ui/core/Button";

interface Props {
  children: React.ReactNode;
}

const ButtonComponent = ({ children }: Props) => {
  return (
    <Button variant="contained" color="primary">
      {children}
    </Button>
  );
};

export default ButtonComponent;
