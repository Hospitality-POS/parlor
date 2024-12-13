import { CheckCard } from "@ant-design/pro-components";
import { Image, Space, Typography } from "antd";

function CategoryCard({
  icon,
  name,
  id,
  handleSelectedCard,
}: any) {
 
  return (
    <CheckCard
      onClick={() => handleSelectedCard(id)}
      title={
        <Space style={{ justifyContent: "center", width: "100vw" }}>
          <Image preview={false} src={icon ? icon : "/spa.png"} width={50} />
        </Space>
      }
      description={
        <Typography.Title level={4} ellipsis={{ rows: 3 }}>
          {name}
        </Typography.Title>
      }
      style={{ width: 200, height: 200, overflow: "hidden" }}
    />
  );
}

export default CategoryCard;
