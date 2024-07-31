import React, { useState } from 'react';
import { Grid, Card, CardContent, CardHeader, Checkbox, Button, FormControlLabel, Typography } from '@mui/material';

const Permission = () => {
  // State to keep track of checkbox selections
  const [selections, setSelections] = useState(
    Array(5).fill({
      AD: false,
      CU: false,
      AG: false,
    })
  );

  // Handler for checkbox changes
  const handleCheckboxChange = (index, permission) => (event) => {
    const updatedSelections = [...selections];
    updatedSelections[index] = {
      ...updatedSelections[index],
      [permission]: event.target.checked,
    };
    setSelections(updatedSelections);
  };

  // Handler for form submission
  const handleSubmit = async () => {
    // Construct the payload
    const payload = selections.map((selection, index) => ({
      name: `Name ${index + 1}`,
      permissions: {
        AD: selection.AD,
        CU: selection.CU,
        AG: selection.AG,
      },
    }));

    // Log payload to console
    console.log('Payload:', payload);

    // Example of sending the payload to an API (uncomment and adjust as needed)
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

  return (
    <div style={{ padding: '16px' }}>
      <Card variant="outlined" sx={{ boxShadow: 3 }}>
        <CardHeader
          title={<Typography variant="h5">Permissions</Typography>}
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            {Array.from({ length: 5 }, (_, index) => (
              <Grid item xs={12} key={index}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="body1">Name {index + 1}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container spacing={1} justifyContent="flex-end">
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selections[index].AD}
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
                              checked={selections[index].CU}
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
                              checked={selections[index].AG}
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
