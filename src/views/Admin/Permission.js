import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardHeader, Checkbox, Button, FormControlLabel, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Permission = () => {
  const [selections, setSelections] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('http://134.209.145.149:9999/api/menuList');
        const result = await response.json();

        if (result.success) {
          const namesList = result.data.map((item) => item.name);

          // Initialize selections state
          const initialSelections = namesList.map(() => ({
            AD: false,
            CU: false,
            AG: false,
          }));

          setNames(namesList);
          setSelections(initialSelections);
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

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('http://134.209.145.149:9999/api/getPermissions');
        const permissions = await response.json();

        if (permissions) {
          // Map permissions to selections
          const updatedSelections = selections.map((selection, index) => {
            const name = names[index];
            const relevantPermissions = permissions.filter(
              (perm) => perm.menu_name === name
            );
            const newSelection = { AD: false, CU: false, AG: false };
            
            relevantPermissions.forEach((perm) => {
              newSelection[perm.role_type] = true;
            });

            return newSelection;
          });

          setSelections(updatedSelections);
        } else {
          console.error('Failed to fetch permissions');
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    if (names.length > 0) {
      fetchPermissions();
    }
  }, [names]);

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

    try {
      const response = await fetch('http://134.209.145.149:9999/api/dPermission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Permissions updated successfully!');
      } else {
        toast.error(`Failed to update permissions: ${result.message}`);
      }
    } catch (error) {
      toast.error('Error submitting permissions');
    }
  };

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <div style={{ padding: '16px' }}>
      <ToastContainer />
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
