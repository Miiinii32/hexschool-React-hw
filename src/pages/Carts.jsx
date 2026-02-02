import axios from "axios";
import { useEffect, useState } from "react";
import { apiPATH, apiURL } from "../api/api";

function Carts() {
  const [cartData, setCartData] = useState([]);

  const getCart = async () => {
    try {
      const res = await axios.get(`${apiURL}/v2/api/${apiPATH}/cart`);
      console.log(res.data.data);
      setCartData(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  const deleteCart = async (id) => {
    try {
      const res = await axios.delete(`${apiURL}/v2/api/${apiPATH}/cart/${id}`);
      console.log(res.data);
      getCart();
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteCarts = async () => {
    try {
      const res = await axios.delete(`${apiURL}/v2/api/${apiPATH}/carts`);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const changeCarts = async (qty, cartID, productID) => {
    try {
      const cartData = {
        data: {
          product_id: productID,
          qty: Number(qty),
        },
      };
      const res = await axios.put(
        `${apiURL}/v2/api/${apiPATH}/cart/${cartID}`,
        cartData,
      );
      console.log(res.data);
      getCart();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container cart-page">
      <h2>購物車列表</h2>
      <div className="text-end mt-4">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={deleteCarts}
        >
          清空購物車
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">品名</th>
            <th scope="col">數量/單位</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          {cartData?.carts?.map((cart) => (
            <tr key={cart.id}>
              <th>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteCart(cart.id)}
                >
                  刪除
                </button>
              </th>
              <td>{cart.product.title}</td>
              <td>
                <div class="input-group input-group-sm mb-3">
                  <input
                    type="number"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    value={cart.qty}
                    onChange={(e) =>
                      changeCarts(e.target.value, cart.id, cart.product.id)
                    }
                  />
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    個
                  </span>
                </div>
              </td>
              <td>{cart.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end" colSpan="3">
              總計
            </td>
            <td>{cartData.final_total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Carts;
