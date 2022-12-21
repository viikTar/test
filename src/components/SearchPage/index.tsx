import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts';
import { useDebounce } from '../../hooks/useDebounce';
import Input from '../UI/Input';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const changeValue = (e: { target: { value: React.SetStateAction<string>; }; }) => setSearchValue(e.target.value);

  const [state, setState] = useState<any>(null);
  const [lastWeekData, setLastWeekData] = useState<any>(null);
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      if (localStorage.getItem(debouncedValue)) {
        const savedData = localStorage.getItem(debouncedValue);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setLastWeekData(parsedData);
        }
      } else {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${debouncedValue}&apikey=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(res => setState(res))
      }
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (state?.['Time Series (Daily)']) {
      if (Object.keys(state?.['Time Series (Daily)']).length > 7) {
        let data = Object.entries(state?.['Time Series (Daily)']);
        let newData = data.slice(data.length - 7)
        setLastWeekData(newData);
      } else {
        setLastWeekData(Object.entries(state?.['Time Series (Daily)']))
      }
    }
  }, [state]);

  useEffect(() => {
    localStorage.setItem(debouncedValue, JSON.stringify(lastWeekData))
  }, [lastWeekData]);

  return (
    <div style={{ width: '300px' }}>
      <Input value={searchValue} placeholder='Enter trading symbol' onChange={(e) => changeValue(e)} />
      {lastWeekData && lastWeekData.length 
        ? (
          <>
            <a 
              href={`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${debouncedValue}&apikey=${process.env.API_KEY}&datatype=csv`} 
              download="file"
            >
              download csv-file
            </a>
            <ul>
              {lastWeekData.map((item: any, index: number) => (
                <li key={index}>
                  <span>date: {item[0]}</span>
                  <br/>
                  <span>open: {item[1]['1. open']}</span>
                  <br/>
                  <span> high: {item[1]['2. high']}</span>
                  <br/>
                  <span>low: {item[1]['3. low']}</span>
                  <br/>
                  <span>close: {item[1]['4. close']}</span>
                  <br/>
                  <span>adjusted close: {item[1]['5. adjusted close']}</span>
                  <br/>
                  <span>volume: {item[1]['6. volume']}</span>
                  <br/>
                  <span>dividend amount: {item[1]['7. dividend amount']}</span>
                  <br/>
                  <span>split coefficient: {item[1]['8. split coefficient']}</span>
                </li>
              ))}
            </ul>
            <LineChart
              width={400}
              height={400}
              data={lastWeekData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey={lastWeekData[1]['2. high']} stroke="#ff7300" yAxisId={0} />
              <Line type="monotone" dataKey={lastWeekData[1]['3. low']} stroke="#387908" yAxisId={1} />
            </LineChart>
          </>
        )
        : null
      }
    </div>
  )
};

export default SearchPage;
