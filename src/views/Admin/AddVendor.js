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
import Swal from 'sweetalert2';
import axios from 'axios';
import DashboardCard from 'src/components/shared/DashboardCard';

const AddVendor = () => {
  const { vendorId } = useParams();
  const [formData, setFormData] = useState({
    owner_name: '',
    organization_name: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    address_line1: '',
    address_line2: '',
    postal_code: '',
    taxation: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://134.209.145.149:9999/api/list_countries');
        setCountries(response.data);
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch countries.', 'error');
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
      const response = await axios.get(`http://134.209.145.149:9999/api/vendor/${id}`);
      const vendor = response.data;
      setFormData({
        owner_name: vendor.owner_name || '',
        organization_name: vendor.organization_name || '',
        phone: vendor.phone || '',
        email: vendor.email || '',
        country: vendor.country || '',
        state: vendor.state || '',
        city: vendor.city || '',
        address_line1: vendor.address_line1 || '',
        address_line2: vendor.address_line2 || '',
        postal_code: vendor.postal_code || '',
        taxation: vendor.taxation || '',
      });

      fetchStates(vendor.country);
      fetchCities(vendor.state);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch vendor details.', 'error');
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(`http://134.209.145.149:9999/api/states/${countryId}`);
      setStates(response.data);
     
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch states.', 'error');
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await axios.get(`http://134.209.145.149:9999/api/cities/${stateId}`);
      setCities(response.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch cities.', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'country') {
      setFormData((prev) => ({ ...prev, state: '', city: '' }));
      fetchStates(value);
    }

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

    if (!validateForm()) return;

    const apiUrl = isEditMode
      ? `http://134.209.145.149:9999/api/vendor/${vendorId}`
      : 'http://134.209.145.149:9999/api/vendor';

    try {
      if (isEditMode) {
        await axios.put(apiUrl, formData);
        Swal.fire({
          icon: 'success',
          title: 'Vendor updated successfully!',
          timer: 3000,
          showConfirmButton: false,
        }).then(() => navigate(-1));
      } else {
        await axios.post(apiUrl, formData);
        Swal.fire({
          icon: 'success',
          title: 'Vendor added successfully!',
          timer: 3000,
          showConfirmButton: false,
        }).then(() => navigate(-1));
      }

      resetForm();
    } catch (error) {
      Swal.fire('Error', 'Failed to save vendor. Please try again.', 'error');
    }
  };

  const validateForm = () => {
    const { phone, postal_code, ...requiredFields } = formData;

    for (const key in requiredFields) {
      if (!requiredFields[key]) {
        Swal.fire('Error', `${key.replace('_', ' ')} is required.`, 'error');
        return false;
      }
    }

    if (phone.length !== 10) {
      Swal.fire('Error', 'Mobile number must be exactly 10 digits.', 'error');
      return false;
    }

    if (postal_code.length !== 6) {
      Swal.fire('Error', 'Postal code must be exactly 6 digits.', 'error');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      owner_name: '',
      organization_name: '',
      phone: '',
      email: '',
      country: '',
      state: '',
      city: '',
      address_line1: '',
      address_line2: '',
      postal_code: '',
      taxation: '',
    });
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
                  label="Organization Name"
                  name="organization_name"
                  value={formData.organization_name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Owner Name"
                  name="owner_name"
                  value={formData.owner_name}
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
                    label="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  // displayEmpty
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
                    label="state"
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
                    label="city"
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
                  label="Address 1"
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
                  label="Address 2"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type='number'
                  label="Postal Code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type='number'
                  label="Taxation No."
                  name="taxation"
                  value={formData.taxation}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
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
      {/* <ToastContainer /> */}
    </DashboardCard>
  );
};

export default AddVendor;



