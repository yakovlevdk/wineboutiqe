import { Carousel } from "react-bootstrap";
import "./carouselhome.css"; // Подключаем файл стилей
import "bootstrap/dist/css/bootstrap.min.css";

export const CarouselHome = () => {
  return (
    <>
      <div className="container-fluid">
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <div className="textcarousel">
              <h3>Белый бархат</h3>
              <p>
                Красное вино с ярким ароматом спелой вишни и легким оттенком
                дуба, подарит ощущение праздника.
              </p>
            </div>
            <img src="popul1.png" />
          </Carousel.Item>
          <Carousel.Item>
            <div className="textcarousel">
              <h3>Вечерний Шарм</h3>
              <p>
                Красное вино, которое удивит вас своим глубоким вкусом с
                акцентами вишни и дуба.
              </p>
            </div>
            <img src="popul2.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <div className="textcarousel">
              <h3>Звездная Ночь</h3>
              <p>Игристое вино, которое станет украшением любого торжества.</p>
            </div>
            <img src="popul3.webp" />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};
