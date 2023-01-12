import { Button, Input, Select, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.css";
// import { useToggleModal } from "./useToggleModal";
import useToggleModal from "./useToggleModal";
import "antd/dist/antd.css";
type ListItem = {
  id: number;
  name: string;
  age: number;
  sex: string;
};
type FormValue = {
  age: number;
  sex: string;
};
const list: ListItem[] = [
  {
    id: 1,
    name: "afc163",
    age: 22,
    sex: "男"
  },
  {
    id: 2,
    name: "chenshuai2144",
    age: 21,
    sex: "男"
  }
];
export default function App() {
  const requestData = () => Promise.resolve(list);
  const [listData, setListData] = useState<ListItem[]>([]);
  useEffect(() => {
    requestData().then(setListData);
  }, []);
  const modal = useToggleModal<{ data: ListItem }>(({ data }) => {
    // eslint配置了hooks规则的话会报错。目前只能关掉规则
    const [toggle, setToggle] = useState(false);
    const submit = (formValue: FormValue) => {
      console.log(formValue);
      // 请求接口保存数据
      // 不需要组件间通信，直接从闭包拿到父组件的所有状态和方法。
      requestData();
      // modal可以自己关闭自己
      modal.hideComponent();
    };
    return (
      <Modal
        {...modal.modalProps}
        okButtonProps={modal.okButtonProps}
        title={`编辑-${data.name}`}
      >
        {/* 点击Modal的确认按钮会触发onFinish */}
        <Form {...modal.formProps} onFinish={submit}>
          <Button onClick={() => setToggle(!toggle)}>toggleName</Button>
          {toggle && (
            <Form.Item label={"姓名"}>
              <Input disabled value={data.name} />
            </Form.Item>
          )}
          <Form.Item name={"age"} label="年龄">
            <Input />
          </Form.Item>
          <Form.Item name={"sex"} label="性别">
            <Select>
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  });
  return (
    <div>
      {listData.map((value) => (
        <div key={value.id}>
          {value.name}-{value.age}
          <Button onClick={() => modal.showComponent({ data: value })}>
            edit
          </Button>
        </div>
      ))}
      {/** 这里一定要把hooks返回的组件放上来 */}
      <modal.Component />
    </div>
  );
}
