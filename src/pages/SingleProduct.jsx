import axios from "axios";
import { useEffect, useState } from "react";
import { apiPATH, apiURL } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        const res = await axios.get(
          `${apiURL}/v2/api/${apiPATH}/product/${id}`,
        );
        console.log(res.data.product);
        setSingleProduct(res.data.product);
      } catch (error) {
        console.log(error.response);
      }
    };
    getDetailProduct();
  }, []);

  const handleCloseDetail = () => {
    navigate("/products");
  };

  const addCarts = async (id, qty = 1) => {
    const data = {
      data: {
        product_id: id,
        qty: qty,
      },
    };
    try {
      const res = await axios.post(`${apiURL}/v2/api/${apiPATH}/cart`, data);
      console.log(res.data);
      alert("已成功加入購物車");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="singleProducts-page modal d-block " tabindex="-1">
        <div className="modal-dialog ">
          <div className="modal-content rounded-0 p-4">
            <div className="modal-header border-bottom-black">
              <h5 className="modal-title fs-2 fw-bold title">Details</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseDetail}
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={singleProduct?.imageUrl}
                alt={singleProduct?.title}
                className="modal-pic mb-5"
              />
              <div className="d-flex justify-content-between mb-5">
                <div className="d-flex align-items-center">
                  <h5 className="fs-4 fw-medium">{singleProduct?.title}</h5>
                  <span class="d-inline-block badge badge-gray ms-2">
                    {singleProduct?.category}
                  </span>
                </div>
                <h5 className="fs-4 fw-medium ">{`$${singleProduct?.price}`}</h5>
              </div>
              <div className="d-flex flex-column gap-2">
                <p className="fs-6 mb-2 lh-base">
                  <span className=" d-inline-block fw-medium badge badge-line me-2 mb-1">
                    內容
                  </span>
                  {singleProduct?.content}
                </p>
                <p className="fs-6 lh-base">
                  <span className=" d-inline-block fw-medium badge badge-line me-2 mb-1">
                    介紹
                  </span>
                  {singleProduct?.description}
                </p>
              </div>
              {/* <div
                className="accordion accordion-flush border-bottom-black "
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      更多圖片
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <img
                        src={singleProduct?.imagesUrls[0]}
                        alt={singleProduct?.title}
                        className="w-100"
                      />
                      <img
                        src={singleProduct?.imagesUrls[1]}
                        alt={singleProduct?.title}
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn secondary-btn flex-fill"
                data-bs-dismiss="modal"
                onClick={handleCloseDetail}
              >
                關閉
              </button>
              <button
                type="button"
                className="btn primary-btn flex-fill"
                onClick={() => {
                  addCarts(id);
                }}
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
        <div className="backdrop" onClick={handleCloseDetail}></div>
      </div>
    </>
  );
}

export default SingleProduct;
