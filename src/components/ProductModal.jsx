function ProductModal({
  setIsOpenModal,
  modalType,
  templateProduct,
  handleModalInputChange,
  handleModalImgChange,
  handleAddImage,
  handleDeleteImage,
  deleteProduct,
  UpdateProduct,
  uplaodImg,
}) {
  return (
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
                <span className="text-danger">{templateProduct.title}</span>
                嗎？
              </p>
            ) : (
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-2">
                    <div className="mb-3">
                      <label htmlFor="uplaodImg" className="form-label">
                        上傳圖片
                      </label>
                      <input
                        type="file"
                        id="uplaodImg"
                        name="uplaodImg"
                        className="form-control"
                        placeholder="請上傳圖片"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => {
                          uplaodImg(e);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
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
                          <label htmlFor="imageUrl" className="form-label">
                            輸入圖片網址
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`圖片網址${index + 1}`}
                            value={img}
                            onChange={(e) =>
                              handleModalImgChange(index, e.target.value)
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
                      <label htmlFor="category" className="form-label">
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
                      <label htmlFor="origin_price" className="form-label">
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
                    <label htmlFor="description" className="form-label">
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
                      <label className="form-check-label" htmlFor="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="size" className="form-label">
                      尺寸
                    </label>
                    <select
                      name="size"
                      id="size"
                      className="form-control"
                      value={templateProduct.size}
                      onChange={(e) => handleModalInputChange(e)}
                    >
                      <option value="">請選擇尺寸</option>
                      <option value="l">大碗</option>
                      <option value="m">中碗</option>
                      <option value="s">小碗</option>
                    </select>
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
  );
}
export default ProductModal;
