import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
// import './App.css'
import { Home, NotFound, Products } from './pages'
import WebLayout from './pages/layout/WebLayout'
import 'antd/dist/reset.css';
import {IProduct} from './types/products';
import { createProduct, deleteProduct, getAllProduct, updateProduct } from './api/productMethod';
import ProductDetail from './pages/ProductDetail';
import AdminLayout from './pages/layout/AdminLayout';
import AdminPage from './pages/admin/AdminPage';
import AdminProducts from './pages/admin/AdminProduct/ProductM/AdminProducts';
import AdminProductsAdd from './pages/admin/AdminProduct/ProductM/AdminProductsAdd';
import { Category } from './types/categoryType';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from './api/categoryMethod';
import AdminProductsUpdate from './pages/admin/AdminProduct/ProductM/AdminProductsUpdate';
import AdminCategories from './pages/admin/AdminProduct/CategoryM/AdminCategories';
import AdminCategoriesAdd from './pages/admin/AdminProduct/CategoryM/AdminCategoriesAdd';
import { AdminCategoriesUpdate } from './pages/admin/AdminProduct/CategoryM/AdminCategoriesUpdate';
import { Alert, message, Space } from 'antd';

const App: React.FC = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [keyword, setKeyword] = useState<string>("")
  const [errorMess, setErrorMess] = useState([])
  const [options, setOptions] = useState<{[key:string]: any}>({})

  useEffect(() => {
    getAllProduct({keyword: keyword, ...options}).then(({data}) => setProducts(data));
  }, [keyword, options])
  
  useEffect(() => {
    getAllCategory().then(({data}) => setCategories(data));
  },[])

  // product request
  const onHandleAddProduct = (product: IProduct) => {
    createProduct(product)
    .then(() => getAllProduct({})
      .then(({data}) => setProducts(data))
      .then(() => navigate('/admin/products'))
    )
    .catch((error) => {
      setErrorMess(error?.response?.data?.message)
    })
  }
  
  const onHandleUpdateProduct = (id: any ,product: IProduct) => {
    updateProduct(id,product).then(() => getAllProduct({}).then(({data}) => setProducts(data)))
  }
  const onHandleDeleteProduct = (id: any) => {
    deleteProduct(id).then(() => getAllProduct({}).then(({data}) => setProducts(data)));
  }

  // category request
  const onHandleAddCategory = (category: Category) => {
    createCategory(category).then(() => getAllCategory().then(({data}) => setCategories(data)));
  }
  const onHandleUpdateCategory = (id: any ,category: Category) => {
    updateCategory(id,category).then(() => getAllCategory().then(({data}) => setCategories(data)))
  }
  const onHandleDeleteCategory = (id: any) => {
    deleteCategory(id)
      .then(() => getAllCategory().then(({data}) => setCategories(data)))
      .catch((error) => {
        let messageErr = error?.response?.data?.message
        message.error(`${messageErr}`)
      })
  }
  
  return (
    <div className="App">
      
      {/* Routes */}
      <Routes>
        {/* user */}
        <Route path='/' element={<WebLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='products' element={<Products products={products} onOptions={setOptions}/>} />
          <Route path='products/:id' element={<ProductDetail products={products}/>} />
        </Route>

        {/* 404 */}
        <Route path='*' element={<NotFound/>}/>

        {/* admin */}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminPage/>}/>
          <Route path='products'>
            <Route index element={<AdminProducts products={products} onDelete={onHandleDeleteProduct} onKeyword={setKeyword} />} />
            <Route path=':id' element={<AdminProductsUpdate products={products} categories={categories} onUpdate={onHandleUpdateProduct}/>} />
            <Route path='add' element={<AdminProductsAdd categories={categories} onAdd={onHandleAddProduct} addErr={errorMess}/>} />
          </Route>
          
          <Route path='categories'>
            <Route index element={<AdminCategories categories={categories} onDelete={onHandleDeleteCategory}/> } />
            <Route path='add' element={<AdminCategoriesAdd onAdd={onHandleAddCategory}/> } />
            <Route path=':id' element={<AdminCategoriesUpdate categories={categories} onUpdate={onHandleUpdateCategory}/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
