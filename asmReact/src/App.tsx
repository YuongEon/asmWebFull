import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import './App.css'
import { Home, NotFound, Products } from "./pages";
import WebLayout from "./pages/layout/WebLayout";
import "antd/dist/reset.css";
import { IProduct } from "./types/products";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "./api/productMethod";
import ProductDetail from "./pages/ProductDetail";
import AdminLayout from "./pages/layout/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import AdminProducts from "./pages/admin/AdminProduct/ProductM/AdminProducts";
import AdminProductsAdd from "./pages/admin/AdminProduct/ProductM/AdminProductsAdd";
import { Category } from "./types/categoryType";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./api/categoryMethod";
import AdminProductsUpdate from "./pages/admin/AdminProduct/ProductM/AdminProductsUpdate";
import AdminCategories from "./pages/admin/AdminProduct/CategoryM/AdminCategories";
import AdminCategoriesAdd from "./pages/admin/AdminProduct/CategoryM/AdminCategoriesAdd";
import { AdminCategoriesUpdate } from "./pages/admin/AdminProduct/CategoryM/AdminCategoriesUpdate";
import { Alert, message, Space } from "antd";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { signin, signup } from "./api/userMethod";

const App: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [errorMess, setErrorMess] = useState([]);
  const [options, setOptions] = useState<{ [key: string]: any }>({});
  const [role, setRole] = useState<string>("");

  const userInformation = localStorage.getItem("user")

  useEffect(() => {
    userInformation && setRole(JSON.parse(userInformation).role)
  }, [userInformation])

  console.log(role);
  

  useEffect(() => {
    getAllProduct({ keyword: keyword, ...options }).then(({ data }) =>
      setProducts(data)
    );
  }, [keyword, options]);

  useEffect(() => {
    getAllCategory().then(({ data }) => setCategories(data));
  }, []);

  // product request
  const onHandleAddProduct = (product: IProduct) => {
    createProduct(product)
      .then(() =>
        getAllProduct({ keyword: "", _page: 1, _limit: 10 }).then(({ data }) =>
          setProducts(data)
        )
      )
      .then(() => navigate("/admin/products"))
      .catch((error) => {
        setErrorMess(error?.response?.data?.message);
      });
  };

  const onHandleUpdateProduct = (id: any, product: IProduct) => {
    updateProduct(id, product).then(() =>
      getAllProduct({ keyword: "", _page: 1, _limit: 10 }).then(({ data }) =>
        setProducts(data)
      )
    );
  };
  const onHandleDeleteProduct = (id: any) => {
    deleteProduct(id).then(() =>
      getAllProduct({ keyword: "", _page: 1, _limit: 10 }).then(({ data }) =>
        setProducts(data)
      )
    );
  };

  // category request
  const onHandleAddCategory = (category: Category) => {
    createCategory(category).then(() =>
      getAllCategory().then(({ data }) => setCategories(data))
    );
  };
  const onHandleUpdateCategory = (id: any, category: Category) => {
    updateCategory(id, category).then(() =>
      getAllCategory().then(({ data }) => setCategories(data))
    );
  };
  const onHandleDeleteCategory = (id: any) => {
    deleteCategory(id)
      .then(() => getAllCategory().then(({ data }) => setCategories(data)))
      .catch((error) => {
        let messageErr = error?.response?.data?.message;
        message.error(`${messageErr}`);
      });
  };

  // signin - signup

  const onHandelSignin = async(userInfo: { [key: string]: any }) => {
    try {
      const {data} = await signin(userInfo);
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      localStorage.setItem("user", JSON.stringify(data.user));
      message.info("Đăng nhập tài khoản thành công!");
      setRole(data.user.role);
      navigate("/");
      setTimeout(() => {
        location.reload();
      }, 2000)
    } catch (error: any) {
      
      setErrorMess(error.response.data.message);
    }
  };
  

  const onHandleSignup = async (userInfo: { [key: string]: any }) => {
    try {
      const {data} = await signup(userInfo);
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      localStorage.setItem("user", JSON.stringify(data.user));
      message.info("Đăng ký tài khoản thành công!");
      setRole(data.user.role);
      navigate("/");
      setTimeout(() => {
        location.reload();
      }, 2000)
    } catch (error : any) {
      const errorMess = error.response.data.message;
      message.error(errorMess.join(" - "))
    }
  }

  return (
    <div className="App">
      {/* Routes */}
      <Routes>
        {/* user */}
        <Route path="/" element={<WebLayout role={role}/>}>
          <Route index element={<Home />} />
          <Route
            path="products"
            element={<Products products={products} onOptions={setOptions} />}
          />
          <Route
            path="products/:id"
            element={<ProductDetail products={products} />}
          />
        </Route>

        {/* login - signup */}
        <Route path="/signin" element={<Signin onSignin={onHandelSignin} onErr={errorMess}/>} />
        <Route path="/signup" element={<Signup onSignup={onHandleSignup}/>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

        {/* admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="products">
            <Route
              index
              element={
                <AdminProducts
                  products={products}
                  onDelete={onHandleDeleteProduct}
                  onKeyword={setKeyword}
                  onOptions={setOptions}
                />
              }
            />
            <Route
              path=":id"
              element={
                <AdminProductsUpdate
                  products={products}
                  categories={categories}
                  onUpdate={onHandleUpdateProduct}
                />
              }
            />
            <Route
              path="add"
              element={
                <AdminProductsAdd
                  categories={categories}
                  onAdd={onHandleAddProduct}
                  addErr={errorMess}
                />
              }
            />
          </Route>

          <Route path="categories">
            <Route
              index
              element={
                <AdminCategories
                  categories={categories}
                  onDelete={onHandleDeleteCategory}
                />
              }
            />
            <Route
              path="add"
              element={<AdminCategoriesAdd onAdd={onHandleAddCategory} />}
            />
            <Route
              path=":id"
              element={
                <AdminCategoriesUpdate
                  categories={categories}
                  onUpdate={onHandleUpdateCategory}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
