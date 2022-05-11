import React from "react";
import { FaSyringe } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { useDispatch, useSelector } from "react-redux";
import {
    PricingSection,
    PricingWrapper,
    PricingHeading,
    PricingContainer,
    PricingCard,
    PricingCardInfo,
    PricingCardIcon,
    PricingCardPlan,
    PricingCardLength,
    PricingCardFeatures,
    PricingCardFeature
} from '../../components/Pricing/Pricing.elements';
import { vaccineData } from "../../pages/Vaccine/Data";

function ListVaccine() {
    const listVaccine = useSelector((state) => state.vaccineReducer)
    return (
        <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }}>
            <PricingSection>
                <PricingWrapper>
                    <PricingHeading>Your vaccine infomation</PricingHeading>
                    <PricingContainer>
                        {
                            listVaccine.map((data) => (
                                <PricingCard>
                                    <PricingCardInfo>
                                        <PricingCardIcon>
                                            <FaSyringe />
                                        </PricingCardIcon>
                                        <PricingCardPlan>{vaccineData.find(x => x.value === data.nameVaccine).name}</PricingCardPlan>
                                        <PricingCardPlan>Dose {data.dose}</PricingCardPlan>
                                        <PricingCardLength>{data.date}</PricingCardLength>
                                        <PricingCardFeatures>
                                            <PricingCardFeature>{data.vaccinationFacility}</PricingCardFeature>
                                        </PricingCardFeatures>
                                    </PricingCardInfo>
                                </PricingCard>
                            ))
                        }
                    </PricingContainer>
                </PricingWrapper>
            </PricingSection>
        </IconContext.Provider>
    )
}

export default ListVaccine;