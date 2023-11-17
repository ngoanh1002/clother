import { Breadcrumb, Image, Modal, Table } from "antd";
import { Link } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { formattedPrice } from "../assets/js/api";
import { useState } from "react";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrnentId] = useState("");
  const { totalItems, items, handleRemoveItem, handleUpdateItem } =
    useCartContext();

  let totalPrice = 0;
  for (let i = 0; i < totalItems; i++) {
    totalPrice += items[i].product.price * items[i].quantity;
  }
  const handleQuantity = ({ type, params }) => {
    let currentQuantity = params.quantity;
    if (type === "minus") {
      if (params.quantity > 1) {
        currentQuantity = params.quantity - 1;
        handleUpdateItem(params.id, currentQuantity);
      } else {
        document.querySelector(`.id_${params.id}`).classList.add("disabled");
      }
    } else if (type === "plus") {
      currentQuantity = params.quantity + 1;
      handleUpdateItem(params.id, currentQuantity);
      document.querySelector(`.id_${params.id}`).classList.remove("disabled");
    }
  };
  const dataSource = items.map((item) => ({
    key: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    img: item.product.thumbnail,
    total: item.product.price * item.quantity,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="cart-table">
          <Image src={record.img} width={100} />
          <Link to={`/products/${record.key}`}>
            <b>{record.name}</b>
          </Link>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => formattedPrice(record.price),
      responsive: ["md"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) => (
        <>
          <div className="js-qty">
            <button
              className={`qty_minus id_${record.key}`}
              onClick={() =>
                handleQuantity({
                  type: "minus",
                  params: { id: record.key, quantity: record.quantity },
                })
              }
            >
              <CaretDownOutlined />
            </button>
            <span className="qty-input">{record.quantity}</span>
            <button
              className="qty_plus"
              onClick={() =>
                handleQuantity({
                  type: "plus",
                  params: { id: record.key, quantity: record.quantity },
                })
              }
            >
              <CaretUpOutlined />
            </button>
          </div>
        </>
      ),
      key: "quantity",
      width: 100,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, record) => formattedPrice(record.total),
      width: 100,
    },
    {
      title: "Delete",
      key: "id",
      render: (text, record) => (
        <DeleteOutlined
          style={{ fontSize: "20px", color: "#444" }}
          onClick={() => showModal(record.key)}
        />
      ),
      width: 80,
      align: "center",
    },
  ];
  const showModal = (id) => {
    setOpen(true);
    setCurrnentId(id);
  };
  const handleOk = () => {
    handleRemoveItem(currentId);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <section className="cart-page">
      <Modal
        title="Delete?"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you want to remove this product?</p>
      </Modal>
      <div className="container">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Your Shopping Cart",
            },
          ]}
        />
        {totalItems ? (
          <div className="cart-products">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered
            />
            <div className="check-out">
              <div className="total">
                <h4>Total</h4>
                <b>{formattedPrice(totalPrice)}</b>
              </div>
              <Link to="/checkout">
                <button className="check-out-btn submit">
                  Proceed to checkout
                  <div className="triangle-top-right" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="no-results">
            <h1>Your cart is currently empty.</h1>
            <p>
              Continue browsing <Link to={"/products"}>here</Link>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
