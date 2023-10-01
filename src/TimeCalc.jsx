import React, { useState, useEffect, useCallback } from 'react'

function TimeCalc() {
  const [items, setItems] = useState(100);
  const [sum, setSum] = useState(0);
  const [hoursArr, setHoursArr] = useState([]);

  useEffect(() => {
    setHoursArr(new Array(items).fill(0))
  }, [items, setHoursArr]);

  const onChangeHandler = (e, index) => {
    hoursArr[index] = e;
    sumAll()
  }

  const sumAll = () => {
    setSum(0)
    let _sum = 0
    hoursArr?.forEach((item) => {
      if (item) {
        let hrmin = item.split(":")
        let hour = parseInt(hrmin[0]) || 0
        let min = parseInt(hrmin[1]) ? (parseInt(hrmin[1]) / 60) : 0
        _sum += hour + min
      }
    })
    setSum(_sum)
  }

  const formattedSum = useCallback(() => {
    let minPart = ((sum - Math.floor(sum)) * 60) < 10 ? "0" : ""

    let n = (Math.floor(sum) + ":" + minPart + Math.round(((sum - Math.floor(sum)) * 60) * 100) / 100)
    return (n)
  }, [sum])

  return (
    <div style={{ margin: '10px' }}>
      <h3>Work hours calculator</h3>
      {/* <button onClick={sumAll}>Sum</button> */}
      <label style={{ padding: '5px', fontWeight: 700  }}>{formattedSum()}</label>

      {hoursArr?.map((item, index) =>
        <TimeRow id={index} onChangeHandler={onChangeHandler} />
      )}
    </div>)
}

function TimeRow({ id, onChangeHandler }) {
  const [hr, setHr] = useState("");
  const [min, setMin] = useState("");

  useEffect(() => {
    onChangeHandler(hr + ":" + min, id)
  }, [hr, min])

  const onChangeHandlerHour = (e, id) => {
    setHr(prev => e.target.value)
  }

  const onChangeHandlerMin = (e, id) => {
    setMin(e.target.value)
  }

  return <div style={{ margin: '2px' }}>
    Time {id + 1}:
    <input style={{ marginLeft: '5px', marginRight: '5px', width: '50px' }} type="text" id={id} key={id + 'h'}
        placeholder=""
        onChange={(e) => onChangeHandlerHour(e, id)} />
    <input style={{ width: '50px' }} type="text" id={id + 'm'} key={id + 'm'} 
        placeholder=""
        onChange={(e) => onChangeHandlerMin(e, id)} />
  </div>
}

export default TimeCalc;