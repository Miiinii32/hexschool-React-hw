import axios from "axios";
import { useEffect, useState } from "react";
import { apiPATH, apiURL } from "../api/api";
import { Outlet, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${apiURL}/v2/api/${apiPATH}/products/all`);
        console.log(res.data.products);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error.response);
      }
    };
    getProducts();
  }, []);

  const handleOpenDetail = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <>
      <div className="container py-4 products-page">
        <header className="nav d-flex justify-content-between py-4 mb-5">
          <div className="d-flex align-items-end ">
            <h1 className="fs-2 fw-bold title ">Products</h1>
            <span className="fs-4 fw-medium ms-5 pb-1 subtitle">
              {products.length} items
            </span>
          </div>
          <button
            type="button"
            className="btn primary-btn"
            onClick={() => {
              setProducts(initialProducts);
            }}
          >
            重新載入完整商品
          </button>
        </header>
        <main>
          <div className="row">
            <ul>
              {products.map((product) => {
                return (
                  <li
                    className="d-flex justify-content-between align-items-center mb-5"
                    key={product.id}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="list-pic"
                    />

                    <div className="py-5 border-bottom-gray w-100">
                      <div className="d-flex justify-content-between mb-3">
                        <div className=" d-flex align-items-center">
                          <h5 className="fs-4 fw-medium">{product.title}</h5>
                          <span className="d-inline-block badge badge-gray ms-2">
                            {product.category}
                          </span>
                        </div>
                        <h5 className="fs-4 fw-medium ">{`$${product.price}`}</h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-end">
                        <div>
                          <p className="fs-6 mb-2 lh-base">
                            <span className=" d-inline-block fw-medium badge badge-line me-2">
                              內容
                            </span>
                            {product.content}
                          </p>
                          <p className="fs-6 lh-base">
                            <span className=" d-inline-block fw-medium badge badge-line me-2">
                              介紹
                            </span>
                            {product.description}
                          </p>
                        </div>
                        <div className="d-flex gap-3">
                          <button
                            type="button"
                            className="btn primary-btn"
                            // data-bs-toggle="offcanvas"
                            // data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            onClick={() => handleOpenDetail(product.id)}
                          >
                            查看商品
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
      <Outlet />
    </>
  );
}

export default Products;
