import React, { useState, useEffect } from 'react';

const getRealTimeDate = () => {
  const [dt, setDt] = useState();
  const [time, setTime] = useState();

  useEffect(() => {
    let secTimer = setInterval(() => {
      const date = new Date();
      const day = date.getDate();
      const month = new Intl.DateTimeFormat('en-US', { month: 'long' })
        .format(date)
        .toUpperCase()
        .slice(0, 3);
      const year = date.getFullYear().toString().substr(-2);
      let hours = date.getHours();
      const minutes = date.getMinutes();

      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12;

      const formattedDate = `${day}-${month}-${year}`;

      const formattedTime = `${hours}:${
        minutes < 10 ? '0' + minutes : minutes
      } ${ampm}`;

      setDt(formattedDate);
      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  return { date: dt, time: time };
};

export default getRealTimeDate;
