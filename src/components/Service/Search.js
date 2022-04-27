import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Search.css"
import { useSelector } from "react-redux";

function Search() {
    const [address, setAddress] = useState("");
    const [vaccineData, setVaccineData] = useState([]);
    const web3Api = useSelector((state) => state.Web3Reducer);

    const getVaccineData = async () => {
        if (address != "") {
            const { contract } = web3Api;
            const data = await contract.readVaccine({
                from: address
            });
            const vcData = [];
            data.forEach(el => {
                vcData.push({
                    nameVaccine: el['nameVaccine'],
                    date: el['date'],
                    vaccinationFacility: el['vaccinationFacility']
                });
            });
            setVaccineData(vcData);
        }
    }

    const handleChange = (event) => {
        setAddress(event.target.value)
    }
    return (
        <>
            <div className="search-wrapper">
                <Stack>
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
                        <h2>Search vaccine data</h2>
                        <TextField id="sreach" label="Address" variant="outlined" name="address" onChange={handleChange} value={address ? (address) : ""} />
                        <Button variant="outlined" size="large" onClick={getVaccineData}>
                            Search
                        </Button>

                    </Stack>
                    <Stack>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Vaccine name</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Vaccination facility</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {vaccineData.map((row) => (
                                        <TableRow
                                            key={row.nameVaccine}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.nameVaccine}
                                            </TableCell>
                                            <TableCell align="right">{row.date}</TableCell>
                                            <TableCell align="right">{row.vaccinationFacility}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Stack>
            </div>
        </>
    )
}

export default Search;