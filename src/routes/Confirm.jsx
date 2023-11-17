import { Button, Image, Result, Table } from "antd";
import { formattedPrice } from "../assets/js/api";
import { useCartContext } from "../hooks/useCartContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Confirm = () => {
  const [isBank, setBank] = useState(1);
  const [isDone, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { totalItems, items, handleRemoveCart } = useCartContext();
  const order = JSON.parse(localStorage.getItem("order")) || {};

  let totalPrice = 0;
  let totolProducts = 0;
  let shippingPrice;
  for (let i = 0; i < totalItems; i++) {
    totalPrice += items[i].product.price * items[i].quantity;
    totolProducts += items[i].quantity;
    if (totolProducts >= 2) {
      shippingPrice = 0;
    } else {
      shippingPrice = Math.floor(0.15 * totalPrice);
    }
  }
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
          <Image
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: 80,
              marginRight: "10px",
            }}
            src={record.img}
          />
          <p>{record.name}</p>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => formattedPrice(record.price),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, record) => formattedPrice(record.total),
    },
  ];
  const handleConfirm = () => {
    setLoading(true);
    document.body.classList.add("overflow-hidden");
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 800);
  };
  const handleGoHomepage = () => {
    document.body.classList.remove("overflow-hidden");
    localStorage.clear();
    handleRemoveCart();
  };
  const handleContinueShopping = () => {
    document.body.classList.remove("overflow-hidden");
    handleRemoveCart();
  };
  return (
    <section className="confirm-page">
      <div className="container">
        {order.payment === "online_payment" && (
          <div className="bank-container">
            <div className="bank-wapper">
              <h2>Payment Guide</h2>
              <p className="bank-p">
                Please transfer payment to the following account and press the
                payment confirmation button.{" "}
                <b style={{ color: "#ff7245" }}>KarT</b> will call to confirm
                your order as soon as possible.
              </p>
              <hr />
              <h3>Choose a bank</h3>
              <label
                htmlFor="item1"
                className={`item ${isBank == 1 ? "active" : ""}`}
              >
                <input
                  type="radio"
                  id="item1"
                  name="bank"
                  defaultValue={1}
                  defaultChecked
                  onClick={(e) => setBank(e.target.value)}
                />
                <img
                  src="/bank/VIB.webp"
                  className={isBank == 1 ? "active" : ""}
                />
                <p>VIB Bank (International Bank)</p>
              </label>
              <label
                htmlFor="item2"
                className={`item ${isBank == 2 ? "active" : ""}`}
              >
                <input
                  type="radio"
                  id="item2"
                  name="bank"
                  defaultValue={2}
                  onClick={(e) => setBank(e.target.value)}
                />
                <img
                  src="/bank/MB.webp"
                  className={isBank == 2 ? "active" : ""}
                />
                <p>MB Bank (Military Bank)</p>
              </label>
              <hr />
              <h3>Transfer information</h3>
              <div className="bank_infor">
                <div className="bank_item">
                  <p>Bank</p>
                  <p className="bank_name">
                    {isBank == 1
                      ? "VIB Bank (International Bank)"
                      : "MB Bank (Military Bank)"}
                  </p>
                </div>
                <div className="bank_item">
                  <p>Account number</p>
                  <p className="bank_number">
                    {isBank == 1 ? 3336262999 : 66686869999}
                  </p>
                </div>
                <div className="bank_item">
                  <p>Account owner</p>
                  <p className="bank_account">
                    {isBank == 1 ? "Nguyen Van Thanh" : "Nguyen Gia Hung"}
                  </p>
                </div>
                <div className="bank_item">
                  <p>Amount of money</p>
                  <p>{formattedPrice(shippingPrice + totalPrice)}</p>
                </div>
                <div className="bank_item">
                  <p>Content</p>
                  <p>
                    {order.Name} {order.Phone}
                  </p>
                </div>
              </div>
              <hr />
              <p className="bank-p2">
                If you have any questions or need support, please contact the
                hotline:{" "}
                <span style={{ textDecoration: "underline" }}>
                  024 0994 8888
                </span>{" "}
                (9am-9pm)
              </p>
            </div>
          </div>
        )}
        <div className="product-container">
          <h2>Your Order</h2>
          <div className="order">
            <div className="order_item">
              <p style={{ textDecoration: "underline" }}>Client</p>
              <p>{order.Name}</p>
            </div>
            <div className="order_item">
              <p style={{ textDecoration: "underline" }}>Phone number</p>
              <p>{order.Phone}</p>
            </div>
            <div className="order_item">
              <p style={{ textDecoration: "underline" }}>Address</p>
              <p>
                {order.Address}, {order.District} District
              </p>
            </div>
            <div className="order_item">
              <p style={{ textDecoration: "underline" }}>Date</p>
              <p className="time_order">{order.Date}</p>
            </div>
            <div className="order_item">
              <p style={{ textDecoration: "underline" }}>Note</p>
              <p className="notes">{order.note}</p>
            </div>
          </div>
          <div className="order_products">
            <p style={{ textDecoration: "underline", marginBottom: 16 }}>
              Order
            </p>
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="small"
            bordered
          />
          {shippingPrice != 0 ? (
            <div className="price_item">
              <p style={{ textDecoration: "underline" }}>Shipping fee</p>
              <span>{formattedPrice(shippingPrice)}</span>
            </div>
          ) : null}
          <div className="price_item">
            <p
              style={{
                textDecoration: "underline",
                fontWeight: 700,
                color: "#ff7245",
              }}
            >
              Total money
            </p>
            <span style={{ fontWeight: 700, color: "#ff7245" }}>
              {formattedPrice(totalPrice + shippingPrice)}
            </span>
          </div>
          <button className="submit" onClick={handleConfirm}>
            Payment confirmation
            <div className="triangle-top-right" />
          </button>
        </div>
      </div>
      {isDone ? (
        <div className="overlay">
          <Result
            status="success"
            title="Successfully Purchased!"
            subTitle={`Order number: ${order.Phone} We will call to confirm
                your order in 1-5 minutes.`}
            extra={[
              <Button type="primary" key="home" onClick={handleGoHomepage}>
                <Link to="/">Go to homepage</Link>
              </Button>,
              <Button key="buy" onClick={handleContinueShopping}>
                <Link to={"/products"}>Continue shopping</Link>
              </Button>,
            ]}
          />
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

export default Confirm;
