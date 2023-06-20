import {Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, useTheme, Typography} from "@mui/material";
import DatepickerField from "./DatepickerField.tsx";
import {Formik, FormikValues} from "formik";
import * as yup from "yup";
import {useMediaQuery} from "@mui/material";
import {tokens} from "../Theme.tsx";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {UserType} from "../Types/UserType.tsx";


type UserProps = {
    initialValues: UserType,
    onSubmit: (value: FormikValues) => void,
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const UserForm = (props: UserProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState<string>("UserForm");
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const {initialValues, onSubmit} = props;



    const userSchema = yup.object().shape({
        nom: yup.string().required("required"),
        prenom: yup.string().required("required"),
        adresse_mail: yup.string().email("email invalide").required("required"),
        num_tel: yup
            .string()
            .matches(phoneRegExp, "Num invalide")
            .required("required"),
        start_date: yup.date().required("required"),
        statut: yup.string().required("required"),
        adresse: yup.string().required("required"),
        exp_pro: yup.date().required("required"),
        exp_mit: yup.date().required("required"),
        birth: yup.date().required("required"),
        balance: yup.number().required("requrired"),
    })

    return <Box m="20px">
        <Formik
            initialValues={initialValues}
            onSubmit={values => onSubmit(values)}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue}) => (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                        sx={{
                            "& > div" : { gridColumn: isNonMobile ? undefined : "span 2"},
                            "& .css-jl329p-MuiFormLabel-root-MuiInputLabel-root.Mui-focused" : {
                                color : colors.gray[100],
                            },
                            "& .css-5evozk-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" : {
                                color : colors.gray[100],
                                borderColor : colors.gray[100],
                            },
                            "& .css-lbnksu-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline" : {
                                borderColor : colors.gray[100],
                            },
                            "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" : {
                                borderColor : colors.gray[100],
                            },
                            "& .css-5evozk-MuiInputBase-root-MuiOutlinedInput-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
                            "& .css-lbnksu-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
                            "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
                        }}
                    >
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Nom"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("nom", e.target.value)
                            }}
                            value={values.nom}
                            name="nom"
                            error={!!touched.nom && !!errors.nom}
                            helpertext={touched.nom && errors.nom}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Prénom"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("prenom", e.target.value)
                            }}
                            value={values.prenom}
                            name="prenom"
                            error={!!touched.prenom && !!errors.prenom}
                            helpertext={touched.prenom && errors.prenom}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="N° de téléphone"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("num_tel", e.target.value)
                            }}
                            value={values.num_tel}
                            name="num_tel"
                            error={!!touched.num_tel && !!errors.num_tel}
                            helpertext={touched.num_tel && errors.num_tel}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Adresse mail"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("adresse_mail", e.target.value)
                            }}
                            value={values.adresse_mail}
                            name="adresse_mail"
                            error={!!touched.adresse_mail && !!errors.adresse_mail}
                            helpertext={touched.adresse_mail && errors.adresse_mail}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <FormControl fullwidth="true" sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="select-statut">Statut</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="select-statut"
                                id="select-statut"
                                label="Statut"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setFieldValue("statut", e.target.value)
                                }}
                                value={values.statut}
                                name="statut"
                                error={!!touched.statut && !!errors.statut}
                                helpertext={touched.statut && errors.statut}
                                selectprops={{
                                    multiple: true
                                }}>
                                <MenuItem value="intern">intern</MenuItem>
                                <MenuItem value="employee">employee</MenuItem>
                                <MenuItem value="admin">admin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Adresse"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("adresse", e.target.value)
                            }}
                            value={values.adresse}
                            name="adresse"
                            error={!!touched.adresse && !!errors.adresse}
                            helpertext={touched.adresse && errors.adresse}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <DatepickerField
                            name="start_date"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.start_date && !!errors.start_date}
                            helpertext={touched.start_date && errors.start_date}
                            slotProps={{ textField: {label: "Date d'entrée"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <DatepickerField
                            name="exp_mit"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.exp_mit && !!errors.exp_mit}
                            helpertext={touched.exp_mit && errors.exp_mit}
                            slotProps={{ textField: {label: "Expérience à MonarkIT"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <DatepickerField
                            name="exp_pro"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.exp_pro && !!errors.exp_pro}
                            helpertext={touched.exp_pro && errors.exp_pro}
                            slotProps={{ textField: {label: "Expérience professionelle"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <DatepickerField
                            name="birth"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.birth && !!errors.birth}
                            helpertext={touched.birth && errors.birth}
                            slotProps={{ textField: {label: "Date de naissance"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="tel"
                            label="Solde"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("balance", e.target.value)
                            }}
                            value={values.balance}
                            name="balance"
                            error={!!touched.balance && !!errors.balance}
                            helpertext={touched.balance && errors.balance}
                            sx={{ gridColumn: "span 2" }}
                        />
                    </Box>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            type="reset"
                            color="error"
                            variant="contained"
                            disableElevation
                            style={{ marginRight: "10px" }}
                            sx={{ backgroundColor: colors.redAccent[600], color: colors.gray[100] }}
                            onClick={() => navigate(-1)}
                        >
                                <Typography>Annuler</Typography>
                        </Button>
                        <Button
                            type={'submit'}
                            color = "secondary"
                            sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                            variant="contained"
                            disableElevation
                        >
                            <Typography>Confirmer</Typography>
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    </Box>
}

export default UserForm;