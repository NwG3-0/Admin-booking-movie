import { Layout } from "antd"
import { useEffect, useState } from "react";
import PrivateLayout from "../../Layout/PrivateLayout"
import { Button, Input, Pagination, Table } from "antd";
import { IoMdStarHalf } from "react-icons/io";
import '../../style/Movie.css';

const Movie =()=>{
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const data = [];
        for (let index = 0; index <= 15; index++) {
          data.push({
            key: `${index}`,
            name: `Movie ${index}`,
            kind: `Kind ${index}`,
            actor: `Actor ${index}`,
            director:`Director ${index}`,
            rating: Math.floor(Math.random()*6),
            time:   Math.floor(Math.random()*120),
            
          });
        }
        setDataSource(data);
      }, []);
      const columns = [
        { title:"ID Phim", dataIndex: "key" },
        {
          title: "Name",
          dataIndex: "name",
        },
        {title:"Thời lượng", dataIndex:"time"},
        { title: "Diễn viên", dataIndex: "actor" },
        { title: "Đạo diễn", dataIndex: "director" },
        { title: "Đánh giá", dataIndex: "rating" },
        {
          title: "Action",
          render: (_, record) => {
            return (
              <><Button>Thêm</Button>
                <Button>Sửa</Button>
                <Button>Xóa</Button>
              </>
            );
          },
        },
      ];
return(
    <PrivateLayout>
         <h2 style={{fontSize:"32px",textTransform:"uppercase"}}>Danh sách phim</h2>
         <Table style={{textAlign:"center"}} columns={columns} dataSource={dataSource}></Table>
        

    </PrivateLayout>
)
}
export default Movie