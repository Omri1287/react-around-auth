import logo from "../images/header-icon.svg";

function Header() {
  return (
    <header className="header">
        <img className="header__vector" src={logo} alt="around the usa logo" />
    </header>
  );
}

export default Header;
