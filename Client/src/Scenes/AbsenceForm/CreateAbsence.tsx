import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {AbsenceType} from "../../Types/AbsenceType.tsx";
import React, {useEffect, useState} from "react";
import AbsenceForm from "../../Components/AbsenceForm.tsx";
import {HttpClient} from "../../utils/request.ts";
import {useNavigate, useParams} from "react-router-dom";
import {SoldeType} from "../../Types/SoldeType.tsx";
import {useCookies} from "react-cookie";
import {UserType} from "../../Types/UserType.tsx";

const CreateAbsence = () => {
    const {userId} = useParams();
    const [absence, setAbsence] = useState<AbsenceType>(null);
    const [lastSolde, setLastSolde] = useState<SoldeType>(null);
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const [user, setUser] = useState<UserType>(null);

    const initialValues: AbsenceType = {
        absenceStartedAt: "",
        absenceEndedAt: "",
        days: undefined,
    }
    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/user/"+ userId, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {

            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);
            if (receivedData.success === true) {
                setUser(receivedData.data);
            }
        });
    }, [userId]);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get('/user/'+userId+'/lastSolde', {
            headers: {
                'Authorization': 'Bearer' + jwt
            }
        }).then((res) => {
            setIsConnected(res.data.isAuthorised);
            if (res.data.success) {
                setLastSolde(res.data.data)
            }
        })
    }, [])


    const handleSubmit = (values: AbsenceType) => {

        const jwt = cookies.jwt ? cookies.jwt : '';
        values = {...values, soldeId: lastSolde._id}
        console.log(values)

        HttpClient.post('/user/absence/new', values, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);
            if (receivedData.success === true) {
                return navigate('/user/'+userId+'/absences')
            }

        });
    };

    return (
        <Box m="20px">
            <Header title="AJOUT ABSENCE" subtitle={`Ajout d'une nouvelle absence pour ${user?.firstName} ${user?.lastName}`} />
            <AbsenceForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

export default CreateAbsence;


