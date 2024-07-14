import { ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
export const DetailedPage = ({ products }) => {
  const [wine, setWine] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/allaboutwines/${id}`)
      .then((db) => db.json())
      .then((pr) => setWine(pr));
  }, []);

  const addToCart = () => {
    toast.success(`Позиция ${wine.title} добавлена в корзину.`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const item = products.find((prod) => prod.title === wine.title);
    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(item),
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="cat">
        <header className="header">
          <h1 className="logo">Wine Boutique</h1>
          <nav className="nav">
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
            <Link to="/cart">Корзина </Link>
          </nav>
        </header>

        <div className="wine-detail">
          <div className="inf">
            <h2>{wine.title}</h2>
            <img src={wine.imageUrl} alt={wine.title} />
            <Button variant="primary" onClick={addToCart}>
              Добавить в корзину
            </Button>
          </div>

          <div className="wine-descr">
            <p>
              <strong>Тип:</strong> {wine.type}
            </p>
            <p>
              <strong>Описание:</strong> {wine.description}
            </p>
            <p>
              <strong>Расширенное описание:</strong> {wine.extendedDescription}
            </p>
            <p>
              <strong>Страна:</strong> {wine.country}
            </p>
            <p>
              <strong>Регион:</strong> {wine.region}
            </p>
            <p>
              <strong>Сорт винограда:</strong> {wine.grapeVariety}
            </p>
            <p>
              <strong>Температура подачи:</strong> {wine.servingTemperature}
            </p>
            <p>
              <strong>Сочетание с блюдами:</strong> {wine.pairing}
            </p>

            <p className="price">Цена: {wine.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};
