import axios from 'axios';

const url = 'https://covid19.mathdro.id/api'

//fetched data for cards.jsx
export const fetchData = async (country) => {
    let changebleUrl = url
    if (country) {
        changebleUrl = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changebleUrl)


        return { confirmed, recovered, deaths, lastUpdate }
    } catch (error) {
        console.log(error);
    }
}

// fetched data for chart.jsx
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            date: dailyData.reportDate,
            deaths: dailyData.deaths.total
        }))
        return modifiedData
    } catch (error) {
        console.log(error);
    }
}

// fetching data for countryPicker.jsx
export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error);
    }
}