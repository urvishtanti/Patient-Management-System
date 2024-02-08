import React from 'react'
import { Grid, Paper, TextField, Button } from '@material-ui/core'

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";

export function CounselorSignup() {
    const paperStyle = { padding: '20px 20px', width: 500, margin: "auto" }
    const headerStyle = { margin: 0, color:'Blue', fontWeight:"bold" }
    const marginTop = { marginTop: 10 }
    const [Province, setProvince] = React.useState('');

    const handleChange = (event) => {
        setProvince(event.target.value);
    };
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>

                    <h1 style={headerStyle}>Sign Up</h1>
                </Grid>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth label='First Name' placeholder="Enter your first name" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label='Last Name' placeholder="Enter your last name" />
                        </Grid>

                        <Grid item xs={7}>
                            <TextField fullWidth label='Email ID' placeholder="Enter your email id" />
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset" style={marginTop}>
                                <FormLabel component="legend">Date of Birth</FormLabel>
                                <input type="date" style={{ width: "150px", fontWeight: 'bold' }}></input>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField fullWidth label='Address Line 1' placeholder="Address Line 1" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label='Address Line 2' placeholder="Address Line 2" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label='City' placeholder="City" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="standard" style={{ width: "200px" }}>
                                <InputLabel id="province-label">Province</InputLabel>
                                <Select
                                    labelId="provinve-label"
                                    id="province-label"
                                    value={Province}
                                    onChange={handleChange}
                                    label="Province"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Alberta'}>Alberta</MenuItem>
                                    <MenuItem value={'British Columbia'}>British Columbia</MenuItem>
                                    <MenuItem value={'Manitoba'}>Manitoba</MenuItem>
                                    <MenuItem value={'New Brunswick'}>New Brunswick</MenuItem>
                                    <MenuItem value={'Newfoundland and Labrador'}>Newfoundland and Labrador</MenuItem>
                                    <MenuItem value={'Northwest Territories'}>Northwest Territories</MenuItem>
                                    <MenuItem value={'Nova Scotia'}>Nova Scotia</MenuItem>
                                    <MenuItem value={'Nunavut'}>Nunavut</MenuItem>
                                    <MenuItem value={'Ontario'}>Ontario</MenuItem>
                                    <MenuItem value={'Prince Edward Island'}>Prince Edward Island</MenuItem>
                                    <MenuItem value={'Quebec'}>Quebec</MenuItem>
                                    <MenuItem value={'Saskatchewan'}>Saskatchewan</MenuItem>
                                    <MenuItem value={'Yukon'}>Yukon</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8}>
                            <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth label='Registration Number' placeholder="Enter your registration number" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label='Password' type='password' placeholder="Enter your password" />
                        </Grid> 
                        <Grid item xs={6}>
                            <TextField fullWidth label='Confirm Password' type='password' placeholder="Confirm your password" />
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                         <Grid item xs={7}>
                         <Button type='submit' variant='contained' color='primary' style={{width:'300px'}}>Sign up</Button>
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>

                    </Grid>

                    
                </form>
            </Paper>
        </Grid>
    )
}

