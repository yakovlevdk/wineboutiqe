import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="header">
        <h1 className="logo">Wine Boutique</h1>
        <nav className="nav">
          <a href="#home">Главная</a>
          <a href="#products">Популярные позиции</a>
          <Link to="/catalog">Каталог </Link>
          <Link to="/cart">Корзина </Link>
          <a href="#about">Про нас</a>
          <a href="#contact">Контакты</a>
        </nav>{" "}
      </header>
    </>
  );
};
