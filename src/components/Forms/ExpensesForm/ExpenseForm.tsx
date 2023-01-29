import React, { useRef, useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Cascader,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Select,
  Space,
  TimePicker,
} from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { yourCategoriessAtom, yourShopsAtom } from "src/Recoil/Atoms";
import { getShopCategories } from "src/Recoil/Selectors";
import dayjs from "dayjs";
import { ILabelValue } from "src/Recoil/initialValues/InitialValueShops";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";

export const currencies = [
  { label: "€", value: "Euro" },
  { label: "SEK", value: "Sek" },
  { label: "$", value: "Dollar" },
];

const ExpenseForm = () => {
  const { Option } = Select;

  const [form] = Form.useForm();

  //
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  //

  const handleChange = () => {
    form.setFieldsValue({});
  };

  const [shops, setShops] = useRecoilState(yourShopsAtom);
  //
  const [newShop, setNewShop] = useState({
    label: "",
    value: "",
    category: "",
  });
  const actualHourMinutes =
    new Date().getHours() + ":" + new Date().getMinutes();
  const actualDate = dayjs().format("YYYY-MM-DD");

  const [shopCategories, setShopCategories] = useRecoilState(getShopCategories);

  //
  const shopCategoriesToSelectObject = shopCategories.map(
    (category: ILabelValue) => ({
      label: category,
      value: category,
    })
  );
  const categories = useRecoilValue(yourCategoriessAtom);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewShop({
      ...newShop,
      label: event.target.value,
      value: event.target.value,
    });
  };

  const addNewShop = (e: any) => {
    e.preventDefault();
    // setShops({
    //   ...shops,
    //   [newShop.label]: {
    //     label: newShop.label,
    //     value: newShop.value,

    // });
    // setNewShop({ label: "", value: "", category: "" });
  };
  const selectBefore = (
    <Select defaultValue="minus">
      <Option value="add">+</Option>
      <Option value="minus">-</Option>
    </Select>
  );
  const selectAfter = (
    <Select
      defaultValue="EUR"
      style={{
        width: 70,
      }}
    >
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="SEK">Sek</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  );

  return (
    <Form
      form={form}
      name="newExpense"
      onFinish={onFinish}
      style={{ maxWidth: 700 }}
      autoComplete="off"
      scrollToFirstError
    >
      <Form.Item
        name="shop"
        label="Shop"
        rules={[{ required: true, message: "Introduce la tienda" }]}
      >
        <Select
          options={shops}
          onChange={handleChange}
          placeholder="¿Dónde lo has comprado?"
          showSearch
        />
      </Form.Item>
      <Form.List
        name="products"
        initialValue={[
          {
            name: "",
            category: "",
            price: 0,
            date: actualDate,
            time: actualHourMinutes,
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} align="baseline" wrap>
                <Form.Item
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.shop !== curValues.shop ||
                    prevValues.product !== curValues.product
                  }
                >
                  {() => (
                    <>
                      <Form.Item
                        {...field}
                        label="Nombre"
                        name={[field.name, "name"]}
                        rules={[
                          { required: true, message: "Pon un nombre válido" },
                        ]}
                      >
                        <Input onChange={handleChange} />
                      </Form.Item>
                    </>
                  )}
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Category"
                  name={[field.name, "category"]}
                  rules={[{ required: true, message: "Pon una categoría" }]}
                >
                  <Select
                    placeholder="Elige una categoría"
                    options={categories}
                    onChange={handleChange}
                    showSearch
                  />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Precio"
                  name={[field.name, "price"]}
                  rules={[{ required: true, message: "Pon un precio" }]}
                  style={{ width: 240 }}
                >
                  <InputNumber
                    onChange={handleChange}
                    name="price"
                    min={0}
                    max={100000}
                    step={0.01}
                    addonBefore={selectBefore}
                    addonAfter={selectAfter}
                  />
                </Form.Item>
                <Form.Item {...field} label="Fecha" name="date">
                  <DatePicker format="YYYY-MM-DD" onChange={handleChange} />
                </Form.Item>
                <Form.Item {...field} label="Hora" name="time">
                  <TimePicker format="HH:mm" onChange={handleChange} />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Añadir Producto
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExpenseForm;
