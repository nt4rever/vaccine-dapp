import React from 'react';
import { useSelector } from 'react-redux';
import { InfoSection } from '../../components';
import { homeObjOne, homeObjTwo } from './Data';

function Products() {

  return (
    <>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
    </>
  );
}

export default Products;