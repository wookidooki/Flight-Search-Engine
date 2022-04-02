import * as Yup from 'yup';
import moment from 'moment';

// This is flight data
export const FlightData = (filters) => {
    const FlightData = [{
        departure: 'South Africa',
        arrival: 'Netherlands',
        departureDate: 'Fri Apr 01 2022 23:39:06 GMT+02 (South Africa Standard Time)',
        passenger: 100,
        operated: 'Airlink',
        price: '21309 ZAR'
    }, {
        departure: 'South Africa',
        arrival: 'Netherlands',
        departureDate: 'Fri Apr 01 2022 23:39:06 GMT+02 (South Africa Standard Time)',
        passenger: 100,
        operated: 'CemAir',
        price: '21309 ZAR'
    }, {
        departure: 'South Africa',
        arrival: 'Australia',
        departureDate: 'Fri Mar 25 2022 23:39:06 GMT+02 (South Africa Standard Time)',
        passenger: 100,
        operated: 'Airlink',
        price: '22500 ZAR'
    }, {
        departure: 'South Africa',
        arrival: 'Australia',
        departureDate: 'Fri Mar 25 2022 23:39:06 GMT+02 (South Africa Standard Time)',
        passenger: 100,
        operated: 'CemAir',
        price: '22500 ZAR'
    }, {
        departure: 'South Africa',
        arrival: 'New Zeeland',
        departureDate: 'Fri Apr 01 2022 23:39:06 GMT+02 (South Africa Standard Time)',
        passenger: 100,
        operated: 'Airlink',
        price: '25309 ZAR'
    }, {
        departure: 'South Africa',
        arrival: 'New Zeeland',
        departureDate: 'Fri Apr 01 2022 23:39:06 GMT+02 (South Africa Standard Time))',
        passenger: 100,
        operated: 'CemAir',
        price: '25309 ZAR'
    }];
    let filterdFlightData = [];
    if (filters) {
        filterdFlightData = FlightData.filter((flight) => flight.departure == filters.departure && flight.arrival == filters.arrival && moment(flight.departureDate).format('YYYY-MM-DD') == (filters.departuredate) && filters.passenger < flight.passenger)
    } else {
        filterdFlightData = FlightData;
    }
    return filterdFlightData
};


// This is the yup validation for flight search where if the user will not entered details then this validation throws an error 
export const flightValidation = Yup.object().shape({
    departure: Yup.string().required('This is required'),
    arrival: Yup.string().required('This is required'),
    departuredate: Yup.string().required('This is required'),
    passenger: Yup.string().required('This is required').test('Passenger Validation', 'Passenger is not nagative', (value, ctx) => (parseInt(value) >= 0)),
});

// This is a flight table column
export const columns = [
    { id: 'departure', label: 'Departure', minWidth: 170 },
    { id: 'arrival', label: 'Arrival', minWidth: 100 },
    {
        id: 'departureDate',
        label: 'Departure Date',
        minWidth: 170,
        align: 'right',
        format: (value) => moment(value).format('L hh:mm:ss')
    },
    {
        id: 'passenger',
        label: 'Passenger Limit',
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'operated',
        label: 'Operated By',
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'price',
        label: 'Price',
        minWidth: 170,
        align: 'right'
    }
];

// This is the yup validation for user search where if the user will not enter details then this validation throws an error 
export const userValidation = Yup.object().shape({
    name: Yup.string().required('This is required'),
    email: Yup.string().required('This is required').test('email Validation', 'Invalid Email', (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return regex.test(value);
    }),
});