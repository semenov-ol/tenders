import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';
import styled from 'styled-components';

import TendersAPI from '../services/tendersAPI';

const TenderCard = () => {
  const { pathname } = useLocation();
  const [tenderData, setTenderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getOne } = new TendersAPI();

  const ocid = pathname.slice(6);

  useEffect(() => {
    getOne(ocid)
      .then(data => {
        setTenderData(data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [ocid]);

  const dateToString = date => {
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Flex
        alignment={{
          horizontal: 'center',
          vertical: 'end',
        }}
      >
        <Spinner
          className="spinner"
          appearance={{
            size: 50,
          }}
        />
      </Flex>
    );
  } else {
    if (tenderData === undefined || tenderData.records?.[0].compiledRelease.tender.title === undefined) {
      return (
        <Flex
          alignment={{
            horizontal: 'center',
            vertical: 'center',
          }}
          direction="column"
        >
          <Text variant="h4" style={{ marginBottom: '30px' }}>
            Sorry, can't find such tender, Try another one
          </Text>
          <Link to="/">
            <Text style={{ fontSize: '20px' }}>Go back</Text>
          </Link>
        </Flex>
      );
    }
    const title = tenderData.records?.[0].compiledRelease.tender.title;
    const date = tenderData.records?.[0].compiledRelease.date;
    const description = tenderData.records?.[0].compiledRelease.tender.classification?.description;
    const name = tenderData.records?.[0].compiledRelease.parties?.[0].contactPoint?.name;
    const telephone = tenderData.records?.[0].compiledRelease.parties?.[0].contactPoint.telephone;
    const email = tenderData.records?.[0].compiledRelease.parties?.[0].contactPoint.email;
    const amount = tenderData.records?.[0].compiledRelease.planning?.budget.amount.amount;
    const currency = tenderData.records?.[0].compiledRelease.planning?.budget.amount.currency;
    const startDate = tenderData.records?.[0].compiledRelease.planning?.budget.budgetBreakdown[0].period.startDate;
    const endDate = tenderData.records?.[0].compiledRelease.planning?.budget.budgetBreakdown[0].period.endDate;
    const address = tenderData.records?.[0].compiledRelease.parties?.[0].address.streetAddress;
    const country = tenderData.records?.[0].compiledRelease.parties?.[0].address.addressDetails.country.description;
    const customer = tenderData.records?.[0].compiledRelease.parties?.[0].details.typeOfBuyer;

    return (
      <React.Fragment>
        <Link to="/"> ← All Tenders</Link>
        <ContainerDiv>
          <Flex
            alignment={{
              vertical: 'center',
              horizontal: 'center',
            }}
            style={{
              borderBottom: '1px dashed grey',
            }}
          >
            <Text variant="h5" style={{ padding: '20px' }}>
              {title}
            </Text>
          </Flex>
          <Flex
            alignment={{
              vertical: 'end',
              horizontal: 'end',
            }}
            style={{
              fontSize: '12px',
              color: 'grey',
            }}
          >
            Date of Publish: {dateToString(date)}
          </Flex>
          <Flex direction="column" style={{ marginTop: '30px' }}>
            <Text variant="small">Description:</Text>
            <Text variant="h6"> {description}</Text>
          </Flex>
          <Flex
            direction="row"
            alignment={{
              vertical: 'end',
              horizontal: 'space-between',
            }}
            margin={{ top: 'large' }}
          >
            <Text
              variant="h6"
              style={{ color: 'green', borderRight: '1px solid grey', paddingRight: '4%', fontSize: '13px' }}
            >
              Tender start date: {dateToString(startDate)}
            </Text>
            <Text
              variant="h6"
              style={{
                color: 'grey',
                borderRight: '1px solid grey',
                paddingRight: '4%',
                paddingLeft: '2%',
                fontSize: '13px',
              }}
            >
              Tender Amount: {amount} {currency}
            </Text>
            <Text variant="h6" style={{ color: 'red', fontSize: '13px', paddingLeft: '2%' }}>
              Tender end Date: {dateToString(endDate)}
            </Text>
          </Flex>
          <Flex margin={{ top: 'regular' }} style={{ fontSize: '15px' }}>
            <Text variant="caption">Customer: {customer}</Text>
          </Flex>
          <Flex
            alignment={{
              vertical: 'end',
              horizontal: 'end',
            }}
            direction="column"
            margin={{ top: 'large' }}
            padding={{ top: 'medium' }}
            style={{
              color: 'grey',
              fontStyle: 'italic',
              fontFamily: 'Courier New, Courier, monospace',
              borderTop: '1px dashed grey',
            }}
          >
            <Text variant="small">Contact info:</Text>
            <Text variant="small">name: {name} </Text>
            <Text variant="small">email: {email}</Text>
            <Text variant="small">Tel: {telephone}</Text>
            <Text variant="small">Address: {address}</Text>
            <Text variant="small">Country: {country}</Text>
          </Flex>
        </ContainerDiv>
      </React.Fragment>
    );
  }
};

const ContainerDiv = styled.div`
  fontfamily: Verdana, Geneva, Tahoma, sans-serif;
  width: 70%;
  margin-left: 15%;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 20px;
`;

export default TenderCard;
