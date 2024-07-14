import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

export const Order = ({ sum }) => {
  const [isNext, setIsNext] = useState(false);

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().matches(EMAIL_REGEXP, "Некорректный формат почты."),
    phone: yup.string(),
    comment: yup.string(),
    message: yup.string(),
    city: yup.string(),
    address: yup.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = () => {
    setIsNext(!isNext);
  };
  const options = [
    { value: "Курьером", label: "Курьером" },
    { value: "Самовывоз", label: "Самовывоз" },
  ];
  const options1 = [
    { value: "Банковской картой", label: "Банковской картой" },
    { value: "Наличными при получении", label: "Наличными при получении" },
  ];

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

        <div className="order-container">
          <form className="order-form" onSubmit={handleSubmit(onSubmitHandler)}>
            {!isNext && (
              <>
                <label htmlFor="name">ФИО</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register("name")}
                />
                <label htmlFor="name">Номер телефона</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  {...register("phone")}
                />

                <label htmlFor="email">Электронная почта</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email")}
                />
                <p className="error-message">{errors.email?.message}</p>
                <label htmlFor="message">Комментарий к заказу</label>
                <input id="message" name="message" {...register("message")} />

                <Button type="submit" variant="primary" className="oformbutton">
                  Далее
                </Button>
              </>
            )}
          </form>
          {isNext && (
            <>
              <label htmlFor="city" className="input-label">
                Город
              </label>
              <input
                type="text"
                id="city"
                name="city"
                {...register("city")}
                placeholder="г. Калининград"
                className="input-field"
              />
              <label htmlFor="address" className="input-label">
                Адрес
              </label>
              <input
                type="text"
                id="address"
                name="address"
                {...register("address")}
                placeholder="Ул. Чапаева 6 кв.2"
                className="input-field"
              />
              <Select options={options} placeholder="Способ доставки" />
              <Select options={options1} placeholder="Способ оплаты" />
              <Button type="submit" variant="primary" className="oformbutton">
                Оформить
              </Button>
            </>
          )}
          <div className="order-summary">
            <h3>Итог:</h3>
            <div className="total-price">
              {sum}
              руб.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
