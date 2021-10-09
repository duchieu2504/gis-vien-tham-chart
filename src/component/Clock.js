import React, { useEffect, useState } from 'react';

const formDate = (date) => {
    let h = `0${date.getHours()}`.slice(-2);
    let m = `0${date.getMinutes()}`.slice(-2);
    let s = `0${date.getSeconds()}`.slice(-2);
    let session = 'am'

    if( Number(h) === 0) {
        h = '12'
    }
    if( Number(h) > 12) {
        let newh = Number(h) - 12
        h = `${newh}`
        session = 'pm'
    }
    return `${h}:${m}:${s} ${session} `
}
function Clock() {
    const [time, setTime] = useState('')
    useEffect(() => {
        const clockInterval = setInterval(() => {
            const newTime = new Date()
            const newTimeString = formDate(newTime)
            setTime(newTimeString)
        }, 1000);
        return () => clearInterval(clockInterval)
    }, [])
    return (
        <p style={{fontSize: '42px', color: 'red'}}>{time}</p>
    );
}

export default Clock;