import { Box, Typography, Button, useTheme, Stack, ButtonGroup} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {Link, useParams} from "react-router-dom";
import { tokens } from "../../Theme.tsx";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {HttpClient} from "../../utils/request.ts";

const SoldeUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [soldes, setSoldes] = useState([]);
    const { soldeId } = useParams();
    const { userId}= useParams();

    useEffect(() => {
        HttpClient.get("/solde/" + soldeId).then(res => {
            let receivedData = res.data;

            if (receivedData.success === true) {
                setSoldes(receivedData.data);
            }
        });
    }, []);

    const columns = [
        { field: "balanceStartedAt", headerName: "Date Début", flex: 1, cellClassName: "name-column--cell" },
        { field: "balanceEndedAt", headerName: "Date Fin", flex: 1, cellClassName: "name-column--cell" },
        { field: "initialDays", headerName: "Solde", flex: 1 },
        { field: "remainingDays", headerName: "jours restants du solde", flex: 1 },
        {
            field: "actions",
            sortable: false,
            headerName: "Actions",
            flex: 1,
            renderCell: ({row}) => (
                <Stack spacing={2} direction="row">
                    <ButtonGroup variant="text" disableElevation size="small">
                        <Link to={"/solde/edit"+ row._id} style={{textDecoration: "none",color: colors.gray[100]}}>
                            <Button sx={{ color: colors.gray[100] }}>
                                <EditOutlinedIcon />
                            </Button>
                        </Link>
                        <Button sx={{ color: colors.gray[100] }}>
                            <DeleteOutlineOutlinedIcon onClick={()=> {
                                HttpClient.get('/solde/delete/'+ row._id).then((res)=> {
                                    console.log(res)
                                });
                            }}/>
                        </Button>
                    </ButtonGroup>
                </Stack>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="SOLDES" subtitle="Liste des soldes de " />
            <Box
                m="40px 0 0 0"
                height="58vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.greenAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: `${colors.primary[400]} transparent`,
                        backdropFilter: "blur(9px)",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.greenAccent[700],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                        color: colors.gray[100]
                    }
                }}
            >
                {soldes && <DataGrid columns={columns} rows={soldes} slots={{toolbar: GridToolbar}}/>}
            </Box>
            <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Link to={"/solde/new/"+ userId}>
                <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                    startIcon={<AddIcon/>}
                    disableElevation
                >
                    <Typography variant="body2">Ajouter un solde</Typography>
                </Button>
            </Link>
            </Box>
        </Box>
    );
};

export default SoldeUser;
