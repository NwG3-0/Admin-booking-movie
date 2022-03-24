import { Button, Col, Input, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_LIST_ADVERTISEMENT } from "../../config/endpointapi";
import { ADVERTISEMENT_CREATE } from "../../config/path";
import PrivateLayout from "../../Layout/PrivateLayout";
import "../../style/Advertisement.css";

const Advertisement = () => {
  const value = useRef();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getadvertisement = async () => {
      const params = { limit, page, keyword };
      await axios
        .get(API_LIST_ADVERTISEMENT, { params })
        .then((res) => {
          setData(res?.data?.data?.data);
          setTotal(res?.data?.data?.total);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getadvertisement();
  }, [limit, page, keyword]);
  const onSearch = () => {
    setKeyword(value.current.input.value);
  };

  const onChangePage = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };
  const columns = [
    { title: "ID Quảng cáo", dataIndex: "id" },
    {
      title: "Ảnh",
      render: (value, record) => {
        return (
          <>
            <img src={value.image} />
          </>
        );
      },
    },
    {
      title: "Tên quảng cáo",
      dataIndex: "name",
    },

    {
      title: "Action",
      render: (value, record) => {
        return (
          <>
            <Button>Sửa</Button>
            <Button>Xóa</Button>
          </>
        );
      },
    },
  ];
  return (
    <PrivateLayout>
      <h2 style={{ fontSize: "32px", textTransform: "uppercase" }}>
        Danh sách quảng cáo
      </h2>
      <Row>
        <Col span={20}>
          <div className="advertisement-search">
            <Input ref={value} placeholder="Search by First name" />
            <div className="advertisement-search__btn" onClick={onSearch}>
              Tìm
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className="advertisement-add__btn" onClick={onSearch}>
            <Link to={ADVERTISEMENT_CREATE}>Thêm quảng cáo</Link>
          </div>
        </Col>
      </Row>

      <Table
        columns={columns}
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
export default Advertisement;
