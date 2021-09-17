import React, { useState } from "react";

//    === COMPONENTS ===
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Alert from "@mui/material/Alert";

//    === STYLES ===
import style from "../../style/register.module.scss";

//    === INTERFACE ===
import { RegisterForm } from "../../../interface/form";

const Register = () => {
  const [formValue, setFormValue] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    birthday: new Date("2021-09-18"),
    login: "",
    password: "",
  });

  const [validation, setValidation] = useState<Boolean | null>(null);

  const handleData = (newValue: Date | null) => {
    setFormValue({ ...formValue, birthday: newValue });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let check: boolean = true;

    if (
      formValue.login.length < 4 ||
      formValue.password.length < 4 ||
      formValue.firstName.length < 4 ||
      formValue.lastName.length < 4
    ) {
      check = false;
      setValidation(false);
    }
    if (check === true) {
      const newUser = await fetch("http://localhost:5000/users", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      setFormValue({
        firstName: "",
        lastName: "",
        birthday: new Date("2021-09-18"),
        login: "",
        password: "",
      });
      setValidation(true);
      window.location.replace("/");
      return newUser.json();
    }
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
          label="Imię"
          type="text"
          value={formValue.firstName}
          onChange={(event) =>
            setFormValue({ ...formValue, firstName: event.target.value })
          }
        />
        <TextField
          className={style.input}
          id="outlined-basic"
          label="Nazwisko"
          type="text"
          value={formValue.lastName}
          onChange={(event) =>
            setFormValue({ ...formValue, lastName: event.target.value })
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Data urodzenia"
            inputFormat="MM/dd/yyyy"
            value={formValue.birthday}
            onChange={handleData}
            renderInput={(params) => (
              <TextField
                id="outlined-basic"
                className={style.input}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
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
          <Alert severity="success" className={style.error}>
            Pmyślnie zarejstrowano
          </Alert>
        )}
        {validation === false ? (
          <Alert severity="error" className={style.error}>
            Błędne dane
          </Alert>
        ) : null}
        <Button type="submit" variant="contained" color="primary">
          Zarejstruj
        </Button>
      </form>
    </main>
  );
};

export default Register;
