import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TendersAPI from '../services/TendersAPI';

import './Main.css';

const Main = () => {
  const Tenders = new TendersAPI();

  const [arr, setArr] = useState([]);

  const getTender = async id => {
    await Tenders.getOne(id).then(data => setArr(prev => [...prev, data]));
  };

  useEffect(() => {
    try {
      async function fetchData() {
        const req = await fetch(`https://public.mtender.gov.md/tenders`);
        const res = await req.json();

        if (res) { 
          res.data.map(item => getTender(item.ocid));
        }
      }

      fetchData();
    } catch {
      console.log('MAIN FETCH ERROR');
    }
  }, []);

  const RenderCards = () => {
    const result = arr.map(item => {
      const id = Math.random();
      const { date } = item.records[0].compiledRelease;
      const name =
        item.records[0].compiledRelease.parties?.[0].contactPoint.name;
      const telephone =
        item.records[0].compiledRelease.parties?.[0].contactPoint.telephone;
      const { title } = item.records[0].compiledRelease.tender;
      const amount =
        item.records[0].compiledRelease.planning?.budget.amount.amount;
      const currency =
        item.records[0].compiledRelease.planning?.budget.amount.currency;
      const startDate =
        item.records[0].compiledRelease.planning?.budget.budgetBreakdown[0]
          .period.startDate;
      const endDate =
        item.records[0].compiledRelease.planning?.budget.budgetBreakdown[0]
          .period.endDate;

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
            <Link
              to={{
                pathname: '/card',
                item,
              }}
              className="show-info-btn"
            >
              Show detail info
            </Link>
          </div>
        </div>
      );
    });

    return result;
  };

  return (
    <div className="Main">
      <h3>All Tenders:</h3>
      <div className="cards">{RenderCards()}</div>
    </div>
  );
};

export default Main;
