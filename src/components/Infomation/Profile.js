import React from 'react'
import { InfoSec, InfoRow, InfoColumn, ImgWrapper, Img } from '../InfoSection/InfoSection.elements'
import { Container } from '../../globalStyles'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { setInfo as setInfoAction } from "../../actions/infoAction";

function Profile({
    lightBg,
    img,
    alt,
    imgStart,
    start
}) {
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
            <InfoSec lightBg={lightBg}>
                <Container>
                    <InfoRow imgStart={imgStart}>
                        <InfoColumn>
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
                                    <TextField
                                        id="dateOfBirth"
                                        label="Date of birth"
                                        type="date"
                                        name="dateOfBirth"
                                        onChange={handleChange}
                                        value={info.dateOfBirth ? (info.dateOfBirth) : "2017-05-24"}
                                        sx={{ width: '45ch' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Chip label={account} variant="outlined" />
                                    <Button variant="outlined" size="large" onClick={updateInfo}>
                                        Update
                                    </Button>
                                </Stack>
                            </div>
                        </InfoColumn>
                        <InfoColumn>
                            <ImgWrapper start={start}>
                                <Img src={img} alt={alt} />
                            </ImgWrapper>
                        </InfoColumn>
                    </InfoRow>
                </Container>
            </InfoSec>

        </>
    )
}

export default Profile;