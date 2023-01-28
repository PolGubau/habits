import React, { useRef, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, InputRef, Select, Space } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { yourCategoriessAtom, yourShopsAtom } from "src/Recoil/Atoms";

export const currencies = [
  { label: "€", value: "Euro" },
  { label: "SEK", value: "Sek" },
  { label: "$", value: "Dollar" },
];

const ExpenseForm: React.FC = () => {
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

  const categories = useRecoilValue(yourCategoriessAtom);

  const addShop = (shop: { label: string; value: string }) => {
    localStorage.setItem(
      "HabitsData",
      JSON.stringify({ shops: [...shops, shop] })
    );
    // setShops([...shops, shop]);
  };

  const [newShop, setNewShop] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewShop(event.target.value);
  };

  const addNewShop = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    newShop && addShop({ label: newShop, value: newShop });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Form
      form={form}
      name="newExpense"
      onFinish={onFinish}
      style={{ maxWidth: 700 }}
      autoComplete="off"
    >
      <Form.Item
        name="shop"
        label="Shop"
        rules={[{ required: true, message: "Missing shop" }]}
      >
        <Select
          options={shops}
          onChange={handleChange}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space>
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={newShop}
                  onChange={onNameChange}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={addNewShop}
                >
                  Add item
                </Button>
              </Space>
            </>
          )}
        />
      </Form.Item>
      <Form.List name="products">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <>
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
                          name={[field.name, "product"]}
                          rules={[
                            { required: true, message: "Pon un nombre válido" },
                          ]}
                        >
                          <Input />
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
                    label="Price"
                    name={[field.name, "price"]}
                    rules={[
                      {
                        required: true,
                        message: "Introduce un precio válido",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Select
                    options={currencies}
                    defaultValue={currencies[0].value}
                    onChange={handleChange}
                  />

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              </>
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
