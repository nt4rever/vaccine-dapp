import React from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { setInfo as setInfoAction } from "../../actions/infoAction";

function Profile() {
    const info = useSelector((state) => state.infoReducer)
    const { account } = useSelector((state) => state.accountReducer)
    const web3Api = useSelector((state) => state.Web3Reducer);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setInfoAction({
            ...info,
            [event.target.name]: event.target.value,
        }))
    }
    const updateInfo = async () => {
        const { contract } = web3Api;
        await contract.createUser(info.name, info.age, info.dateOfBirth, { from: account });
    }

    return (
        <>
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
                    <h2>Your Profile</h2>
                    <TextField id="fullname" label="Full name" variant="outlined" name="name" onChange={handleChange} value={info.name ? (info.name) : ""} />
                    <TextField id="age" label="Age" variant="outlined" name="age" onChange={handleChange} value={info.age ? (info.age) : ""} />
                    <TextField id="dateOfBirth" label="Date of birth" variant="outlined" name="dateOfBirth" onChange={handleChange} value={info.dateOfBirth ? (info.dateOfBirth) : ""} />
                    <Button variant="outlined" size="large" onClick={updateInfo}>
                        Update
                    </Button>
                </Stack>
            </div>
        </>
    )
}

export default Profile;