import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//    === STYLES ===
import style from "../../style/nav.module.scss";

//    === COMPONENT ===
import Button from "../button/Button";

const Navigation = () => {
  const [name, setName] = useState<String | null>(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setName(null);
  };

  return (
    <nav className={style.navigation}>
      {name && <h2>Witaj {name}</h2>}
      <ul>
        <li>
          <Link to="/" className={style.link}>
            <Button>Strona główna</Button>
          </Link>
        </li>
        <li>
          <Link to="/register" className={style.link}>
            <Button>Rejstracja</Button>
          </Link>
        </li>
        {name ? (
          <li onClick={handleLogOut}>
            <Button>Wyloguj</Button>
          </li>
        ) : (
          <li>
            <Link to="/login" className={style.link}>
              <Button>Zaloguj</Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
