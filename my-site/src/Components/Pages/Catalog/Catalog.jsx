import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
// Предполагается, что у вас есть массив товаров с информацией о каждом

export const Catalog = ({ products, setProducts }) => {
  // const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const winesURL = "http://localhost:3000/wines";
  const [foundedValues, setFoundedValues] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [filterValue, setFilterValue] = useState([]);
  const [filterIt, setFilterIt] = useState([]);
  const [isItemsFiltered, setIsItemsFiltered] = useState(false);
  useEffect(() => {
    fetch(winesURL)
      .then((data) => data.json())
      .then((wines) => setProducts(wines));
  }, []);
  const addToCart = (id) => {
    const item = products.find((product) => product.id === id);
    toast.success(`Позиция ${item.title} добавлена в корзину.`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setTimeout(() => {
      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(item),
      });
    }, 500);
  };
  const onSearch = (event) => {
    event.preventDefault();
    if (searchValue) {
      const items = products.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFoundedValues(items);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };
  const sortProducts = () => {
    setProducts((prevProducts) => {
      return [...prevProducts].sort((a, b) => {
        return a.title.localeCompare(b.title, ["ru", "en"]);
      });
    });
  };

  useEffect(() => {
    if (filterValue.length > 0) {
      const filtered = filterValue.map((v) => v.value);
      const filteredItems = products.filter((prod) =>
        filtered.some((filter) => prod.type.includes(filter))
      );
      setFilterIt(filteredItems);
    }
    setIsItemsFiltered(filterValue.length > 0);
  }, [filterValue]);
  useEffect(() => console.log(filterIt), [filterIt]);

  const sortByPrice = () => {
    setProducts((prevProducts) => {
      return [...prevProducts].sort((a, b) => a.numprice - b.numprice);
    });
  };
  const options = [
    { value: "Сухое", label: "Сухое" },
    { value: "Сладкое", label: "Сладкое" },
    { value: "Полусухое", label: "Полусухое" },
    { value: "Полусладкое", label: "Полусладкое" },
  ];

  const onFilterChange = (selectedOptions) => {
    setFilterValue(selectedOptions);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: "#4b2a25",
      boxShadow: "none",
      "&:hover": { borderColor: "#2f1c16" },
      width: "100%", // Устанавливаем ширину элемента управления равной 100%
      margin: "0 auto", // Центрируем элемент управления
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%", // Устанавливаем ширину меню равной 100%
      margin: "0 auto", // Центрируем меню
      // Убедитесь, что контейнер для menu и control имеет фиксированную или максимальную ширину
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#4b2a25" : "white",
      "&:hover": {
        backgroundColor: "#2f1c16",
        color: "white",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#4b2a25",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      "&:hover": {
        backgroundColor: "#2f1c16",
        color: "white",
      },
    }),
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

        <div className="search">
          <form onSubmit={(event) => onSearch(event)}>
            <input
              type="text"
              placeholder="Поиск"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                if (!event.target.value) {
                  setIsSearching(false);
                }
              }}
            />
            <button type="submit">Искать</button>
          </form>
        </div>
        <div className="filter">
          <Select
            isMulti
            options={options}
            defaultValue={[options[0]]}
            placeholder="Фильтр"
            onChange={onFilterChange}
            value={filterValue}
            styles={customStyles}
          />
        </div>
        <div className="sort-buttons">
          <button type="button" onClick={sortProducts} className="sort-button">
            Сортировать по алфавиту
          </button>
          <button type="button" onClick={sortByPrice} className="sort-button">
            Сортировать по цене
          </button>
        </div>

        <div className="catalog">
          {!isSearching &&
            !isItemsFiltered &&
            products.map((product) => (
              <Card key={product.id} style={{ width: "18rem", margin: "1rem" }}>
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <div className="price">{product.price}</div>
                  <Button
                    variant="primary"
                    onClick={() => addToCart(product.id)}
                  >
                    Добавить в корзину
                  </Button>
                  <Button variant="primary">
                    <Link to={`/wine/${product.id}`}>Подробная информация</Link>
                  </Button>
                </Card.Body>
              </Card>
            ))}
          {isItemsFiltered &&
            filterIt.map((value) => (
              <Card key={value.id} style={{ width: "18rem", margin: "1rem" }}>
                <Card.Img variant="top" src={value.imageUrl} />
                <Card.Body>
                  <Card.Title>{value.title}</Card.Title>
                  <Card.Text>{value.description}</Card.Text>
                  <div className="price">{value.price}</div>
                  <Button variant="primary" onClick={() => addToCart(value.id)}>
                    Добавить в корзину
                  </Button>
                  <Button variant="primary">
                    <Link to={`/wine/${value.id}`}>Подробная информация</Link>
                  </Button>
                </Card.Body>
              </Card>
            ))}
          {isSearching &&
            !isItemsFiltered &&
            foundedValues.map((value) => (
              <Card key={value.id} style={{ width: "18rem", margin: "1rem" }}>
                <Card.Img variant="top" src={value.imageUrl} />
                <Card.Body>
                  <Card.Title>{value.title}</Card.Title>
                  <Card.Text>{value.description}</Card.Text>
                  <div className="price">{value.price}</div>
                  <Button variant="primary" onClick={() => addToCart(value.id)}>
                    Добавить в корзину
                  </Button>
                  <Button variant="primary">
                    <Link to={`/wine/${value.id}`}>Подробная информация</Link>
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </div>
        <footer className="footer">
          <p>&copy; 2024 Wine Boutique. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};
