import React, { useState } from "react";

//    === COMPONENTS ===
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

//    === STYLES ===
import style from "../../style/login.module.scss";

//    === INTERFACE ===
import { LoginForm } from "../../../interface/form";

const Login = () => {
  const [formValue, setFormValue] = useState<LoginForm>({
    login: "",
    password: "",
  });

  const [validation, setValidation] = useState<Boolean>(false);

  //    === VALIDATION AND LOGIN USER ===
  const handleSubmit = (event: React.FormEvent) => {
    let check: boolean = true;

    if (formValue.login.length <= 4 || formValue.password.length <= 4) {
      check = false;
      setValidation(true);
    }
    if (check === true) {
      fetch("http://localhost:5000/users/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.user);
          setValidation(false);
          window.location.reload();
        });
    }
    event.preventDefault();
  };

  return (
    <main className={style.main}>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(event)
        }
      >
        <TextField
          className={style.input}
          id="outlined-basic"
          label="Login"
          type="text"
          value={formValue.login}
          onChange={(event) =>
            setFormValue({ ...formValue, login: event.target.value })
          }
        />
        <TextField
          className={style.input}
          id="outlined-basic"
          label="Hasło"
          type="password"
          value={formValue.password}
          onChange={(event) =>
            setFormValue({ ...formValue, password: event.target.value })
          }
        />
        {validation && (
          <Alert severity="error" className={style.error}>
            Błędne dane
          </Alert>
        )}

        <Button type="submit" variant="contained" color="primary">
          Zaloguj
        </Button>
      </form>
    </main>
  );
};

export default Login;
