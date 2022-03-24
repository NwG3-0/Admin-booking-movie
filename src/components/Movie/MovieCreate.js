import PrivateLayout from "../../Layout/PrivateLayout";
import { Form, Select, InputNumber, Button, Input, DatePicker } from "antd";
import axios from "axios";
import { API_MOVIES_STORE } from "../../config/endpointapi";
import { useState } from "react";
import Cookies from "cookies-js";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { MOVIE } from "../../config/path";

const { Option } = Select;

const MovieCreate = () => {
  const [token] = useState(Cookies?.get("token"));
  const history = useHistory();

  // const onChange = (e) => {
  //   console.log(e.target.value);
  // };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  // const normFile = (e) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  const onFinish = (values) => {
    const { type_of_movie, start_date } = values;

    if (type_of_movie) {
      values.type_of_movie = type_of_movie.toString();
    }
    if (start_date) {
      values.start_date = moment(start_date).format("YYYY-MM-DD");
    }

    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios
      .post(API_MOVIES_STORE, values)
      .then(function (res) {
        history.push(MOVIE);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <h2 style={{ fontSize: "2rem", textTransform: "uppercase" }}>
          Thêm phim
        </h2>

        <Form.Item
          {...formItemLayout}
          name="name"
          label="Tên phim"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="range_of_movie"
          label="Thời lượng"
          rules={[
            {
              required: true,
              message: "Nhập thời lượng phim",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="start_date"
          label="Thời gian khởi chiếu"
          rules={[
            {
              required: true,
              message: "Nhập thời gian khởi chiếu",
            },
          ]}
        >
          <DatePicker style={{ width: "70%" }} />
        </Form.Item>
        <Form.Item
          name="dimension"
          label="Loại phim"
          hasFeedback
          rules={[{ required: true, message: "Nhập loại phim" }]}
        >
          <Select placeholder="Loại phim">
            <Option value="2D">2D</Option>
            <Option value="3D">3D</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="type_of_movie"
          label="Thể loại"
          rules={[
            {
              required: true,
              message: "Nhập thể loại phim",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Please select favourite colors">
            <Option value="Kinh dị">Kinh dị</Option>
            <Option value="Hành động">Hành động</Option>
            <Option value="Hài hước">Hài hước</Option>
            <Option value="Hoạt hình">Hoạt hình</Option>
            <Option value="Trinh thám">Trinh thám</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Giới hạn tuổi">
          <Form.Item name="range_age" noStyle>
            <InputNumber min={0} max={21} />
          </Form.Item>
          <span className="ant-form-text"> tuổi</span>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="actor"
          label="Diễn viên"
          rules={[
            {
              required: true,
              message: "Nhập tên diễn viên",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="direct"
          label="Đạo diễn"
          rules={[
            {
              required: true,
              message: "PNhập tên đạo diễn",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Nhập mô tả" }]}
        >
          <Input.TextArea rows={5} showCount maxLength={100} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="poster"
          label="Poster"
          rules={[
            {
              required: true,
              message: "Nhập ảnh",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="trailer"
          label="Trailer"
          rules={[
            {
              required: true,
              message: "Nhập link trailer",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </PrivateLayout>
  );
};
export default MovieCreate;
