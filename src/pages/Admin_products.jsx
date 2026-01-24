import { useEffect, useState } from "react";
import axios from "axios";
import { apiPATH, apiURL } from "../api/api";
import { useNavigate } from "react-router-dom";

const INITIAL_TEMPLATE_DATA = {
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  is_enabled: false,
  imageUrl: "",
  imagesUrl: [],
};

function Admin_products() {
  const [products, setProducts] = useState([]);
  const [detailTemplate, setDetailTemplate] = useState(null);
  const [ischecking, setIsChecking] = useState(true);
  const [modalType, setModalType] = useState("");
  const [templateProduct, setTemplateProduct] = useState(INITIAL_TEMPLATE_DATA);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLogin() {
      const burgerToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)burgerToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
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
  }, [ischecking]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${apiURL}/v2/api/${apiPATH}/admin/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error.response);
    }
  };

  const openModal = (type, data) => {
    setIsOpenModal(true);
    setTemplateProduct((pre) => ({ ...pre, ...data }));
    setModalType(type);
    console.log(data);
  };

  const handleModalInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    setTemplateProduct((pre) => ({
      ...pre,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(templateProduct);
  };

  const handleModalImgChange = (index, newValue) => {
    setTemplateProduct((pre) => {
      const newImg = [...pre.imagesUrl];
      newImg[index] = newValue;
      return {
        ...pre,
        imagesUrl: newImg,
      };
    });
  };

  const handleAddImage = () => {
    setTemplateProduct((pre) => {
      const newImg = [...pre.imagesUrl];
      newImg.push("");
      return {
        ...pre,
        imagesUrl: newImg,
      };
    });
  };

  const handleDeleteImage = () => {
    setTemplateProduct((pre) => {
      const newImg = [...pre.imagesUrl];
      newImg.pop();
      return {
        ...pre,
        imagesUrl: newImg,
      };
    });
  };

  const apiProductData = {
    data: {
      ...templateProduct,
      origin_price: Number(templateProduct.origin_price),
      price: Number(templateProduct.price),
      is_enabled: templateProduct.is_enabled ? 1 : 0,
      imagesUrl: [...templateProduct.imagesUrl.filter((img) => img !== "")],
    },
  };

  const UpdateProduct = async (id) => {
    let url;
    let method;
    if (modalType === "edit") {
      url = `${apiURL}/v2/api/${apiPATH}/admin/product/${id}`;
      method = "put";
    }
    if (modalType === "create") {
      url = `${apiURL}/v2/api/${apiPATH}/admin/product`;
      method = "post";
    }
    try {
      const res = await axios[method](url, apiProductData);
      console.log(res.data);
      setIsOpenModal(false);
      getProducts();
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `${apiURL}/v2/api/${apiPATH}/admin/product/${id}`,
      );
      console.log(res.data);
      getProducts();
      setIsOpenModal(false);
    } catch (error) {
      console.log(error.response);
    }
  };

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
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-4">後台產品列表</h2>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openModal("create", INITIAL_TEMPLATE_DATA)}
            >
              建立新產品
            </button>
          </div>

          <table className="table product_list">
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
                        style={
                          product.is_enabled
                            ? { color: "#67C23A" }
                            : { color: "#878787ff" }
                        }
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
                        onClick={() => openModal("edit", product)}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm black_bg_color"
                        onClick={() => openModal("delete", product)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/*產品詳細頁*/}
          <div
            className="modal"
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
          {/*新增編輯頁*/}
          {isOpenModal && (
            <>
              <div
                className="modal backdrop d-block"
                tabIndex="-1"
                aria-labelledby="editModalLabel"
                onClick={() => setIsOpenModal(false)}
              >
                <div
                  className="modal-dialog modal-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-content border-0">
                    <div
                      className={`modal-header ${modalType === "delete" ? "bg-danger" : "bg-dark"} text-white`}
                    >
                      <h5 id="productModalLabel" className="modal-title">
                        <span>
                          {modalType === "create"
                            ? "新增產品"
                            : modalType === "edit"
                              ? "編輯產品"
                              : "刪除產品"}
                        </span>
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setIsOpenModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      {modalType === "delete" ? (
                        <p className="fs-4">
                          確定要刪除
                          <span className="text-danger">
                            {templateProduct.title}
                          </span>
                          嗎？
                        </p>
                      ) : (
                        <div className="row">
                          <div className="col-sm-4">
                            <div className="mb-2">
                              <div className="mb-3">
                                <label
                                  htmlFor="imageUrl"
                                  className="form-label"
                                >
                                  輸入圖片網址
                                </label>
                                <input
                                  type="text"
                                  id="imageUrl"
                                  name="imageUrl"
                                  className="form-control"
                                  placeholder="請輸入圖片連結"
                                  value={templateProduct.imageUrl}
                                  onChange={(e) => handleModalInputChange(e)}
                                />
                              </div>
                              {templateProduct.imageUrl && (
                                <img
                                  className="img-fluid"
                                  src={templateProduct.imageUrl}
                                  alt="主圖"
                                />
                              )}
                            </div>
                            <div>
                              {templateProduct.imagesUrl.map((img, index) => {
                                return (
                                  <div key={index}>
                                    <label
                                      htmlFor="imageUrl"
                                      className="form-label"
                                    >
                                      輸入圖片網址
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={`圖片網址${index + 1}`}
                                      value={img}
                                      onChange={(e) =>
                                        handleModalImgChange(
                                          index,
                                          e.target.value,
                                        )
                                      }
                                    />
                                    {img && (
                                      <img
                                        className="img-fluid"
                                        src={img}
                                        alt={`副圖${index + 1}`}
                                      />
                                    )}
                                  </div>
                                );
                              })}

                              <button
                                className="btn btn-outline-primary btn-sm d-block w-100"
                                onClick={() => handleAddImage()}
                              >
                                新增圖片
                              </button>
                            </div>
                            <div>
                              <button
                                className="btn btn-outline-danger btn-sm d-block w-100"
                                onClick={() => handleDeleteImage()}
                              >
                                刪除圖片
                              </button>
                            </div>
                          </div>
                          <div className="col-sm-8">
                            <div className="mb-3">
                              <label htmlFor="title" className="form-label">
                                標題
                              </label>
                              <input
                                name="title"
                                id="title"
                                type="text"
                                className="form-control"
                                placeholder="請輸入標題"
                                value={templateProduct.title}
                                onChange={(e) => handleModalInputChange(e)}
                              />
                            </div>

                            <div className="row">
                              <div className="mb-3 col-md-6">
                                <label
                                  htmlFor="category"
                                  className="form-label"
                                >
                                  分類
                                </label>
                                <input
                                  name="category"
                                  id="category"
                                  type="text"
                                  className="form-control"
                                  placeholder="請輸入分類"
                                  value={templateProduct.category}
                                  onChange={(e) => handleModalInputChange(e)}
                                />
                              </div>
                              <div className="mb-3 col-md-6">
                                <label htmlFor="unit" className="form-label">
                                  單位
                                </label>
                                <input
                                  name="unit"
                                  id="unit"
                                  type="text"
                                  className="form-control"
                                  placeholder="請輸入單位"
                                  value={templateProduct.unit}
                                  onChange={(e) => handleModalInputChange(e)}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="mb-3 col-md-6">
                                <label
                                  htmlFor="origin_price"
                                  className="form-label"
                                >
                                  原價
                                </label>
                                <input
                                  name="origin_price"
                                  id="origin_price"
                                  type="number"
                                  min="0"
                                  className="form-control"
                                  placeholder="請輸入原價"
                                  value={templateProduct.origin_price}
                                  onChange={(e) => handleModalInputChange(e)}
                                />
                              </div>
                              <div className="mb-3 col-md-6">
                                <label htmlFor="price" className="form-label">
                                  售價
                                </label>
                                <input
                                  name="price"
                                  id="price"
                                  type="number"
                                  min="0"
                                  className="form-control"
                                  placeholder="請輸入售價"
                                  value={templateProduct.price}
                                  onChange={(e) => handleModalInputChange(e)}
                                />
                              </div>
                            </div>
                            <hr />

                            <div className="mb-3">
                              <label
                                htmlFor="description"
                                className="form-label"
                              >
                                產品描述
                              </label>
                              <textarea
                                name="description"
                                id="description"
                                className="form-control"
                                placeholder="請輸入產品描述"
                                value={templateProduct.description}
                                onChange={(e) => handleModalInputChange(e)}
                              ></textarea>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="content" className="form-label">
                                說明內容
                              </label>
                              <textarea
                                name="content"
                                id="content"
                                className="form-control"
                                placeholder="請輸入說明內容"
                                value={templateProduct.content}
                                onChange={(e) => handleModalInputChange(e)}
                              ></textarea>
                            </div>
                            <div className="mb-3">
                              <div className="form-check">
                                <input
                                  name="is_enabled"
                                  id="is_enabled"
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={templateProduct.is_enabled}
                                  onChange={(e) => handleModalInputChange(e)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="is_enabled"
                                >
                                  是否啟用
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => setIsOpenModal(false)}
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        className={`btn ${modalType === "delete" ? "btn-danger" : "btn-primary"}`}
                        onClick={() => {
                          modalType === "delete"
                            ? deleteProduct(templateProduct.id)
                            : UpdateProduct(templateProduct.id);
                        }}
                      >
                        {modalType === "delete" ? "刪除" : "確認"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Admin_products;
