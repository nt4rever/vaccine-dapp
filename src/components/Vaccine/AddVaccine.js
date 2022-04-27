import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { addVaccine } from "../../actions/vaccineActions";

function AddVaccine() {

    const web3Api = useSelector((state) => state.Web3Reducer);
    const { account } = useSelector((state) => state.accountReducer)
    const [newVaccine, setNewVaccine] = useState({ nameVaccine: null, date: null, vaccinationFacility: null });
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setNewVaccine({
            ...newVaccine,
            [event.target.name]: event.target.value
        })
    }

    const updateVaccine = async () => {
        const { contract } = web3Api;
        await contract.addVaccine(newVaccine.nameVaccine, newVaccine.date, newVaccine.vaccinationFacility, { from: account });
        dispatch(addVaccine(newVaccine))
    }

    return (
        <div className="profile-wrapper">
            <Stack
                component="form"
                sx={{
                    width: '50ch',
                    padding: '20px'
                }}
                spacing={2}
                noValidate
                autoComplete="off"
            >
                <h2>Add vaccine</h2>

                <TextField id="nameVaccine" label="Vaccine Name" variant="outlined" name="nameVaccine" onChange={handleChange} value={newVaccine.nameVaccine ? (newVaccine.nameVaccine) : ""} />
                <TextField id="vaccinationFacility" label="Vaccination Facility" variant="outlined" name="vaccinationFacility" onChange={handleChange} value={newVaccine.vaccinationFacility ? (newVaccine.vaccinationFacility) : ""} />
                <TextField
                    id="date"
                    label="Date of birth"
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={newVaccine.date ? (newVaccine.date) : "2021-11-25"}
                    sx={{ width: '45ch' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="outlined" size="large" onClick={updateVaccine}>
                    Update
                </Button>
            </Stack>
        </div>
    )
}

export default AddVaccine;