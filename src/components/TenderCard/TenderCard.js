import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex } from 'ustudio-ui';

const TenderCard = ({ location }) => {
  const [item] = useState(location.item);

  if (item === undefined) {
    return (
      <Flex
        alignment={{
          horizontal: 'center',
          vertical: 'center',
        }}
        direction="column"
      >
        <h4>Sorry, can't find such tender, Try another one</h4>
        <div />
        <Link to="/">Go back</Link>{' '}
      </Flex>
    );
  }
  const { title } = item.records[0].compiledRelease.tender;
  const { date } = item.records[0].compiledRelease;
  const { description } = item.records[0].compiledRelease.tender.classification;
  const name = item.records[0].compiledRelease.parties?.[0].contactPoint.name;
  const telephone =
    item.records[0].compiledRelease.parties?.[0].contactPoint.telephone;
  const email = item.records[0].compiledRelease.parties?.[0].contactPoint.email;
  const amount = item.records[0].compiledRelease.planning?.budget.amount.amount;
  const currency =
    item.records[0].compiledRelease.planning?.budget.amount.currency;
  const startDate =
    item.records[0].compiledRelease.planning?.budget.budgetBreakdown[0].period
      .startDate;
  const endDate =
    item.records[0].compiledRelease.planning?.budget.budgetBreakdown[0].period
      .endDate;
  const address =
    item.records[0].compiledRelease.parties?.[0].address.streetAddress;
  const country =
    item.records[0].compiledRelease.parties?.[0].address.addressDetails.country
      .description;
  const customer =
    item.records[0].compiledRelease.parties?.[0].details.typeOfBuyer;

  return (
    <div>
      <Link to="/"> ← All Tenders</Link>
      <div
        style={{
          fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
          width: '70%',
          marginLeft: '15%',
        }}
      >
        <Flex
          alignment={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <h5>{title} </h5>
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
          Date of Publish: {new Date(date).toLocaleString()}
        </Flex>

        <Flex direction="column">
          <span style={{ fontSize: '13px' }}>Description:</span>
          {description}
        </Flex>
        <Flex margin={{ top: 'regular' }} style={{ fontSize: '15px' }}>
          Customer: {customer}
        </Flex>
        <Flex margin={{ top: 'large' }} style={{ color: 'green' }}>
          {' '}
          <span>
            Tender start date: {new Date(startDate).toLocaleDateString()}
          </span>{' '}
        </Flex>
        <Flex>
          {' '}
          Tender Amount: {amount} {currency}
        </Flex>
        <Flex style={{ color: 'red' }}>
          {' '}
          Tender end Date: {new Date(endDate).toLocaleDateString()}
        </Flex>

        <Flex
          alignment={{
            vertical: 'end',
            horizontal: 'end',
          }}
          direction="column"
          margin={{ top: 'large' }}
          style={{
            fontStyle: 'italic',
            fontFamily: 'Courier New, Courier, monospace',
          }}
        >
          <div>Contact info:</div>
          <div>name: {name} </div>
          <div>email: {email}</div>
          <div>Tel: {telephone}</div>
          <div>Address: {address}</div>
          <div>Country: {country}</div>
        </Flex>
      </div>
    </div>
  );
};

export default TenderCard;
