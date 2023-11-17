import { Link, NavLink } from "react-router-dom";
import "../assets/css/header.css";
import {
  BarsOutlined,
  HeartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useCartContext } from "../hooks/useCartContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const { totalItems } = useCartContext();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <header className={`${fixed ? "fixed-top" : ""}`}>
      <div className="container">
        <div className="header">
          <div className="nav-mobile">
            <BarsOutlined onClick={showDrawer} />
            <Drawer
              placement="left"
              onClose={onClose}
              width={300}
              title="Menu"
              open={open}
            >
              <div className="nav-bar-mobile">
                <Link to="/" onClick={onClose}>
                  <img src="/NNA1.svg" alt="logo" />
                </Link>
                <NavLink className="nav-item" to={"/"} onClick={onClose}>
                  Home
                </NavLink>
                <NavLink
                  className="nav-item"
                  to={"/products"}
                  onClick={onClose}
                >
                  Products
                </NavLink>
                <NavLink className="nav-item" to={"/blog"} onClick={onClose}>
                  Blog
                </NavLink>
              </div>
            </Drawer>
          </div>
          <div className="logo">
            <Link to="/">
              <img src="/NNA1.svg" alt="logo" />
            </Link>
          </div>
          <div className="nav-bar">

            <NavLink className="nav-item" to={"/"}>
              Home
            </NavLink>
            <NavLink className="nav-item" to={"/products"}>
              Products
            </NavLink>
            <NavLink className="nav-item" to={"/blog"}>
              Blog
            </NavLink>
          </div>
          <div className="action">
            <div className="login">
              <NavLink to="/wishlist">
                <HeartOutlined />
              </NavLink>
              <NavLink to="/login">
                <UserOutlined />
              </NavLink>
            </div>
            <div className="cart">
              <NavLink to="/cart">
                <ShoppingOutlined />
                {totalItems ? (
                  <span className="cart-quantity">{totalItems}</span>
                ) : (
                  ""
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
