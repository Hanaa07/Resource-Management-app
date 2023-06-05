import {Box, Typography, Button, useTheme, Stack, ButtonGroup} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../Theme.tsx";
import {mockAbsences} from "../../data/mockData.tsx";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";

const Absences = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "last_name", headerName: "Nom", flex: 1, cellClassName: "name-column--cell"},
        {field: "first_name", headerName: "Prénom", flex: 1, cellClassName: "name-column--cell"},
        {field: "start_date", headerName: "Date Début", flex: 1},
        {field: "end_date", headerName: "Date Fin", flex: 1},
        {field: "days", headerName: "Nombre de jours d'absences", flex: 1},
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: () => (
                <Stack spacing={2} direction="row">
                    <ButtonGroup variant= "text" disableElevation size="small">
                        <Button sx={{color: colors.gray[100]}}><EditOutlinedIcon /></Button>
                        <Button sx={{color: colors.gray[100]}}><DeleteOutlineOutlinedIcon /></Button>
                    </ButtonGroup>
                </Stack>
            )}
    ]

    return (
        <Box m="20px">
            <Header title="ABSENCES" subtitle="Managing the Attendance of Team Members" />
            <Box m="40px 0 0 0" height="58vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.greenAccent[700],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.greenAccent[700]
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                    color: colors.gray[100]
                }
            }}>
                <DataGrid columns={columns} rows={mockAbsences} slots={{toolbar: GridToolbar}}/>
            </Box>
        </Box>
    )
}

export default Absences;