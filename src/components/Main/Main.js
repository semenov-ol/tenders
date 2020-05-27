import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import TendersAPI from '../services/tendersAPI';
import ErrorIndicator from '../error-indicator';

import './Main.css';

const Main = () => {
  const { getOne } = new TendersAPI();
  const [tendersData, setTendersData] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getTender = id => {
    getOne(id).then(data => {
      setTendersData(prev => [...prev, data]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const req = await fetch(`https://public.mtender.gov.md/tenders`);
        const res = await req.json();

        if (res) {
          res.data.map(item => getTender(item.ocid));
        }
      } catch (err) {
        setIsLoading(false);
        setError(true);
      }
    })();
    return () => setTendersData([]);
  }, []);

  const renderCards = () => {
    return tendersData.map(item => {
      const id = (Math.random() * 10).toString(16);
      const { date } = item.records[0].compiledRelease;
      const name = item.records[0].compiledRelease.parties?.[0].contactPoint.name;
      const telephone = item.records[0].compiledRelease.parties?.[0].contactPoint.telephone;
      const { title } = item.records[0].compiledRelease.tender;
      const amount = item.records[0].compiledRelease.planning?.budget.amount.amount;
      const currency = item.records[0].compiledRelease.planning?.budget.amount.currency;
      const startDate = item.records[0].compiledRelease.planning?.budget.budgetBreakdown[0].period.startDate;
      const endDate = item.records[0].compiledRelease.planning?.budget.budgetBreakdown[0].period.endDate;
      const ocid = item.records?.[0].ocid;

      return (
        <div className="card" key={id}>
          <div className="card-body">
            <div className="date">
              <span>{new Date(date).toLocaleString()}</span>
            </div>
            <div className="title">{title}</div>
            <div className="budget">
              <b>
                Budget: {amount} {currency}
              </b>
            </div>
            <div className="period">
              <p> Start Date: {new Date(startDate).toDateString()}</p>
              <p>End Date: {new Date(endDate).toDateString()} </p>
            </div>
            <div className="contact">
              <p>Contact Name: {name}</p>
              <p>Tel: {telephone} </p>
            </div>
            <Link to={`/card/${ocid}`} className="show-info-btn">
              Show detail info
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="Main">
      {!isError ? (
        <React.Fragment>
          <Text variant="h5">All Tenders:</Text>
          <div className="cards">
            {isLoading ? (
              <Flex
                alignment={{
                  horizontal: 'center',
                  vertical: 'end',
                }}
              >
                <Spinner
                  appearance={{
                    size: 50,
                  }}
                />
              </Flex>
            ) : (
              renderCards()
            )}
          </div>
        </React.Fragment>
      ) : (
        <ErrorIndicator />
      )}
    </div>
  );
};

export default Main;
