import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { HOME } from "../../config/path";
import { API_LOGIN } from "../../config/endpointapi";
import Cookies from "cookies-js";

const Login = () => {
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
    axios
      .post(API_LOGIN, values)
      .then(function (res) {
        Cookies.set("data", JSON.stringify(res.data.user));
        Cookies.set("token", res.data.access_token);
        history.push(HOME);
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
