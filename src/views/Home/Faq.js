import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Faq() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const faqData = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces."
    },
    {
      question: "What is Material-UI?",
      answer: "Material-UI is a popular React UI framework that follows Material Design guidelines."
    },
    {
      question: "How do I install MUI?",
      answer: "You can install MUI by running `npm install @mui/material @emotion/react @emotion/styled`."
    },
    // Add more FAQs as needed
  ];

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography
          variant="h1"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            marginBottom: 3,
          }}
        >
          Frequently Asked Questions
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ marginBottom: 2, borderRadius: 2, overflow: 'hidden' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                backgroundColor: theme.palette.action.hover,
                '& .MuiAccordionSummary-content': {
                  margin: 0,
                },
              }}
            >
              <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 'medium' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: theme.palette.background.default }}>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
}

export default Faq;
