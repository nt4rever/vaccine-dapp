import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { addVaccine } from "../../actions/vaccineActions";
import { vaccineData } from "../../pages/Vaccine/Data.js";

function AddVaccine() {
    const web3Api = useSelector((state) => state.Web3Reducer);
    const { account } = useSelector((state) => state.accountReducer);
    const [newVaccine, setNewVaccine] = useState({
        dose: 0,
        vaccine: "",
        nameVaccine: null,
        date: null,
        vaccinationFacility: null,
    });
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setNewVaccine({
            ...newVaccine,
            [event.target.name]: event.target.value,
        });
    };
        console.log(vaccineData.find(item => item.value === newVaccine.vaccine));

    const updateVaccine = async () => {
        const { contract } = web3Api;
        await contract.addVaccine(
            newVaccine.nameVaccine,
            newVaccine.date,
            newVaccine.vaccinationFacility,
            { from: account }
        );
        dispatch(addVaccine(newVaccine));
    };

    return (
        <div className="profile-wrapper">
            <Stack
                component="form"
                sx={{
                    width: "50ch",
                    padding: "20px",
                }}
                spacing={2}
                noValidate
                autoComplete="off"
            >
                <h2>Add vaccine</h2>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Dose</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={newVaccine.dose ? newVaccine.dose : ""}
                        label="Dose"
                        name="dose"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Dose 1</MenuItem>
                        <MenuItem value={2}>Dose 2</MenuItem>
                        <MenuItem value={3}>Dose 3</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="vaccine-name-label">Vaccine Name</InputLabel>
                    <Select
                        labelId="vaccine-name-label"
                        value={newVaccine.vaccine ? newVaccine.vaccine : ""}
                        label="Vaccine Name"
                        name="vaccine"
                        onChange={handleChange}
                    >
                        {vaccineData.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="nameVaccine"
                    label="Vaccine Name"
                    variant="outlined"
                    name="nameVaccine"
                    onChange={handleChange}
                    value={newVaccine.nameVaccine ? newVaccine.nameVaccine : ""}
                />
                <TextField
                    id="vaccinationFacility"
                    label="Vaccination Facility"
                    variant="outlined"
                    name="vaccinationFacility"
                    onChange={handleChange}
                    value={
                        newVaccine.vaccinationFacility
                            ? newVaccine.vaccinationFacility
                            : ""
                    }
                />
                <TextField
                    id="date"
                    label="Date of Injection"
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={newVaccine.date ? newVaccine.date : "2021-11-25"}
                    sx={{ width: "45ch" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="outlined" size="large" onClick={updateVaccine}>
                    Update
                </Button>
            </Stack>
        </div>
    );
}

export default AddVaccine;
