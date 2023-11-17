import { Breadcrumb, Image, Table } from "antd";
import { useCartContext } from "../hooks/useCartContext";
import { formattedPrice } from "../assets/js/api";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { totalItems, items } = useCartContext();
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
  const currentDate = new Date();
  const minDate = currentDate.toISOString().split("T")[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    localStorage.setItem("order", JSON.stringify(data));
    window.location.pathname = "/confirm";
  };
  return (
    <section className="checkout-page">
      <div className="container">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Check Out",
            },
          ]}
        />
      </div>
      <div className="checkout_page">
        <form>
          <div className="container checkout_obj">
            <div className="information">
              <div className="delivery">
                <h3>Delivery</h3>
                <div className="list">
                  <div className="item">
                    <label htmlFor="name">
                      <p>Full Name</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input"
                      defaultValue={order.Name}
                      {...register("Name", {
                        required: true,
                        maxLength: 100,
                      })}
                      placeholder="Full Name"
                      aria-invalid={errors.Name ? "true" : "false"}
                    />
                    {errors.Name?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        Full name can not be left blank.
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="phone">
                      <p>Phone Number</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="input"
                      defaultValue={order.Phone}
                      {...register("Phone", {
                        required: true,
                        pattern: /^[0-9]{10}$/,
                      })}
                      aria-invalid={errors.Phone ? "true" : "false"}
                      placeholder="Phone Number"
                    />
                    {errors.Phone?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        Phone number can not be left blank.
                      </p>
                    )}
                    {errors.Phone?.type === "pattern" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        The phone number is not in the correct format.
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="email">
                      <p>Email</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="email"
                      aria-invalid={errors.Email ? "true" : "false"}
                      defaultValue={order.Email}
                      className="input"
                      {...register("Email", {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      placeholder="Email"
                    />
                    {errors.Email?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        Email can not be left blank.
                      </p>
                    )}
                    {errors.Email?.type === "pattern" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        The email is not in the correct format.
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="district">
                      <p>District</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="district"
                      aria-invalid={errors.District ? "true" : "false"}
                      defaultValue={order.District}
                      className="input"
                      {...register("District", {
                        required: true,
                        maxLength: 100,
                      })}
                      placeholder="District"
                    />
                    {errors.District?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        District can not be left blank.
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="address">
                      <p>Address</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      aria-invalid={errors.Address ? "true" : "false"}
                      defaultValue={order.Address}
                      id="address"
                      {...register("Address", {
                        required: true,
                        maxLength: 100,
                      })}
                      className="input"
                      placeholder="Address"
                    />
                    {errors.Address?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        Address can not be left blank.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="schedule">
                <h3>Schedule</h3>
                <div className="list">
                  <div className="item">
                    <label htmlFor="dates">
                      <p>Date</p>
                    </label>
                    <input
                      type="date"
                      id="dates"
                      {...register("Date")}
                      className="input"
                      min={minDate}
                      defaultValue={order.Date ? order.Date : minDate}
                    />
                  </div>
                  <div className="item">
                    <label htmlFor="note">
                      <p>Note</p>
                    </label>
                    <textarea
                      type="text"
                      id="note"
                      {...register("note")}
                      className="input"
                      defaultValue={order.note}
                    />
                  </div>
                </div>
              </div>
              <div className="method">
                <h3>Payment</h3>
                <div className="list">
                  <div className="method_item">
                    <label htmlFor="item1" className="item">
                      <input
                        type="radio"
                        id="item1"
                        name="method"
                        defaultValue="online_payment"
                        {...register("payment", {
                          required: true,
                        })}
                        defaultChecked={
                          order.payment === "online_payment" ? true : false
                        }
                      />
                      <label htmlFor="item1" className="check-box" />
                      <p>Online Payment</p>
                    </label>
                  </div>
                  <div className="method_item">
                    <label htmlFor="item2" className="item">
                      <input
                        type="radio"
                        id="item2"
                        name="method"
                        defaultValue="on_delivery"
                        {...register("payment", {
                          required: true,
                        })}
                        defaultChecked={
                          order.payment === "on_delivery" ? true : false
                        }
                      />
                      <label className="check-box" htmlFor="item2" />
                      <p>Cash on Delivery</p>
                    </label>
                  </div>
                  {errors.payment?.type === "required" && (
                    <p style={{ color: "red" }}>Chose your payment details.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="order">
              <h3>Shopping Cart</h3>
              <div className="order_item">
                <div className="cake">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size="small"
                  />
                </div>
                <div style={{ marginTop: "auto", marginRight: 16 }}>
                  <div className="item">
                    <p>Subtotal : </p>
                    <span className="ttbill">{formattedPrice(totalPrice)}</span>
                  </div>
                  <div className="item">
                    <div>
                      <p>Shipping : </p>
                      <p
                        style={{
                          fontSize: 11,
                          fontStyle: "italic",
                          marginTop: 4,
                        }}
                      >
                        (Free shipping when purchasing from 2 products)
                      </p>
                    </div>
                    <span className="ship">
                      {formattedPrice(shippingPrice)}
                    </span>
                  </div>
                  <div className="hr-container">
                    <div className="hr-line" />
                  </div>
                  <div className="item">
                    <h4>Total:</h4>
                    <span className="allbill" style={{ fontWeight: "bold" }}>
                      {formattedPrice(totalPrice + shippingPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="check_out">
                <button
                  className="confirm"
                  style={{ cursor: "pointer" }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Check Out
                  <div className="triangle-top-right" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
