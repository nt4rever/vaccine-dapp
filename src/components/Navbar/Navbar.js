import React, { useState, useEffect } from 'react'
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    HamburgerIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavItemBtn,
} from './Navbar.elements'
import { FaTimes, FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib'
import { Button } from '../../globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../../actions/infoAction';
import { addVaccine } from '../../actions/vaccineActions';

function Navbar() {
    const { account } = useSelector((state) => state.accountReducer)
    const info = useSelector((state) => state.infoReducer)
    const web3Api = useSelector((state) => state.Web3Reducer);
    const dispatch = useDispatch();

    const connectWallet = async () => {
        web3Api.provider.request({ method: 'eth_requestAccounts' });
        const { contract } = web3Api;
        const u = await contract.getUser(account, {
            from: account
        });
        dispatch(setInfo({
            name: u[0],
            age: u[1],
            dateOfBirth: u[2],
            address: u[3]
        }))

        const data = await contract.readVaccine({
            from: account
        });

        data.forEach(el => {
            dispatch(addVaccine({
                vaccine: el['nameVaccine'],
                date: el['date'],
                vaccinationFacility: el['vaccinationFacility'],
                dose: el['dose']
            }))
        });
    }

    const [click, setClick] = useState(false);
    const [homeClick, setHomeClick] = useState(false);
    const [infoClick, setInfoClick] = useState(false);
    const [servicesClick, setServicesClick] = useState(false);
    const [VaccineClick, setVaccineClick] = useState(false);

    const handleHomeClick = () => {
        setHomeClick(true);
        setInfoClick(false);
        setVaccineClick(false);
        setServicesClick(false);
    }
    const handleInfoClick = () => {
        setHomeClick(false);
        setInfoClick(true);
        setVaccineClick(false);
        setServicesClick(false);
    }
    const handleServicesClick = () => {
        setHomeClick(false);
        setInfoClick(false);
        setVaccineClick(false);
        setServicesClick(true);
    }
    const handleVaccineClick = () => {
        setHomeClick(false);
        setInfoClick(false);
        setVaccineClick(true);
        setServicesClick(false);
    }
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to='/'>
                            <NavIcon />
                            Vaccine
                        </NavLogo>
                        <HamburgerIcon onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </HamburgerIcon>
                        <NavMenu onClick={handleClick} click={click} >
                            <NavItem onClick={handleHomeClick} homeClick={homeClick}>
                                <NavLinks to='/' onClick={closeMobileMenu}>
                                    Home
                                </NavLinks>
                            </NavItem>

                            <NavItem onClick={handleInfoClick} infoClick={infoClick}>
                                <NavLinks to='/infomation' onClick={closeMobileMenu}>
                                    Infomation
                                </NavLinks>
                            </NavItem>


                            <NavItem onClick={handleServicesClick} servicesClick={servicesClick}>
                                <NavLinks to='/services' onClick={closeMobileMenu}>
                                    Services
                                </NavLinks>
                            </NavItem>


                            <NavItem onClick={handleVaccineClick} VaccineClick={VaccineClick}>
                                <NavLinks to='/vaccine' onClick={closeMobileMenu}>
                                    Vaccine
                                </NavLinks>
                            </NavItem>
                            (<NavItemBtn>
                                {info.name ? (<Button fontBig primary>{info.name}</Button>) : (<Button onClick={connectWallet} fontBig primary>CONNECT</Button>)}
                            </NavItemBtn>)
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
