import { AppstoreOutlined, HolderOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import SuccesssModal from "@components/MODALS/SuccessModal";
import TableCard from "@components/TableCard/TableCard";
import StaffModal from "@components/staffCard/LoginModal";
import { fetchTableUsequery } from "@services/tables";
import { useQuery } from "@tanstack/react-query";
import { ConfigProvider, Spin, Typography } from "antd";
import { Space } from "antd/lib";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { useAppSelector } from "src/store";
import fssanimation from "../../components/Loaders/nuba.json";
import EmptyPage from "@routes/EmptyPage";
import NubaLoader from "@components/spinner/NubaLoader";

export default function TablePro() {
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { openModal: successmodal, loading } = useAppSelector(
    (state) => state.order
  );

  const handleOpen = (productId: React.SetStateAction<null>) => {
    setOpen(true);
    setSelectedProductId(productId);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: fetchTableUsequery,
    retry: 3,
    refetchInterval: 3000,
    networkMode: "always",
  });

  if (successmodal) {
    return <SuccesssModal />;
  }

  const tabsItems = data?.map(
    (item: { _id: string; name: string; tables?: any[] }) => ({
      key: `${item._id}`,
      tab: "Table",
      label: (
        <Space>
          <HolderOutlined />
          {item.name}
        </Space>
      ),
      children: [
        item?.tables && item?.tables.length > 0 ? (
          <div
            className="wrapper2"
            style={{
              display: "grid",
              rowGap: 30,
              height: "calc(100vh - 280px)",
              overflowY: "auto",
              alignItems: "start",
            }}
          >
            {item.tables.length > 0 ? (
              item.tables.map((T) => (
                <div
                  key={T._id}
                  className="card"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "0px",
                    flexWrap: "wrap",
                    width: "100%",
                    bottom: 0,
                  }}
                >
                  <TableCard key={T._id} item={T} openModal={handleOpen} />
                </div>
              ))
            ) : (
              <EmptyPage />
            )}
          </div>
        ) : (
          <EmptyPage />
        ),
      ],
    })
  );

  if (isLoading) {
    return (
      <Spin
        size="large"
        fullscreen
        tip="please wait ..."
        indicator={<NubaLoader />}
      />
    );
  }

  if (loading) {
    return (
      <div
        style={{
          display: "grid",
          placeContent: "center",
          placeSelf: "auto",
          marginTop: "80px",
        }}
      >
        <Lottie
          animationData={fssanimation}
          loop={true}
          height={20}
          width={20}
          alt="NubaSpa"
        />
      </div>
    );
  }
  if (isError) {
    return <EmptyPage />;
  }

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: "#fff",
              itemActiveColor: "#000",
              itemHoverColor: "#aa846f",
              itemSelectedColor: "#000",
              cardBg: "#914F1E",
            },
          },
        }}
      >
        <ProCard
          title={
            <Typography.Text style={{ fontSize: "18px" }}>
              <AppstoreOutlined /> Slots
            </Typography.Text>
          }
          tabs={{
            type: "card",
            items: tabsItems,
          }}
          bordered
          boxShadow
        />
      </ConfigProvider>
      {selectedProductId && (
        <StaffModal setOpen={setOpen} open={open} tbl={selectedProductId} />
      )}
    </>
  );
}
