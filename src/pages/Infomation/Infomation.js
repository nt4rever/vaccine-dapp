import React from 'react';

import Profile from '../../components/Infomation/Profile';
import { homeObjOne } from './Data';

function Infomation() {

    return (
        <>
            <Profile {...homeObjOne}/>
        </>
    );
}

export default Infomation;