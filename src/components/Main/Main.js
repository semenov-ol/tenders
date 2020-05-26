import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Text, Flex } from 'ustudio-ui';

import tendersAPI from '../services/tendersAPI';

import './Main.css';

const Main = () => {
  const { getOne } = new tendersAPI();
  const [tendersData, setTendersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTender = id => {
    getOne(id).then(data =>
      setTendersData(prev => {
        setLoading(false);
        return [...prev, data];
      })
    );
  };

  useEffect(() => {
    try {
      (async () => {
        const req = await fetch(`https://public.mtender.gov.md/tenders`);
        const res = await req.json();

        if (res) {
          res.data.map(item => getTender(item.ocid));
        }
      })();
    } catch {
      console.log('can`t fetch data in Main.js');
    }
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
            <Link to={`/cards/${ocid}`} className="show-info-btn">
              Show detail info
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="Main">
      <Text variant="h5">All Tenders:</Text>
      <div className="cards">
        {loading ? (
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
    </div>
  );
};

export default Main;
