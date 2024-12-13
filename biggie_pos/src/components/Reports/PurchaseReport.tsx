import React, { Key, useRef } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PrintDisabledIcon from "@mui/icons-material/PrintDisabled";
import { useReactToPrint } from "react-to-print";
import { useAppSelector } from "../../store";
import Spinner from "../spinner/Spinner";
import "../MODALS/bill.css";
import { Spin } from "antd/lib";
import { BRAND_NAME, COOP_NAME } from "@utils/config";
import moment from "moment";
import useSystemDetails from "@hooks/useSystemDetails";
import NubaLoader from "@components/spinner/NubaLoader";

interface PurchaseReportProps {
  openM: boolean;
  onCloseM: () => void;
  startDate: any;
  endDate: any;
}

const PurchaseReportModal: React.FC<PurchaseReportProps> = ({
  openM,
  onCloseM,
  startDate,
  endDate,
}) => {
  const { BRAND_NAME1 } = useSystemDetails();
  const componentRef = useRef<HTMLDivElement>(null);
  const { purchaseReport: data, loading } = useAppSelector(
    (state) => state.Report
  );
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: onCloseM,
  });
  if (loading) {
    return (
      <Spin
        size="large"
        fullscreen
        indicator={<NubaLoader />}
        tip="Generating Purchase report Please wait ..."
      />
    );
  }
  return (
    <Dialog open={openM} onClose={onCloseM} maxWidth="sm" fullWidth>
      <DialogContent className="receiptM" ref={componentRef}>
        <div className="receipt" id="receipt">
          <div
            className="logo-print"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h5"
              textAlign={'center'}
              sx={{ fontFamily: "monospace", fontWeight: "bold" }}
            >
              {BRAND_NAME1}
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
              SALES REPORT
            </Typography>
          </div>
          <p style={{ textAlign: "center", padding: "10px" }}>
            From: {moment(startDate).format("MMM-DD-YYYY H:MM A")} <br /> to{" "}
            <br /> {moment(endDate).format("MMM-DD-YYYY H:MM A")}
          </p>

          <TableContainer sx={{ mt: 2, width: "100%", mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>NO.</TableCell>
                  <TableCell sx={{ fontWeight: "bold", padding: 0 }}>
                    METHOD
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                    AMOUNT(Ksh.)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.payment_methods.map((item: any, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id ? <>{index + 1}</> : ""}</TableCell>
                    <TableCell sx={{ padding: "8px", fontWeight: "bold" }}>
                      {item.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
                      {item.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    Overall Total: {data?.totalCost.toLocaleString()}
                  </TableCell>
                  
                </TableRow>
                 
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Overall Discount:{" "}
                        <span>
                          {data?.totalDiscountAmount?.toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Overall inclusive discount:{" "}
                        <span>
                          {data?.totalInclusiveDiscount?.toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>

                    
              </TableBody>
            </Table>
          </TableContainer>

          <Typography
            variant="body1"
            style={{
              fontSize: "1em",
              fontFamily: "monospace",
              textAlign: "center",
            }}
          >
            Powered by: {COOP_NAME}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", fontSize: "0.9em" }}
          >
            Generated on {moment(Date()).format("MMM/DD/YYYY H:MM A")}
          </Typography>
        </div>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-evenly",
            columnGap: 5,
          }}
        >
          <Button
            className="hidden-print"
            variant="outlined"
            sx={{
              pl: 2,
              color: "#914F1E",
              borderColor: "#914F1E",
              "&:hover": {
                borderColor: "#bc8c7c",
                color: "#bc8c7c",
              },
            }}
            onClick={handlePrint}
            endIcon={<LocalPrintshopIcon />}
          >
            Print
          </Button>
          <Button
            className="hidden-print"
            variant="contained"
            sx={{
              pl: 2,
              bgcolor: "#914F1E",
              "&:hover": {
                bgcolor: "#bc8c7c",
                color: "#ffff",
              },
            }}
            onClick={onCloseM}
            endIcon={<PrintDisabledIcon />}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseReportModal;
