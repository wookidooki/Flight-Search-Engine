import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, FormControl, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { FlightData, flightValidation, columns } from './Flight-Data';
import { styled } from '@mui/material/styles';
import { Formik } from 'formik';

// This is the search button custom CSS using MUI
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#8f8f8f'),
    backgroundColor: '#8f8f8f',
    '&:hover': {
        backgroundColor: '#8f8f8f',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
}));


// This is the component
const FlightSearch = () => {
    // This is routing hooks using these hooks we push the user to a different route
    const history = useHistory();
    // This is the state for this component
    const [formValue, setFormValue] = useState({
        departure: "", arrival: "", departuredate: "", passenger: ""
    });
    const [flightData, setFlightData] = useState([]);

    // This is a submitted function where when the user clicks on submit button this function will be called
    const handleFormSubmit = (formValue) => {
        setFlightData([...FlightData(formValue)]);
        console.log("FlightData(formValue) => ", FlightData(formValue));
    };

    // This function will use when the user selects the flight
    const handleSelectFlight = (selectedFlight) => {
        console.log("selectedFlight => ", selectedFlight);
        history.push({
            pathname: '/user-detail',
            state: selectedFlight
        })
    };

    return (
        <>
            <div>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Search available flights
                </Typography>
                {/* This is flight search function */}
                <Formik initialValues={formValue} onSubmit={(formValue) => handleFormSubmit(formValue)} validationSchema={flightValidation} >
                    {(props) => {
                        const {
                            values,
                            handleChange,
                            handleSubmit,
                            errors,
                            touched,
                            handleBlur
                        } = props;
                        return (
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                            >
                                <Grid container sx={{ alignItems: 'center' }} spacing={2}>
                                    <Grid item md={2.4} sm={4} xs={12}>
                                        <FormControl variant="standard" sx={{ width: '100%', margin: '10px 0', textAlign: 'left' }}>
                                            {/* This is the field where user will enter his Departure Location  */}
                                            <TextField
                                                required
                                                select
                                                sx={{ width: '100%' }}
                                                label="Departure Location"
                                                name='departure'
                                                value={values.departure}
                                                error={errors.departure && touched.departure}
                                                helperText={errors.departure && touched.departure && errors.departure}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {[...new Set(FlightData().map(item => item.departure))].map((country, index) => (
                                                    <MenuItem value={country} key={index}>{country}</MenuItem>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={2.4} sm={4} xs={12}>
                                        <FormControl variant="standard" sx={{ width: '100%', margin: '10px 0', textAlign: 'left' }}>
                                            {/* This is the field where the user will enter his Arrival Location */}                                            <TextField
                                                required
                                                select
                                                sx={{ width: '100%' }}
                                                label="Arrival Location"
                                                name='arrival'
                                                value={values.arrival}
                                                error={errors.arrival && touched.arrival}
                                                helperText={errors.arrival && touched.arrival && errors.arrival}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {[...new Set(FlightData().map(item => item.arrival))].map((country, index) => (
                                                    <MenuItem value={country} key={index}>{country}</MenuItem>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={2.4} sm={4} xs={12}>
                                        <FormControl variant="standard" sx={{ width: '100%', margin: '10px 0', textAlign: 'left' }}>
                                            {/* This is the field where the user will enter his departure date */}
                                            <TextField
                                                required
                                                type='date'
                                                sx={{ width: '100%' }}
                                                name="departuredate"
                                                value={values.departuredate}
                                                error={errors.departuredate && touched.departuredate}
                                                helperText={errors.departuredate && touched.departuredate && errors.departuredate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                            </TextField>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={2.4} sm={4} xs={12}>
                                        <FormControl variant="standard" sx={{ width: '100%', margin: '10px 0', textAlign: 'left' }}>
                                            {/* This is the field where the user will enter his passenger */}                                            <TextField
                                                id="outlined-required"
                                                label="How many passenger"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="passenger"
                                                type="number"
                                                value={values.passenger}
                                                error={errors.passenger && touched.passenger}
                                                helperText={errors.passenger && touched.passenger && errors.passenger}
                                            />
                                        </FormControl>
                                    </Grid>
                                    {/* This is the search button */}
                                    <Grid item md={2.4} sm={4} xs={12} sx={{ textAlign: 'center' }}>
                                        <ColorButton sx={{ width: '100%', maxWidth: '210px', height: '50px' }} variant="contained" onClick={() => handleSubmit()}>Search</ColorButton>

                                    </Grid>
                                </Grid>
                            </Box>
                        )
                    }}
                </Formik>
            </div>
            <div style={{ marginTop: '4%' }}  >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Flight Details
                </Typography>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        {/* This is the table where flight search details will be shown */}
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                {/* This is the column row of the flight details */}
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* This is the flight data rows where flight data will be shown */}
                                {flightData.length ? flightData
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => handleSelectFlight(row)}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    }) : <p>No Flight Found</p>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </>
    );
}

export default FlightSearch;