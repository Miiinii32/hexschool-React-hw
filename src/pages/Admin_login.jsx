import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../api/api";

function Admin_Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [ischecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  function handleLoginData(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }
  useEffect(() => {
    async function checkLogin() {
      const burgerToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)burgerToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common["Authorization"] = burgerToken;
      if (!burgerToken) {
        setIsChecking(false);
        return;
      } // 如果 token 沒有值就return，不戳check的api
      try {
        const res = await axios.post(`${apiURL}/v2/api/user/check`);
        console.log(res.data);
        navigate("/admin/products");
      } catch (error) {
        console.log(error.response);
        setIsChecking(false);
      }
    }
    checkLogin();
  }, [navigate]);

  async function login() {
    try {
      const res = await axios.post(`${apiURL}/v2/admin/signin`, loginData);
      const { token, expired } = res.data;
      document.cookie = `burgerToken=${token}; expires=${new Date(
        expired
      )}; path=/`;
      navigate("/admin/products");
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <div className="container-fluid">
        {ischecking ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-5 px-0">
              <img
                src="https://images.unsplash.com/photo-1632552544460-055cff0d29a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="後台登入頁圖片"
                className="w-100 vh-100 object-fit"
              />
            </div>
            <div className="col-7 d-flex justify-content-center align-items-center">
              <div style={{ width: "400px" }}>
                <div className="mb-5">
                  <h1 className="dusplay_en text-center">Mini Burger</h1>
                  <p className="text-secondary text-center">
                    請輸入帳密登入後台
                  </p>
                </div>
                <div className="mb-5">
                  {/* {JSON.stringify(loginData)} */}
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="username"
                      onChange={(e) => {
                        handleLoginData(e);
                      }}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => {
                        handleLoginData(e);
                      }}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100 black_bg_color p-3"
                  onClick={login}
                >
                  後台登入
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Admin_Login;
