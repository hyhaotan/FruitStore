import { memo, useEffect, useState } from "react";
import "./style.scss";
import { formater } from "utils/formater";

const STATUS = {
  ORDERED: {
    key: "ORDERED",
    lable: "Đã đặt",
    className: "orders_dropdown-item",
  },
  PREPARING: {
    key: "PREPARING",
    lable: "Lên đơn",
    className: "orders_dropdown-item",
  },
  DIVIVERED: {
    key: "DIVIVERED",
    lable: "Đã giao hàng",
    className: "orders_dropdown-item",
  },
  CANCELLED: {
    key: "CANCELLED",
    lable: "Hủy đơn",
    className: "orders_dropdown-item orders_dropdown-item-danger",
  },
};

const OrderPage = () => {
  const orders = [
    {
      id: 1,
      total: 100000,
      customerName: "John",
      date: "2021-10-10",
      status: "Đang lên đơn",
    },
    {
      id: 2,
      total: 100000,
      customerName: "John",
      date: "2021-10-10",
      status: "Đang lên đơn",
    },
  ];

  const [activedDropdown, setactivedDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutsice = (event) => {
      const isDropdown = event.target.closest(".orders_dropdown");
      if (!isDropdown) {
        setactivedDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsice);
    return () => document.removeEventListener("mousedown", handleClickOutsice);
  }, []);

  return (
    <div className="container">
      <div className="orders">
        <h2>Quản lý đơn hàng</h2>
        <div className="orders_content">
          <table className="orders_table">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Tổng đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, i) => (
                <tr key={i}>
                  <td>
                    <span>{item.id}</span>
                  </td>
                  <td>{formater(item.total)}</td>
                  <td>{item.customerName}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>
                    <div className="orders_dropdown">
                      <button
                        className={`orders_action-button`}
                        onClick={() => setactivedDropdown(item.id)}
                      >
                        Đã đặt
                        <span className="arrow">▽</span>
                      </button>
                      {activedDropdown === item.id && (
                        <div className="orders_dropdown-menu">
                          {Object.values(STATUS).map((status) => (
                            <button
                              key={status.key}
                              className={status.className}
                              onClick={() => setactivedDropdown(null)}
                            >
                              {status.lable}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="orders_footer">
          <div className="orders__pagination">
            <div className="orders_page-numbers">
              <button className="orders_page-btn">-</button>
              <button className="orders_page-btn orders_page-btn--active">
                1
              </button>
              <button className="orders_page-btn">2</button>
              <button className="orders_page-btn">3</button>
              <button className="orders_page-btn">4</button>
              <button className="orders_page-btn">5</button>
              <button className="orders_page-btn">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderPage);
