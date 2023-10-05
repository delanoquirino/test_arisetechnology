import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Loading = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="w-full flex items-center justify-center">
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};
