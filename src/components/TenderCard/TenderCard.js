import React,{useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flex, Text } from 'ustudio-ui';

const TenderCard = () => {
  const {pathname} = useLocation()
  const baseUri = 'https://public.mtender.gov.md/tenders'
  const [tenderData, setTenderData] = useState([])
  const ocid = pathname.slice(7)
 
  useEffect(()=>{    
    fetch(`${baseUri}/${ocid}`).then(res => res.json()).then(data => setTenderData(data)).catch(err => console.log(err))
  },[ocid])

  if (tenderData === undefined){
    return (
      <Flex
        alignment={{ 
          horizontal: 'center',
          vertical: 'center',
        }}
        direction="column"
      >
        <Text variant='h4' style={{marginBottom:'30px'}}>Sorry, can't find such tender, Try another one</Text>
        <div />
        <Link to="/"><Text style={{fontSize:'20px'}}>Go back</Text></Link>
      </Flex>
    );
  }
  const title  = tenderData.records?.[0].compiledRelease.tender.title;
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
          <Text variant="h5">{title} </Text>
        </Flex>
        <Flex
          alignment={{
            vertical: 'end',
            horizontal: 'end',
          }}
          style={{
            fontSize: '12px',
            color: 'grey',
            marginTop:'20px'
          }}
        >
          Date of Publish: {new Date(date).toLocaleString()}
        </Flex>

        <Flex direction="column" style={{marginTop:'30px'}}>
          <Text variant="span">Description:</Text>
          <Text variant="body"> {description}</Text>
        </Flex>
        <Flex margin={{ top: 'regular' }} style={{ fontSize: '15px' }}>
          <Text variant="caption">Customer: {customer}</Text>
        </Flex>
        <Flex margin={{ top: 'large' }} style={{ color: 'green' }}>
          <Text variant="span">Tender start date: {new Date(startDate).toLocaleDateString()}</Text>
        </Flex>
        <Flex>
          <Text variant="span">
            Tender Amount: {amount} {currency}
          </Text>
        </Flex>
        <Flex style={{ color: 'red' }}>
          <Text variant="span">Tender end Date: {new Date(endDate).toLocaleDateString()}</Text>
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
          <Text>Contact info:</Text>
          <Text>name: {name} </Text>
          <Text>email: {email}</Text>
          <Text>Tel: {telephone}</Text>
          <Text>Address: {address}</Text>
          <Text>Country: {country}</Text>
        </Flex>
      </div>
    </div>
  );
};

export default TenderCard;
