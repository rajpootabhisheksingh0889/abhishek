import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import DashboardCard from 'src/components/shared/DashboardCard';
import 'react-toastify/dist/ReactToastify.css';

const AddVendor = () => {
  const { vendorId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    address_line1: '',
    postal_code: '',
    desc: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://api.qikads.in/api/list_countries');
        setCountries(response.data); // Adjust based on actual API response structure
      } catch (error) {
        toast.error('Failed to fetch countries.');
      }
    };

    fetchCountries();

    if (vendorId) {
      setIsEditMode(true);
      fetchVendorDetails(vendorId);
    }
  }, [vendorId]);

  const fetchVendorDetails = async (id) => {
    try {
      const response = await axios.get(`https://api.qikads.in/api/vendor/${id}`);
      const vendor = response.data;
      setFormData({
        name: vendor.name || '',
        gender: vendor.gender || '',
        phone: vendor.phone || '',
        email: vendor.email || '',
        country: vendor.country || '',
        state: vendor.state || '',
        city: vendor.city || '',
        address_line1: vendor.address_line1 || '',
        postal_code: vendor.postal_code || '',
        desc: vendor.desc || '',
      });

      // Fetch states for the vendor's country
      fetchStates(vendor.country);
    } catch (error) {
      toast.error('Failed to fetch vendor details.');
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(`https://api.qikads.in/api/states/${countryId}`);
      setStates(response.data); // Adjust based on actual API response structure
    } catch (error) {
      toast.error('Failed to fetch states.');
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await axios.get(`https://api.qikads.in/api/cities/${stateId}`);
      setCities(response.data); // Adjust based on actual API response structure
    } catch (error) {
      toast.error('Failed to fetch cities.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Fetch states when country is selected
    if (name === 'country') {
      setFormData((prev) => ({ ...prev, state: '', city: '' }));
      fetchStates(value);
    }

    // Fetch cities when state is selected
    if (name === 'state') {
      setFormData((prev) => ({ ...prev, city: '' }));
      fetchCities(value);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isEditMode
      ? `https://api.qikads.in/api/vendor/${vendorId}`
      : 'https://api.qikads.in/api/vendor';

    try {
      if (isEditMode) {
        await axios.put(apiUrl, formData);
        toast.success('Vendor updated successfully!');
      } else {
        await axios.post(apiUrl, formData);
        toast.success('Vendor added successfully!');
      }
      setFormData({
        name: '',
        gender: '',
        phone: '',
        email: '',
        country: '',
        state: '',
        city: '',
        address_line1: '',
        postal_code: '',
        desc: '',
      });
      navigate(-1);
    } catch (error) {
      toast.error('Failed to save vendor. Please try again.');
    }
  };

  return (
    <DashboardCard>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
          {isEditMode ? 'Edit Vendor' : 'Add Vendor'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" size="large" onClick={handleGoBack}>
            Go back
          </Button>
        </Box>
      </Box>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Mobile Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={!formData.country} // Disable if no country is selected
                  >
                    {states.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.state} // Disable if no state is selected
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Address"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Postal Code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="Descrption"
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    required
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    {isEditMode ? 'Update Vendor' : 'Add Vendor'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </DashboardCard>
    );
};

export default AddVendor;



