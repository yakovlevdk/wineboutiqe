import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../Header";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { CarouselHome } from "./Carousel";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export const HomePage = () => {
  const nameReg = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/;
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

  const schema = yup.object().shape({
    name: yup.string().matches(nameReg, "Некорректное имя!"),
    email: yup.string().matches(EMAIL_REGEXP, "Некорректный формат почты!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    console.log({ data });

    toast.success("Успешная отправка!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    reset();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <>
      <YMaps>
        <ToastContainer />

        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>Приветствуем вас!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Вам уже исполнилось 18 лет?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Нет</Button>
            <Button variant="primary" onClick={handleClose} className="btnage">
              Да, мне больше 18 лет
            </Button>
          </Modal.Footer>
        </Modal>
        <div className={`container1 `}>
          <div className="imagediv">
            <Header />
            <section id="home" className="home">
              <div className="home-content">
                <h2>Добро пожаловать на сайт нашего бутика!</h2>
                <p>Откройте для себя наш изысканный выбор вин со всего мира.</p>
              </div>
            </section>
          </div>

          <section id="about" className="about">
            <h2>Про нас</h2>
            <p>
              Wine Boutique — это винный магазин премиум-класса, предлагающий
              тщательно подобранные выбор вин на любой вкус.
            </p>
          </section>

          <section id="products" className="products">
            <h2>Новинки</h2>
            <div className="product-list">
              <div className="product">
                <img src="pop1.jpg" alt="Черный Бархат" />
                <h3>Черный Бархат</h3>
                <p>
                  Изысканное красное вино с нотками черной вишни и дуба,
                  завораживающее своим богатым вкусом.
                </p>
              </div>
              <div className="product">
                <img src="wine5.jpg" alt="Королевский Рубин" />
                <h3>Королевский Рубин</h3>
                <p>
                  Красное вино с ярким ароматом спелой вишни и легким оттенком
                  дуба, подарит ощущение праздника.
                </p>
              </div>
              <div className="product">
                <img src="wine4.jpg" alt="Вечерний Шарм" />
                <h3>Вечерний Шарм</h3>
                <p>
                  Красное вино, которое удивит вас своим глубоким вкусом с
                  акцентами вишни и дуба.
                </p>
              </div>
              <div className="product">
                <img src="wine6.jpg" alt="Летний Бриз" />
                <h3>Летний Бриз</h3>
                <p>
                  Свежее белое вино с тонами цитруса и зеленого яблока, идеально
                  подходит для летнего вечера.
                </p>
              </div>
              <div className="product">
                <img src="wine3.png" alt="Звездная Ночь" />
                <h3>Звездная Ночь</h3>
                <p>
                  Игристое вино, которое станет украшением любого торжества.
                </p>
              </div>
            </div>
            <h2>Популярные позиции</h2>
            <CarouselHome />
          </section>
          <section id="map" className="map">
            <h2>Как нас найти</h2>
            <Map
              className="yandex"
              defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
            >
              <Placemark geometry={[55.751574, 37.573856]} />
            </Map>
          </section>

          <section id="contact" className="contact">
            <h2>Связаться с нами</h2>
            <form
              className="contact-form"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <label htmlFor="name">Имя</label>
              <input type="text" id="name" name="name" {...register("name")} />
              <p>{errors.name?.message}</p>
              <label htmlFor="email">Электронная почта</label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email")}
              />
              <p>{errors.email?.message}</p>
              <label htmlFor="message">Сообщение</label>
              <input id="message" name="message"></input>
              <div
                className="g-recaptcha"
                data-sitekey="6LfwxQoqAAAAAL7VDWfttTLeaoDMyC0WlwOLo4y5"
              ></div>
              <button type="submit">Отправить</button>
            </form>
          </section>

          <footer className="footer">
            <p>&copy; 2024 Wine Boutique. All rights reserved.</p>
          </footer>
        </div>
      </YMaps>
    </>
  );
};
