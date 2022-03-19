import { Button, Input, Pagination, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import PrivateLayout from "../../Layout/PrivateLayout";

const User = () => {
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const onSearch = (value) => console.log(value);

  useEffect(() => {
    
    const data = [];
    for (let index = 0; index <= 15; index++) {
      data.push({
        key: `${index}`,
        name: `User ${index}`,
        age: `${index}`,
        email: `Email ${index}`,
        profile: `Profile ${index}`,
      });
    }
    setDataSource(data);
  }, []);
  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={e => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = dataSource.filter(entry =>
          entry.name.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );
  const columns = [
    { title:"Profile", dataIndex: "profile" },
    {
      title: "Name",
      dataIndex: "name",
      // filterDropdown: (setSelectedKeys, selectedKeys, confirm, clearFilter) => {
      //   return (
      //     <Input
      //       autoFocus
      //       placeholder="Search"
      //       value={selectedKeys}
      //       onPressEnter={() => {
      //         confirm();
      //       }}
      //       onBlur={() => {
      //         confirm();
      //       }}
      //       onChange={(e) => {
      //         setSelectedKeys(e.target.value ? [e.target.value] : []);
      //       }}
      //     >
      //       <Button
      //         onClick={() => {
      //           confirm();
      //         }}
      //       >
      //         Search
      //       </Button>
      //     </Input>
      //   );
      // },
      // filterIcon: () => {
      //   return <SearchOutlined />;
      // },
      // // onFilter: (value, record) => {
      // //   return record.name.toLowerCase().include(value.toLowerCase());
      // // },
    },
    { title: "Contact", dataIndex: "contacteee" },
    { title: "Email", dataIndex: "email" },
    { title: "Age", dataIndex: "age" },
    {
      title: "Action",
      render: (_, record) => {
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
      <h2 style={{fontSize:"32px",textTransform:"uppercase"}}>Danh sách người dùng</h2>
      <Table columns={columns} dataSource={dataSource}></Table>
    </PrivateLayout>
  );
};
export default User;
