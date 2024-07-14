import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Catalog } from "./Components/Pages/Catalog/Catalog";
import { DetailedPage } from "./Components/Pages/detailedPage/detailedPage";
import "react-toastify/dist/ReactToastify.css";
import { HomePage } from "./Components/Pages/HomePage/HomePage";
import { Cart } from "./Components/Pages/Cart/Cart";
import { useState } from "react";

import { Order } from "./Components/Pages/Order/Order";
export function App() {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    // Проверяем, что верхняя или нижняя граница элемента находится в области видимости
    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
  }

  // Функция анимации для элементов
  function animateElements() {
    const elements = document.querySelectorAll(".about, .products, .contact");

    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("pop-up");
      }
    });
  }

  // Слушатель события прокрутки
  window.addEventListener("scroll", animateElements);

  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [sum, setSum] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="catalog"
            element={<Catalog products={products} setProducts={setProducts} />}
          />
          <Route
            path="cart"
            element={
              <Cart
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                sum={sum}
                setSum={setSum}
              />
            }
          />
          <Route
            path="wine/:id"
            element={<DetailedPage products={products} />}
          />
          <Route
            path="order"
            element={
              <Order
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                sum={sum}
                setSum={setSum}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
