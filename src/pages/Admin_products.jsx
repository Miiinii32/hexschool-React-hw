import { useEffect, useState } from "react";
import axios from "axios";
import { apiPATH, apiURL } from "../api/api";
import { useNavigate } from "react-router-dom";

function Admin_products() {
  const [products, setProducts] = useState([]);
  const [detailTemplate, setDetailTemplate] = useState(null);
  const [ischecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLogin() {
      const burgerToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)burgerToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (!burgerToken) {
        navigate("/admin/login");
        return;
      } // 如果 token 沒有值就導向登入頁然後return

      axios.defaults.headers.common["Authorization"] = burgerToken;
      try {
        const res = await axios.post(`${apiURL}/v2/api/user/check`);
        console.log(res.data);
        setIsChecking(false);
      } catch (error) {
        console.log(error.response);
        navigate("/admin/login");
      }
    }
    checkLogin();
  }, [navigate]);

  useEffect(() => {
    if (!ischecking) {
      getProducts();
    }
    async function getProducts() {
      try {
        const res = await axios.get(
          `${apiURL}/v2/api/${apiPATH}/admin/products`
        );
        setProducts(res.data.products);
      } catch (error) {
        console.log(error.response);
      }
    }
  }, [ischecking]);

  return (
    <>
      {ischecking ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <h2 className="mb-4">後台產品列表</h2>
          <table className="table">
            <thead className="table-light">
              <tr>
                <th scope="col">商品</th>
                <th scope="col">分類</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">內容物</th>
                <th scope="col">啟用</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.category}</td>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.content}</td>
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        fill="currentColor"
                        className="bi bi-toggle-on"
                        viewBox="0 0 16 16"
                        style={{ color: "#67C23A" }}
                      >
                        <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                      </svg>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-2 black_bg_color"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setDetailTemplate(product);
                        }}
                      >
                        查看
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-2 black_bg_color"
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm black_bg_color"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {detailTemplate?.title || "loading..."}
                  </h1>
                  <span className="badge text-bg-secondary ms-2 align-self-center">
                    {detailTemplate?.category || "loading..."}
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    src={detailTemplate?.imageUrl || "loading..."}
                    alt={detailTemplate?.title || "loading..."}
                    className="w-100 object-fit mb-3"
                  />
                  <p>{`編號：${detailTemplate?.id || "loading..."}`}</p>
                  <p>{`內容：${detailTemplate?.content || "loading..."}`}</p>
                  <p>{`介紹：${
                    detailTemplate?.description || "loading..."
                  }`}</p>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          配餐照片
                        </button>
                      </h2>

                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {/* {detailTemplate?.imagesUrl.map((img, index) => {
                          return (
                            <img
                              src={img}
                              alt={index}
                              key={index}
                              className="w-100 object-fit mb-3"
                            />
                          );
                        })} */}
                          <img
                            src={detailTemplate?.imagesUrl[0]}
                            alt={detailTemplate?.title}
                            className="w-100 object-fit mb-3"
                          />
                          <img
                            src={detailTemplate?.imagesUrl[1]}
                            alt={detailTemplate?.title}
                            className="w-100 object-fit mb-3"
                          />
                          <img
                            src={detailTemplate?.imagesUrl[2]}
                            alt={detailTemplate?.title}
                            className="w-100 object-fit mb-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary black_bg_color"
                    data-bs-dismiss="modal"
                  >
                    關閉
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin_products;
