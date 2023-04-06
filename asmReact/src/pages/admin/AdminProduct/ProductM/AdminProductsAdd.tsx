import React from "react";
import { Button, Form, Input, Select, InputNumber } from "antd";
import { Category } from "../../../../types/categoryType";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AdminProductsAdd = (props: any) => {
  const {categories, onAdd} = props;
  const navigate = useNavigate()
  

  const [form] = Form.useForm();
  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    onAdd(values);
    navigate('/admin/products');
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
          onChange={onGenderChange}
          allowClear
        >
          {categories.map((category: Category) => {
            const keyId = uuidv4()
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
  );
};

export default AdminProductsAdd;
