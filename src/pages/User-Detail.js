import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Grid, Box, FormControl, TextField } from '@mui/material';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { Formik } from 'formik';
import { userValidation } from './Flight-Data';

// This is the submit button custom CSS using MUI
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
const UserDetail = () => {
  // This is routing hooks using these hooks we have got the selected flight and push the user to a different route
  const location = useLocation();
  const history = useHistory();
  // This is the state for this component
  const [selectdFlight, setSelectedFlight] = useState({});
  const [formValue, setFormValue] = useState({ name: "", email: "" });
  const [userFormSubmit, setUserFormSubmit] = useState(false);

  // This is where is user comes at this route and if he/she has not selected a flight then he will redirect to the root path of the application
  useEffect(() => {
    if (location.state) {
      setSelectedFlight(location.state);
    } else {
      history.push('/');
    }
  }, []);

  // This is submitted function where when the user clicks on submit button this function will be called
  const handleFormSubmit = (submitedData) => {
    setFormValue(submitedData)
    setUserFormSubmit(true);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* This is the selected flight details rendered in the dom */}
        <div>
          <h3>Flight Details</h3>
          <p>departure: {selectdFlight.departure}</p>
          <p>arrival: {selectdFlight.arrival}</p>
          <p>departureDate: {moment(selectdFlight.departureDate).format('L hh:mm:ss')}</p>
          <p>passenger: {selectdFlight.passenger}</p>
          <p>operated: {selectdFlight.operated}</p>
          <p>price: {selectdFlight.price}</p>
        </div>
        {/* This is the user entered details */}
        {userFormSubmit && <div style={{ marginLeft: '10%' }}>
          <h3>User Details</h3>
          <p>Name: {formValue.name}</p>
          <p>Email: {formValue.email}</p>
        </div>
        }</div>
      <div>
        {/* This is the form where used will enter his detail and here diffrent function will be called  */}
        <Formik initialValues={formValue} onSubmit={(formValue) => handleFormSubmit(formValue)} validationSchema={userValidation} >
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
                  {/* This is the filed where user will enter his email id  */}
                  <Grid item sm={5} xs={12}>
                    <FormControl variant="standard" sx={{ width: '100%', margin: '10px 0', textAlign: 'left' }}>
                      <TextField
                        required
                        type="email"
                        sx={{ width: '100%', margin: '10px 0' }}
                        id="outlined-required"
                        label="E-mail"
                        name='email'
                        value={values.email}
                        error={errors.email && touched.email}
                        helperText={errors.email && touched.email && errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                  </Grid>
                  {/* This is the field where user will enter his name  */}
                  <Grid item sm={5} xs={12} sx={{ width: '100%', margin: '10px 0', textAlign: 'left' }}>
                    <TextField
                      required
                      sx={{ width: '100%', margin: '10px 0' }}
                      id="outlined-required"
                      label="Name"
                      name='name'
                      value={values.name}
                      error={errors.name && touched.name}
                      helperText={errors.name && touched.name && errors.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  {/* This is the submit button  */}
                  <Grid item sm={2} xs={12}>
                    <Box sx={{ textAlign: 'center' }}>
                      <ColorButton sx={{ width: '100%', maxWidth: '210px', height: '50px' }} variant="contained" onClick={() => handleSubmit()}>Submit</ColorButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )
          }}
        </Formik>
      </div>
    </div>
  )
};

export default UserDetail;