import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, InputNumber } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import { Category } from '../../../../types/categoryType';
import { getOneCategory } from '../../../../api/categoryMethod';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
  

export const AdminCategoriesUpdate = (props: any) => {
  const{categories, onUpdate} = props
  const {id} = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({} as Category);

  useEffect(() => {
    // getOneCategory(id).then(({data}) => setCategory(data));
    setCategory(categories?.find((category: Category) => category._id == id))
  },[categories, id])

  console.log(category);
  

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: category?.name
    })
  })

  const onFinish = (values: any) => {
    onUpdate(values);
    navigate('/admin/categories')
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
        <Input />
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
