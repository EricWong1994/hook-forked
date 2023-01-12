import { useToggleComponent } from "./useToggleComponent";
import { DependencyList, FunctionComponent, useMemo } from "react";
import { ModalProps } from "antd/es/modal";
import { ButtonProps } from "antd/es/button";
import { FormProps } from "antd/es/form";
import { Form } from "antd";

export const useToggleModal = <Props, FormValue = any>(
  Component: FunctionComponent<Props>,
  dependency: DependencyList = []
) => {
  const toggleComponent = useToggleComponent<Props>(Component, dependency);
  const [form] = Form.useForm<FormValue>();
  const randomFormId = useMemo(() => `form${Math.random()}`, []);
  const modalProps: ModalProps = {
    visible: true,
    onCancel: toggleComponent.hideComponent
  };
  const okButtonProps: ButtonProps = {
    htmlType: "submit",
    form: randomFormId
  };
  const formProps: Required<Pick<FormProps, "form" | "id">> = {
    form: form!,
    id: randomFormId
  };

  return {
    ...toggleComponent,
    form,
    formProps,
    okButtonProps,
    modalProps
  };
};
