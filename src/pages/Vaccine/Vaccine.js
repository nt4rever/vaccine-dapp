import React from 'react';
import { useSelector } from 'react-redux';
import AddVaccine from '../../components/Vaccine/AddVaccine';
import ListVaccine from '../../components/Vaccine/ListVaccine'

function Vaccine() {
  const info = useSelector((state) => state.infoReducer)
  return (
    <>
      <ListVaccine />
      {(info.name == null) ? "" : (<AddVaccine />)}
    </>
  );
}

export default Vaccine;