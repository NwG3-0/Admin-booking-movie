/* eslint-disable jsx-a11y/alt-text */
import { Button, Col, Input, Row, Table } from 'antd'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_ADVERTISEMENT_DELETE, API_LIST_ADVERTISEMENT } from '../../config/endpointapi'
import { ADVERTISEMENT_CREATE } from '../../config/path'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/Advertisement.css'
import { bindParam } from '../../config/function'

const Advertisement = () => {
  const value = useRef()
  const [status, setStatus] = useState(false)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  useEffect(() => {
    const getadvertisement = async () => {
      const params = { limit, page, keyword }
      await axios
        .get(API_LIST_ADVERTISEMENT, { params })
        .then((res) => {
          setData(res?.data?.data?.data)
          setTotal(res?.data?.data?.total)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getadvertisement()
  }, [status, limit, page, keyword])
  const onSearch = () => {
    setKeyword(value.current.input.value)
  }

  const onChangePage = (page, limit) => {
    setPage(page)
    setLimit(limit)
  }
  const onDelete = async (id) => {
    await axios.post(bindParam(API_ADVERTISEMENT_DELETE, { id })).then((res) => {
      console.log(value?.id)
      setStatus(!status)
    })
  }
  const columns = [
    { title: 'ID Quảng cáo', dataIndex: 'id' },
    {
      title: 'Ảnh',
      render: (value, record) => {
        return (
          <div className="advertisement-list__img">
            <img src={value.image} />
          </div>
        )
      },
    },
    {
      title: 'Tên quảng cáo',
      dataIndex: 'name',
    },

    {
      title: 'Action',
      render: (value, record) => {
        return (
          <>
            <Button onClick={() => onDelete(value?.id)}>Xóa</Button>
          </>
        )
      },
    },
  ]
  return (
    <PrivateLayout>
      <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>Danh sách quảng cáo</h2>
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
  )
}
export default Advertisement
