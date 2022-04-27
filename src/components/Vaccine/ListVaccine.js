import React from "react";
import { GiCutDiamond } from 'react-icons/gi';
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
                                            <GiCutDiamond />
                                        </PricingCardIcon>
                                        <PricingCardPlan>{data.nameVaccine}</PricingCardPlan>
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