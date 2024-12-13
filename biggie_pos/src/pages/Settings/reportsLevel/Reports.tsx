import React, { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import {
  HddOutlined,
  HolderOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import { ProCard, ProFormSelect } from "@ant-design/pro-components";
import PurchaseReportModal from "@components/Reports/PurchaseReport";
import SalesReportModal from "@components/Reports/SalesReport";
import { Space } from "antd";
import { useReport } from "../hooks/useReport";
import VoidReportModal from "@components/Reports/VoidReport";
import { fetchItemSalesReport } from "@services/reports";
import { useAppDispatch } from "src/store";
import { generateSalesReport } from "@features/Report/reportActions";
import { fetchAllUsersList } from "@services/users";
import ItemSalesModal from "./ItemSalesModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTableLocation } from "@services/tables";

const { RangePicker } = DatePicker;

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("sale");
  const [form] = Form.useForm();
  const [queryKey, setQueryKey] = useState(null);

  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  const {
    onCloseSalesModal,
    onClosePurchaseModal,
    generateReportHandler,
    isGenerateButtonDisabled,
    rangePresets,
    openSalesModal,
    openPurchaseModal,
    setSalesDateTimeRange,
    setPurchaseDateTimeRange,
    purchaseDateTimeRange,
    salesDateTimeRange,
    setOpenSalesModal,
    setOpenPurchaseModal,

    openVoidedModal,
    setVoidedDateTimeRange,
    setOpenVoidedModal,
    onCloseVoidedModal,
    voidedDateTimeRange,

    setParams,
  } = useReport(activeTab);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setOpenSalesModal(false);
    setOpenPurchaseModal(false);
    setOpenVoidedModal(false);
    form.resetFields();
  };
  const onFinish = async (values) => {
    const { dateRange, servedBy, commission, locationId } = values;
    const [startDate, endDate] = dateRange || [];
    setSalesDateTimeRange([
      dateRange?.[0]?.format("YYYY-MM-DD HH:mm") || "",
      dateRange?.[1]?.format("YYYY-MM-DD HH:mm") || "",
    ]);
    // setSalesDateTimeRange([startDate, endDate]);

    // setParams({ servedBy, commission });

    // Update your generateReportHandler to include servedBy and commission
    // generateReportHandler();
    // const {data, isLoading} = useQuery({queryKey:['itemsales', {startDate?.format("YYYY-MM-DD HH:mm") || "",endDate?.format("YYYY-MM-DD HH:mm") || "", servedBy, commission}], queryFn: fetchItemSalesReport})

    // <ItemSalesModal data={data} loading={isLoading}/>

    if(startDate){
      setQueryKey({
        startDate: startDate?.format("YYYY-MM-DD HH:mm") || "",
        endDate: endDate?.format("YYYY-MM-DD HH:mm") || "",
        servedBy,
        commission,
        locationId
      });
        queryClient.invalidateQueries(["itemsales"]);
    }

    return true;
  };

  const { data, isLoading } = useQuery(
    ["itemsales", queryKey],
    () => fetchItemSalesReport(queryKey),
    {
      enabled: !!queryKey, 
      networkMode: 'always'
    }
  );

  const tabItems = [
    {
      key: "sale",
      tab: "Sale",
      label: (
        <Space>
          <HolderOutlined />
          Generate Item Sales Report
        </Space>
      ),
      children: (
        <>
          <Form form={form} onFinish={onFinish} layout="inline">
            <Form.Item
              name="dateRange"
              label="Date & Time"
              style={{ marginBottom: 16 }}
              rules={[
                {
                  required: true,
                  message: "kindly select date & time range",
                },
              ]}
            >
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                presets={rangePresets}
              />
            </Form.Item>
            <Form.Item name="createdBy" style={{ marginBottom: 16 }}>
              <ProFormSelect
                width={"md"}
                name="servedBy"
                label="Created By"
                showSearch
                placeholder="Select created By"
                request={async () => {
                  const data = await fetchAllUsersList({});
                  return data?.map((e: { username: any; _id: any }) => {
                    return { label: e.username, value: e._id };
                  });
                }}
              />
            </Form.Item>
            <Form.Item name="locationId" style={{ marginBottom: 16 }}>
              <ProFormSelect
                width={"md"}
                name="locationId"
                label="Served By"
                showSearch
                placeholder="Select served by"
                request={async () => {
                  const data = await getTableLocation({});
                  return data?.map((e: { name: any; _id: any }) => {
                    return { label: e.name, value: e._id };
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              name="commission"
              style={{ marginBottom: 16 }}
              label="Commission"
            >
              <InputNumber
                placeholder="Commission %"
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value!.replace("%", "")}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 16 }}>
              {/* {queryKey?.startDate && ( */}
              <ItemSalesModal
                data={data}
                loading={isLoading}
                startDate={salesDateTimeRange[0]}
                endDate={salesDateTimeRange[1]}
              />
              {/* )} */}
            </Form.Item>
          </Form>
          {/* <SalesReportModal
            openM={openSalesModal}
            onCloseM={onCloseSalesModal}
            startDate={salesDateTimeRange[0]}
            endDate={salesDateTimeRange[1]}
          /> */}
        </>
      ),
    },
    {
      key: "purchase",
      tab: "Purchase",
      label: (
        <Space>
          <HolderOutlined />
          Generate Sales Report
        </Space>
      ),
      children: (
        <Space direction="vertical" size={16}>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            presets={rangePresets}
            // showHour={true}
            // showTime
            onChange={(dates) =>
              setPurchaseDateTimeRange([
                dates?.[0]?.format("YYYY-MM-DD HH:mm") || "",
                dates?.[1]?.format("YYYY-MM-DD HH:mm") || "",
              ])
            }
          />
          <Button
            type="primary"
            onClick={() => generateReportHandler()}
            disabled={isGenerateButtonDisabled}
          >
            Generate Report
          </Button>
          <PurchaseReportModal
            openM={openPurchaseModal}
            onCloseM={onClosePurchaseModal}
            startDate={purchaseDateTimeRange[0]}
            endDate={purchaseDateTimeRange[1]}
          />
        </Space>
      ),
    },
    {
      key: "voided",
      tab: "void",
      label: (
        <Space>
          <HolderOutlined />
          Generate Voided bills Report
        </Space>
      ),
      children: (
        <Space direction="vertical" size={16}>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            presets={rangePresets}
            onChange={(dates) =>
              setVoidedDateTimeRange([
                dates?.[0]?.format("YYYY-MM-DD HH:mm") || "",
                dates?.[1]?.format("YYYY-MM-DD HH:mm") || "",
              ])
            }
          />
          <Button
            type="primary"
            onClick={generateReportHandler}
            disabled={isGenerateButtonDisabled}
          >
            Generate Report
          </Button>
          <VoidReportModal
            openM={openVoidedModal}
            onCloseM={onCloseVoidedModal}
            startDate={voidedDateTimeRange[0]}
            endDate={voidedDateTimeRange[1]}
          />
        </Space>
      ),
    },
  ];

  return (
    <ProCard
      tabs={{
        type: "line",
        activeKey: activeTab,
        onChange: handleTabChange,
        items: tabItems,
      }}
      title={
        <Space>
          <HddOutlined />
          Generate Reports
        </Space>
      }
    ></ProCard>
  );
};

export default Reports;
