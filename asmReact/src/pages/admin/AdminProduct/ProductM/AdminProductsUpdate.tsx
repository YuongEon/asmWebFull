import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, InputNumber } from "antd";
import { Category } from "../../../../types/categoryType";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from '../../../../types/products';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AdminProductsUpdate = (props: any) => {

  const {products, categories, onUpdate} = props;
  const [currentValue, setCurrentValue] = useState<IProduct>()
  const [currentCategory, setCurrentCategory] = useState<IProduct>()


  const {id} = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    setCurrentValue(products?.docs?.find((product: IProduct) => product._id == id));
  }, [products, id])

  useEffect(() => {
    setCurrentCategory(categories?.find((category: Category) => category._id == currentValue?.categoryId));
  }, [categories, id])

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: currentValue?.name,
      price: currentValue?.price,
      image: currentValue?.image,
      quantity: currentValue?.quantity,
      description: currentValue?.description,
      categoryId: currentValue?.categoryId
    })
  },[currentValue])

  

  const onFinish = (values: any) => {
    values.name = values.name.trim()
    values.description = values.description.trim()
    onUpdate(id, values)
    navigate('/admin/products')
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
      <InputNumber min={0} style={{width: '200px'}}/>
      </Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
        <InputNumber placeholder="Quantity (Min: 10)" min={10} style={{width: '200px'}}/>
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="image" label="Image" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
        <Select
          placeholder="Select a category"
          allowClear
        >
          {categories?.map((category: Category) => {
            const keyId = uuidv4()
            if(category?._id == currentValue?.categoryId){
              return <Option key={keyId} value={category?._id} selected>{category?.name}</Option>
            }
            return <Option key={keyId} value={category?._id}>{category?.name}</Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AdminProductsUpdate