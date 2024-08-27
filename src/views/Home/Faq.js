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
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ marginBottom: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant={isMobile ? 'h6' : 'h5'}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
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
