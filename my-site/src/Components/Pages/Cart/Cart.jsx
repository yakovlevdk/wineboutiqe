import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";

export const Cart = ({ cartProducts, setCartProducts, sum, setSum }) => {
  const [refresh, setRefresh] = useState(false);
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((pr) => pr.json())
      .then((cart) => {
        setCartProducts(cart);
        setValues(cart.map(() => 1));
      });
  }, [refresh]);

  const deleteProductOfCart = (id) => {
    setTimeout(() => {
      fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE",
      });
      setRefresh(!refresh);
    }, 1000);
  };

  setSum(
    cartProducts.reduce((acc, val) => {
      return acc + val.numprice * values[cartProducts.indexOf(val)];
    }, 0)
  );

  const changeValue = (index, event) => {
    const array = [...values];
    array[index] = event.target.value;
    setValues(array);
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
            <Link to="/cart">Корзина</Link>
          </nav>
        </header>
        <div className="cart-container">
          <div className="cart-summary">
            В корзине товаров: {cartProducts.length}
          </div>

          <Table responsive className="cart-table">
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {cartProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="product-image-container">
                    <Link to={`/wine/${product.id}`}>
                      {" "}
                      <Card.Img
                        variant="top"
                        src={product.imageUrl}
                        className="product-image"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/wine/${product.id}`} className="order-link2">
                      {product.title}{" "}
                    </Link>
                  </td>
                  <td>
                    <div className="product-price-details">
                      {product.discountPrice ? (
                        <>
                          <span className="discounted-price">
                            {product.discountPrice} ₽
                          </span>
                          <span className="original-price order-link2">
                            {product.numprice} ₽
                          </span>
                        </>
                      ) : (
                        <span className="order-link2">
                          {product.numprice} ₽
                        </span>
                      )}
                    </div>
                    <div className="price-per-unit">цена за 1 шт</div>
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      defaultValue={1}
                      value={values[index]}
                      min={1}
                      max={10}
                      className="quantity-input"
                      onChange={(event) => changeValue(index, event)}
                    />
                  </td>
                  <td>
                    <div className="total-price">
                      {product.numprice * values[index]}₽
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteProductOfCart(product.id)}
                      className="delete-button"
                    >
                      ×
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="cart-footer">
            <div className="total-sum">
              Итого: <span>{sum} ₽</span>
            </div>
            <div className="action-buttons">
              <Button variant="success" className="order-link oformbutton">
                <Link to="/order" className="order-link1">
                  Оформить заказ
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <footer className="footer">
          <p>&copy; 2024 Wine Boutique. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};
