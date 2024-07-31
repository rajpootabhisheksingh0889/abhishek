import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardHeader, Checkbox, Button, FormControlLabel, Typography } from '@mui/material';

const Permission = () => {
  const [selections, setSelections] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('http://134.209.145.149:9999/api/menuList');
        const result = await response.json();

        // Check if the response was successful
        if (result.success) {
          // Extract names from the response data
          const namesList = result.data.map((item) => item.name);

          setNames(namesList);
          setSelections(namesList.map(() => ({
            AD: false,
            CU: false,
            AG: false,
          })));
        } else {
          console.error('Failed to fetch data:', result.success);
        }
      } catch (error) {
        console.error('Error fetching names:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, []);

  const handleCheckboxChange = (index, permission) => (event) => {
    const updatedSelections = [...selections];
    updatedSelections[index] = {
      ...updatedSelections[index],
      [permission]: event.target.checked,
    };
    setSelections(updatedSelections);
  };

  const handleSubmit = async () => {
    const payload = names.map((name, index) => ({
      name,
      permissions: {
        AD: selections[index].AD,
        CU: selections[index].CU,
        AG: selections[index].AG,
      },
    }));

    console.log('Payload:', payload);

    // Example of sending the payload to an API
    /*
    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log('API Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    */
  };

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <div style={{ padding: '16px' }}>
      <Card variant="outlined" sx={{ boxShadow: 3 }}>
        <CardHeader
          title={<Typography variant="h5">Permissions</Typography>}
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            {names.map((name, index) => (
              <Grid item xs={12} key={index}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="body1">{name}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container spacing={1} justifyContent="flex-end">
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selections[index]?.AD || false}
                              onChange={handleCheckboxChange(index, 'AD')}
                              color="primary"
                            />
                          }
                          label="AD"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selections[index]?.CU || false}
                              onChange={handleCheckboxChange(index, 'CU')}
                              color="primary"
                            />
                          }
                          label="CU"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selections[index]?.AG || false}
                              onChange={handleCheckboxChange(index, 'AG')}
                              color="primary"
                            />
                          }
                          label="AG"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: '16px', float: 'right', marginBottom: '16px' }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Permission;
