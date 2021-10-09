import React, { useState } from 'react';


import SonTra from './SonTra';

const resultstemp = (props ,yearNumber) => {
    const textDataYear = props.filter(textDa =>{
                return Number(textDa.year) === yearNumber
    })
    const textDataMonth = textDataYear.reduce((value, i) => {
        if (value.map(k => k.month).includes(i.month)) {
            let item = value.find(obj => obj.month === i.month)
            item.listTotal = [...item.listTotal, {totalNum: i.temp}]
            return value
        }
        return [...value, {month: i.month, listTotal: [{totalNum: i.temp}]}]
    }, [])
    const totalMedium = textDataMonth.map((value, i) =>{
        const valueTotal = value.listTotal.length
        const x = value.listTotal.reduce((v, item) => {
            return (v+ Number(item.totalNum))
        }, 0)
        const y = x  / valueTotal
        return {
            month: value.month,
            temp: y,
        }
    })
    return totalMedium
}


const resultsSalinity = (props ,yearNumber) => {
    const textDataYear = props.filter(textDa =>{
                return Number(textDa.year) === yearNumber
    })
    const textDataMonth = textDataYear.reduce((value, i) => {
        if (value.map(k => k.month).includes(i.month)) {
            let item = value.find(obj => obj.month === i.month)
            // item.listDay = [...item.listDay, {day: i.day}]
            item.listTotal = [...item.listTotal, {totalNum: i.salinity}]
            return value
        }
        return [...value, {month: i.month, listTotal: [{totalNum: i.salinity}]}]
    }, [])
    const totalMedium = textDataMonth.map((value, i) =>{
        // console.log(value.listTotal)
        const valueTotal = value.listTotal.length
        const x = value.listTotal.reduce((v, item) => {
            return (v+ Number(item.totalNum))
        }, 0)
        const y = x  / valueTotal
        return {
            month: value.month,
            salinity: y,
        }
    })
    return totalMedium
}

const arrayDataDayTemp = (textDataContent, totalMedium) => {
    const x = textDataContent.map(textDa => {
                const textString = textDa.toString().split(' ')
                const  textStringCopy = [...textString].splice(3)
                const total = textStringCopy.reduce((total, totalNumber) => {
                    return (total + Number(totalNumber)) 
                }, 0)
                const y = total / textStringCopy.length
                return {
                    year: textString[0],
                    month: textString[1],
                    day: textString[2],
                    temp: y
                }
    })
    return x
}
const arrayDataDaySalinity = (textDataContent, totalMedium) => {
    const x = textDataContent.map(textDa => {
                const textString = textDa.toString().split(' ')
                const  textStringCopy = [...textString].splice(3)
                const total = textStringCopy.reduce((total, totalNumber) => {
                    return (total + Number(totalNumber)) 
                }, 0)
                const y = total / textStringCopy.length
                return {
                    year: textString[0],
                    month: textString[1],
                    day: textString[2],
                    salinity: y
                }
    })
    return x
}

function DataSonTra(props) {
    const [text, setText] = useState([]);
    const [year, setYear] = useState([2005, 2006, 2007]);

    const showFileT = async (e) => {
        // e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const textDataContent = (e.target.result).split('\r\n')
            // console.log(textDataContent.splice())
            if (text === undefined) return;
            const textData = textDataContent.splice(0,1)
            const textDataString = arrayDataDayTemp(textDataContent)
            console.log(textDataString.map(i => {
                return i.year
            }))
            const data2005 = resultstemp(textDataString, 2005)
            const data2006 = resultstemp(textDataString, 2006)
            const data2007 = resultstemp(textDataString, 2007)
            const dataT = [data2005, data2006, data2007]
            setText(dataT)       
        };
        reader.readAsText(e.target.files[0])
    }
    const showFileS = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const textDataContent = (e.target.result).split('\r\n')
            if (text === undefined) return;
            const textData = textDataContent.splice(0,1)
            const textDataString = arrayDataDaySalinity(textDataContent)
            
            const data2005 = resultsSalinity(textDataString, 2005)
            const data2006 = resultsSalinity(textDataString, 2006)
            const data2007 = resultsSalinity(textDataString, 2007)
            const dataS = [{year:  data2005 },{year: data2006}, {year: data2007}]
            const data = text.map((v, i) => {
                const dataSalinity = dataS[i].year
                const x = dataSalinity.map(v => {
                    return {salinity: v.salinity}
                })
                const abc = v.map((q, i) => {
                    const y = x[i]
                    const t = q.temp
                    const s = x[i].salinity
                    const pw = 999.842594 + 6.793952 * (10 ** -2)*t - 9.095290 * (10 ** -3)*(t ** 2) + 1.001685 * (10 ** -4) * (t ** 3) - 1.120083 * (10 ** -6) * (t**4) + 6.536332 * (10 ** -9) * (t ** 5)
                    const a = (8.24493 * (10 ** -1) - 4.0899 * (10 ** -3) * t + 7.6438 * (10 ** -5)*(t ** 2) - 8.2467 * (10 ** -7)*(t ** 3) + 5.3875*(10 ** -9) * (t ** 4)) * s
                    const b = (- 5.72466 * (10 ** -3) + 1.0227 * (10 ** -4)* t - 1.6546 * (10 ** -6)*(t ** 2))*(s ** (3/2))
                    const density = (pw + a + b + 4.8314*(10 ** -4)*(s ** 2)) / 100
                    // console.log(d)
                    return {...q, ...x[i], density}
                })
                return abc
            })
            setText(data)         
        };
        reader.readAsText(e.target.files[0])
    }
    console.log(text)
    return (
        <div> 
            <div style={{textAlign: 'center'}}>
                <span style={{color: '#d9d7d7', fontSize: '20px', paddingRight: '12px'}}>Nhập file .txt thể hiện T tại đây</span>
                <input type="file" className="form-control-T" id='form-control-T' onChange={(e) => showFileT(e)} />
            </div>
            <div style={{textAlign: 'center'}}>
                <span style={{color: '#d9d7d7', fontSize: '20px', paddingRight: '12px'}}>Nhập file .txt thể hiện S tại đây</span>
                <input type="file" className="form-control-S" id='form-control-S' onChange={(e) => showFileS(e)} />
            </div>
            {text.map(( v, i ) => {
                const yearN = year[i]
                return (
                    <div className="chart">
                        <p className='chart-year'>{yearN}</p>
                        <SonTra dataName={v}/>
                    </div>
                )
            })}
        </div>
    );
}

export default DataSonTra;