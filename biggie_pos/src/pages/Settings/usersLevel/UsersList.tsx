import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Avatar,
  TableSortLabel,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddUserDialog from "../../../components/MODALS/Dialogs/AddUserDialog";
import {
  createUser,
  deleteUser,
  fetchAllUsers,
  fetchUserById,
} from "../../../features/Auth/AuthActions";
import { useAppDispatch, useAppSelector } from "../../../store";
import EditUserDialog from "../../../components/MODALS/Dialogs/EditUserDialog";

interface User {
  fullname: string;
  id: number;
  name: string;
  email: string;
  phone: number;
  role: string;
}

function UsersList() {
  const { users, IsError } = useAppSelector((state) => state.auth);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [openAddUserDialog, setOpenAddUserDialog] = useState<boolean>(false);

  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.fullname?.toLowerCase().includes(filter.toLowerCase()) ||
          user.email?.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedUsers = filteredUsers.sort(
    (a, b) => {
      const isAsc = order === "asc";
      if (orderBy === "name") {
        return isAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return isAsc ? a.id - b.id : b.id - a.id;
    }
  );

  const handleDeleteUser = (userId: number) => {
    setOpenDeleteDialog(true);
    setSelectedUserId(userId);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  const handleEditUser = (userId: string) => {
    console.log("user", userId);
    dispatch(fetchUserById(userId))
    setSelectedUser(userId);

    setOpenEditUserDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId !== null) {
      dispatch(deleteUser(selectedUserId));
      handleCloseDeleteDialog();
    }
  };

  const handleAddUser = () => {
    setOpenAddUserDialog(true);
  };

  // if (IsError) {
  //   setOpenAddUserDialog(true);
  // }
  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  const handleConfirmAddUser = () => {
    if (!IsError) {
      handleCloseAddUserDialog();
    }
  };

  
  useEffect(() => {
    const dispatchFetchAllUsers = () => {
      dispatch(fetchAllUsers());
    };
    dispatchFetchAllUsers();
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h6" pt={2} pl={2} gutterBottom>
        List of all the users
      </Typography>
      <Box
        display="flex"
        columnGap={2}
        alignItems="center"
        mb={2}
        mt={2}
        sx={{ paddingLeft: 2 }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          style={{ padding: 14, backgroundColor: "#914F1E" }}
          onClick={handleAddUser}
        >
          Add New User
        </Button>
        <TextField
          label="Search User"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{ endAdornment: <SearchIcon /> }}
        />
      </Box>
      <TableContainer
        component={Paper}
        style={{
          width: "100%",
          marginTop: "1rem",
          overflowX: "auto",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#914F1E" }}>
              <TableCell style={{ color: "white" }}>
                <TableSortLabel
                  style={{ color: "white" }}
                  active={orderBy === "ProfileName"}
                  direction={orderBy === "ProfileName" ? order : "asc"}
                  onClick={() => handleSort("ProfileName")}
                >
                  <Box display="flex" alignItems="center">
                    <GroupIcon style={{ marginRight: "4px" }} />
                    Profile Name
                    {orderBy === "ProfileName" && (
                      <ArrowDropDownIcon
                        style={{
                          transform:
                            order === "asc" ? "rotate(0deg)" : "rotate(180deg)",
                        }}
                      />
                    )}
                  </Box>
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <TableSortLabel
                  style={{ color: "white" }}
                  active={orderBy === "fullname"}
                  direction={orderBy === "fullname" ? order : "asc"}
                  onClick={() => handleSort("fullname")}
                >
                  <Box display="flex" alignItems="center">
                    <BusinessIcon style={{ marginRight: "4px" }} />
                    Fullname
                    {orderBy === "fullname" && (
                      <ArrowDropDownIcon
                        style={{
                          transform:
                            order === "asc" ? "rotate(0deg)" : "rotate(180deg)",
                        }}
                      />
                    )}
                  </Box>
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <TableSortLabel
                  style={{ color: "white" }}
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={() => handleSort("email")}
                >
                  <Box display="flex" alignItems="center">
                    <EmailIcon style={{ marginRight: "4px" }} /> {/* Icon */}
                    Email
                    {orderBy === "email" && (
                      <ArrowDropDownIcon
                        style={{
                          transform:
                            order === "asc" ? "rotate(0deg)" : "rotate(180deg)",
                        }}
                      />
                    )}
                  </Box>
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <TableSortLabel
                  style={{ color: "white" }}
                  active={orderBy === "phone"}
                  direction={orderBy === "phone" ? order : "asc"}
                  onClick={() => handleSort("phone")}
                >
                  <Box display="flex" alignItems="center">
                    <PhoneIcon style={{ marginRight: "4px" }} /> {/* Icon */}
                    Phone
                    {orderBy === "phone" && (
                      <ArrowDropDownIcon
                        style={{
                          transform:
                            order === "asc" ? "rotate(0deg)" : "rotate(180deg)",
                        }}
                      />
                    )}
                  </Box>
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <TableSortLabel
                  style={{ color: "white" }}
                  active={orderBy === "role"}
                  direction={orderBy === "role" ? order : "asc"}
                  onClick={() => handleSort("role")}
                >
                  <Box display="flex" alignItems="center">
                    <SupervisorAccountIcon style={{ marginRight: "4px" }} />
                    Role
                  </Box>
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <TableSortLabel
                  style={{ color: "white" }}
                  active={orderBy === "actions"}
                  direction={orderBy === "actions" ? order : "asc"}
                  onClick={() => handleSort("actions")}
                >
                  <Box display="flex" alignItems="center">
                    <MoreVertIcon style={{ marginRight: "4px" }} />
                    Action
                  </Box>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                (user) => (
                  <TableRow key={user._id}>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 5,
                      }}
                    >
                      <Avatar alt={user.username} src={user.username} />
                      {user.username}
                    </TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>0{user.phone}</TableCell>
                    <TableCell>{user.isAdmin ? "Admin" : "user"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteUser(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditUser(user._id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* add user */}
      <AddUserDialog
        open={openAddUserDialog || IsError}
        onClose={handleCloseAddUserDialog}
        onAddUser={(user) => {
          console.log(user);
        }}

      />
      {/* Edit user */}
        <EditUserDialog
        open={openEditUserDialog}
        onClose={() => setOpenEditUserDialog(false)}
        userId={selectedUser}
      />
    </div>
  );
}

export default UsersList;
