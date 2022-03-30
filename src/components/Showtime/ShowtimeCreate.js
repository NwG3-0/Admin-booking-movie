import PrivateLayout from "../../Layout/PrivateLayout";
import { Form, Select, InputNumber, Button, Input, DatePicker, TimePicker } from "antd";
import axios from "axios";
import {
  API_MOVIES_SELECT,
  API_ROOM_SELECT,
  API_SHOWTIME_CREATE,
} from "../../config/endpointapi";
import { useEffect, useState } from "react";
import Cookies from "cookies-js";
import { useHistory } from "react-router-dom";
import { SEAT, SHOWTIME } from "../../config/path";
import moment from "moment";

const { Option } = Select;

const ShowTimeCreate = () => {
  const [token] = useState(Cookies?.get("token"));
  const [movieSelect, setMovieSelect] = useState([]);
  const [roomSelect, setRoomSelect] = useState([]);
  const history = useHistory();

  // const onChange = (e) => {
  //   console.log(e.target.value);
  // };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const getMovieSelect = async () => {
      await axios
        .get(API_ROOM_SELECT)
        .then((res) => {
          setRoomSelect(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMovieSelect();
  }, [token]);

  const onFinish = (values) => {
    const { show_date, show_time } = values;

    if (show_date) {
      values.show_date = moment(show_date).format("DD:MM:YYYY");
    }

    if (show_time) {
      values.show_time = moment(show_time).format("HH:mm:ss");
    }

    axios
      .post(API_SHOWTIME_CREATE, values)
      .then(function (res) {
        history.push(SHOWTIME);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const getMovieSelect = async () => {
      await axios
        .get(API_MOVIES_SELECT)
        .then((res) => {
          setMovieSelect(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMovieSelect();
  }, [token]);

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <h2 style={{ fontSize: "2rem", textTransform: "uppercase" }}>
          Thêm ghế
        </h2>

        <Form.Item
          {...formItemLayout}
          name="show_date"
          label="Thời gian khởi chiếu"
          rules={[
            {
              required: true,
              message: "Nhập thời gian khởi chiếu",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          name="show_time"
          label="Thời gian khởi chiếu"
          rules={[
            {
              required: true,
              message: "Nhập thời gian khởi chiếu",
            },
          ]}
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          name="room_id"
          label="Thể loại"
          rules={[
            {
              required: true,
              message: "Nhập thể loại phim",
            },
          ]}
        >
          <Select placeholder="Please select favourite colors">
            {roomSelect?.map((movie) => {
              return <Option value={movie?.id}>{movie?.name}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="movie_id"
          label="Thể loại"
          rules={[
            {
              required: true,
              message: "Nhập thể loại phim",
            },
          ]}
        >
          <Select placeholder="Please select favourite colors">
            {movieSelect?.map((movie) => {
              return <Option value={movie?.id}>{movie?.name}</Option>;
            })}
          </Select>
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

export default ShowTimeCreate;
