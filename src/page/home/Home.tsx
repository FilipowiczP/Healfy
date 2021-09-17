import { useEffect, useState } from "react";
import style from "../../style/home.module.scss";

const Home = () => {
  const [checkLogin, setCheckLogin] = useState<String | null>(null);
  useEffect(() => {
    setCheckLogin(localStorage.getItem("name"));
  }, []);
  return (
    <main className={style.main}>
      {checkLogin === null ? (
        <h1>Witaj w naszym serwisie zaloguj się </h1>
      ) : (
        <h1>Witaj {checkLogin}</h1>
      )}
    </main>
  );
};

export default Home;
