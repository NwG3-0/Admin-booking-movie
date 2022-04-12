import { useEffect, useRef, useState } from "react";
import PrivateLayout from "../../Layout/PrivateLayout";
import { Button, Col, Input, Row, Table } from "antd";
import axios from "axios";
import { API_MOVIES, API_MOVIES_DELETE } from "../../config/endpointapi";
import { MOVIE_CREATE, MOVIE_UPDATE } from "../../config/path";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from "cookies-js";
import { bindParam } from "../../config/function";
import "../../style/Movie.css";

const Movie = () => {
  const value = useRef();
  const [status, setStatus] = useState(false);
  const [token] = useState(Cookies?.get("token"));
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getmovies = async () => {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
      const params = { limit, page, keyword };
      await axios
        .get(API_MOVIES, { params })
        .then((res) => {
          setData(res?.data?.data?.data);
          setTotal(res?.data?.data?.total);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getmovies();
  }, [status, limit, page, keyword]);

  const onSearch = () => {
    setKeyword(value.current.input.value);
  };

  const onDelete = async (id) => {
    await axios.post(`${API_MOVIES_DELETE}/${id}`).then((res) => {
      setStatus(!status);
    });
  };

  const onChangePage = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };

  const onSwitchUpdate = (id) => {
    history.push(bindParam(MOVIE_UPDATE, { id }));
  };

  const columns = [
    { title: "ID Phim", dataIndex: "id" },
    {
      title: "Poster",
      render: (value, record) => {
        return (
          <div className="movie-list__img">
            <img src={value.poster} />
          </div>
        );
      },
    },
    { title: "Name", dataIndex: "name" },
    { title: "Loại phim", dataIndex: "dimension" },
    { title: "Thể loại", dataIndex: "type_of_movie" },
    { title: "Ngày khởi chiếu", dataIndex: "start_date" },
    { title: "Thời lượng", dataIndex: "range_of_movie" },
    { title: "Diễn viên", dataIndex: "actor" },
    { title: "Đạo diễn", dataIndex: "director" },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Action",
      render: (value, record) => {
        console.log(value);
        return (
          <>
            <Button onClick={() => onSwitchUpdate(value?.id)}>Sửa</Button>
            <Button onClick={() => onDelete(value?.id)}>Xóa</Button>
          </>
        );
      },
    },
  ];
  return (
    <PrivateLayout>
      <h2 style={{ fontSize: "32px", textTransform: "uppercase" }}>
        Danh sách phim
      </h2>
      <Row>
        <Col span={22}>
          <div className="movies-search">
            <Input ref={value} placeholder="Search by First name" />
            <div className="movies-search__btn" onClick={onSearch}>
              Tìm
            </div>
          </div>
        </Col>
        <Col span={2}>
          <div className="movies-add__btn" onClick={onSearch}>
            <Link to={MOVIE_CREATE}>Thêm phim</Link>
          </div>
        </Col>
      </Row>

      <Table
        columns={columns}
        className="movie-table"
        pagination={{
          total: total,
          onChange: onChangePage,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 30],
        }}
        dataSource={data}
      />
    </PrivateLayout>
  );
};
export default Movie;
