import { useRef } from "react";

import { ActionType, ProTable } from "@ant-design/pro-components";
import { Tooltip, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { fetchSubCategories } from "@services/categories";
import useCategorySettings from "../hooks/useCategorySettings";
import SubCategoryModal from "@components/MODALS/pro/SubCategoryModal";

const SubCategorySettings = () => {
  const actionRef = useRef<ActionType>();
  const {
    deleteConfirmationOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    deleteCandidate,
  } = useCategorySettings({type: 'sub-category' });

  const actionColumn = {
    title: "Actions",
    dataIndex: "actions",
    hideInSearch: true,
    render: (_, record) => [
      <Tooltip key="edit" title="Edit">
        <SubCategoryModal data={record} edit={true} actionRef ={actionRef}/>
      </Tooltip>,
      <Tooltip key="delete" title="Delete">
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteClick(record)}
        />
      </Tooltip>,
    ],
  };

  return (
    <>
      <ProTable
        rowKey="_id"
        cardBordered
        pagination={{
          pageSize: 5,
          showQuickJumper: false,
          showTotal: (total, range) => (
            <div>{`Showing ${range[0]}-${range[1]} of ${total} total items`}</div>
          ),
        }}
        columns={[
          {
            title: "Sub-category",
            dataIndex: "name",
            key: "name",
            hideInSearch: false,
            fieldProps: {
              placeholder: "Enter sub-category name",
            },
          },
          {
            title: "Main-category",
            dataIndex: ["main_category", "name"],
            hideInSearch: false,
            fieldProps: {
              placeholder: "Enter main-category name",
            },
          },
          actionColumn,
        ]}
        request={async (params) => {
          const data = await fetchSubCategories(params);
          return {
            data: data,
            success: true,
            total: data.length,
          };
        }}
        tableAlertRender={({ selectedRowKeys }) => {
          return <p>You have selected {selectedRowKeys.length}</p>;
        }}
        actionRef={actionRef}
        options={{
          fullScreen: true,
        }}
        rowSelection={{
          alwaysShowAlert: false,
          selections: false,
        }}
        search={{
          searchText: "Search sub-category",
          resetText: "Reset",
          labelWidth: "auto",
        }}
        dateFormatter="string"
        // headerTitle="List of sub-category"
        toolBarRender={() => [<SubCategoryModal actionRef={actionRef} />]}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete :{" "}
          <i>{deleteCandidate ? deleteCandidate.name : ""} sub-category</i>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteConfirm(actionRef)} danger>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubCategorySettings;
