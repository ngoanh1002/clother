import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Breadcrumb, Drawer, Dropdown, Space, notification } from "antd";
import {
  FilterOutlined,
  DownOutlined,
  RightOutlined,
  ShoppingOutlined,
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { formattedPrice } from "../assets/js/api";
import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import "../assets/css/loader.css";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const Products = () => {
  const [sortingLabel, setSortingLabel] = useState("Sorting");
  const [open, setOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const [currentFilterType, setCurrentFilterType] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");

  const { products, findProductById } = useAppContext();
  const { handleAddItem } = useCartContext();

  const filteredProducts = () => {
    if (currentFilter === "" && currentFilterType === "" && sort === "")
      return products;
    const filterProducts = products.filter((product) => {
      if (currentFilterType === "category") {
        return product.category === currentFilter;
      } else if (currentFilterType === "size") {
        return product.size === currentFilter;
      } else if (currentFilterType === "color") {
        return product.color === currentFilter;
      }
      return true;
    });

    if (sort === "Alphabetically, A-Z") {
      return filterProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Price, low to high") {
      return filterProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "Price, high to low") {
      return filterProducts.sort((a, b) => b.price - a.price);
    }
    return filterProducts;
  };

  const handleFilter = ({ type, params }) => {
    setLoading(true);
    document.body.classList.add("overflow-hidden");
    setTimeout(() => {
      setLoading(false);
      setCurrentFilter(params);
      setCurrentFilterType(type);
      document.body.classList.remove("overflow-hidden");
    }, 800);
  };

  const items = [
    {
      label: "Default Sorting",
      key: "1",
    },
    {
      label: "Alphabetically, A-Z",
      key: "2",
    },
    {
      label: "Price, low to high",
      key: "3",
    },
    {
      label: "Price, high to low",
      key: "4",
    },
  ];

  const handleSortingLabel = (label) => {
    setSortingLabel(label);
    setSort(label);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleQuickview = (id) => {
    const pro = findProductById(id);
    setCurrentImg(pro.images);
    document.body.classList.add("overflow-hidden");
    setShowImage(true);
  };
  const handleCloseImg = () => {
    setShowImage(false);
    document.body.classList.remove("overflow-hidden");
  };

  const openNotification = (product, qty) => {
    notification.success({
      message: "Successful Purchase",
      description: (
        <div className="description-alert">
          <div
            className="alert-img"
            style={{ backgroundImage: `url('${product.thumbnail}')` }}
          ></div>
          <p>
            <b>{product.name} </b>
            <span> X {qty}</span>
          </p>
        </div>
      ),
      icon: (
        <ShoppingCartOutlined
          style={{
            color: "#00FF5F",
          }}
        />
      ),
      duration: 1,
    });
    notification.config({
      placement: "bottomRight",
      bottom: 50,
    });
  };
  const onAddItem = (id, qty) => {
    const product = findProductById(id);
    handleAddItem(id, qty);
    openNotification(product, qty);
  };

  return (
    <section>
      <div className="breadcrumb">
        <h1 className="breadcrumb-title">Products</h1>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Products",
            },
          ]}
        />
      </div>
      <div className="container">
        <div className="filter-container">
          <div className="filter">
            <button onClick={showDrawer}>
              <FilterOutlined />
              Filter
            </button>
            <Drawer
              placement="left"
              onClose={onClose}
              width={300}
              title="Filter"
              open={open}
            >
              <div className="filter-side-bar">
                <div className="item">
                  <div className="item-title">
                    <h2>Categories</h2>
                  </div>
                  <ul>
                    <li
                      className={`cate ${
                        currentFilter === "Featured" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleFilter({
                          type: "category",
                          params: "Featured",
                        });
                        onClose();
                      }}
                    >
                      <RightOutlined />
                      Featured
                    </li>
                    <li
                      className={`cate ${
                        currentFilter === "Top Seller" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleFilter({
                          type: "category",
                          params: "Top Seller",
                        });
                        onClose();
                      }}
                    >
                      <RightOutlined />
                      Top Seller
                    </li>
                    <li
                      className={`cate ${
                        currentFilter === "Latest" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleFilter({
                          type: "category",
                          params: "Latest",
                        });
                        onClose();
                      }}
                    >
                      <RightOutlined />
                      Latest
                    </li>
                  </ul>
                </div>
                <div className="item">
                  <div className="item-title">
                    <h2>Size</h2>
                  </div>
                  <ul className="size">
                    <li>
                      <button
                        className={currentFilter === "S" ? "active" : ""}
                        onClick={() => {
                          handleFilter({
                            type: "size",
                            params: "S",
                          });
                          onClose();
                        }}
                      >
                        S
                      </button>
                    </li>
                    <li>
                      <button
                        className={currentFilter === "M" ? "active" : ""}
                        onClick={() => {
                          handleFilter({
                            type: "size",
                            params: "M",
                          });
                          onClose();
                        }}
                      >
                        M
                      </button>
                    </li>
                    <li>
                      <button
                        className={currentFilter === "L" ? "active" : ""}
                        onClick={() => {
                          handleFilter({
                            type: "size",
                            params: "L",
                          });
                          onClose();
                        }}
                      >
                        L
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="item">
                  <div className="item-title">
                    <h2>Color</h2>
                  </div>
                  <ul className="flex">
                    <li>
                      <button
                        className={`color ${
                          currentFilter === "Black" ? "active" : ""
                        }`}
                        style={{ backgroundColor: "black" }}
                        onClick={() => {
                          handleFilter({
                            type: "color",
                            params: "Black",
                          });
                          onClose();
                        }}
                      ></button>
                    </li>
                    <li>
                      <button
                        className={`color ${
                          currentFilter === "Blue" ? "active" : ""
                        }`}
                        style={{ backgroundColor: "blue" }}
                        onClick={() => {
                          handleFilter({
                            type: "color",
                            params: "Blue",
                          });
                          onClose();
                        }}
                      ></button>
                    </li>
                    <li>
                      <button
                        className={`color ${
                          currentFilter === "White" ? "active" : ""
                        }`}
                        style={{ backgroundColor: "white" }}
                        onClick={() => {
                          handleFilter({
                            type: "color",
                            params: "White",
                          });
                          onClose();
                        }}
                      ></button>
                    </li>
                  </ul>
                </div>
                <button
                  className="clear-filter"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      setCurrentFilter("");
                      setCurrentFilterType("");
                      onClose();
                    }, 500);
                  }}
                >
                  Clear Filtered
                </button>
              </div>
            </Drawer>
          </div>
          <div className="sorting">
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) =>
                  handleSortingLabel(
                    items.find((item) => item.key === key)?.label ||
                      "Default Sorting"
                  ),
              }}
              trigger={"click"}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {sortingLabel}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="products-container">
          {filteredProducts().map((product) => (
            <div key={product.id} className="products">
              <Link to={`/products/${product.id}`}>
                <div
                  className="img"
                  style={{ backgroundImage: `url(${product.thumbnail})` }}
                ></div>
              </Link>
              <div className="content">
                <Link to={`/products/${product.id}`}>
                  <h4>{product.name}</h4>
                </Link>
                <p>{formattedPrice(product.price)}</p>
              </div>
              <div className="menu">
                <div
                  className="icon"
                  onClick={() => onAddItem(product.id, product.quantity)}
                >
                  <ShoppingOutlined title="Add To Cart" />
                </div>
                <div
                  className="icon"
                  onClick={() => handleQuickview(product.id)}
                >
                  <SearchOutlined title="Quickview" />
                </div>
                <Link to={"/wishlist"} id="wishlist-btn">
                  <div className="icon">
                    <HeartOutlined title="Add To Wishlist" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showImage ? (
        <div className="img-quickview-container">
          <div className="img-quickview">
            <MDBCarousel showControls dark>
              <MDBCarouselItem
                itemId={1}
                className="d-block w-100"
                src={currentImg[0]}
                alt="..."
              />
              <MDBCarouselItem
                itemId={2}
                className="d-block w-100"
                src={currentImg[1]}
                alt="..."
              />
            </MDBCarousel>
            <div className="close-image" onClick={handleCloseImg}>
              <CloseOutlined />
            </div>
          </div>
        </div>
      ) : null}
      {loading ? (
        <div className="img-quickview-container">
          <span className="loader-1"></span>
        </div>
      ) : null}
    </section>
  );
};

export default Products;
