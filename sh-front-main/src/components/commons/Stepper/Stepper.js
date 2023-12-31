import React from "react";
import {
  Box,
  Center,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const steps = [
  { title: "", description: "Completa tus datos" },
  { title: "", description: "Contesta unas preguntas" },
  { title: "", description: "Elige tus intereses" },
];

export function StepperProfile({ initialStep }) {
  const { activeStep, onStepClick } = useSteps({
    index: initialStep || 0,
    count: steps.length,
  });

  return (
    <Center>
      <Stepper index={activeStep} >
        {steps.map((step, index) => (
          <Step key={index} >
            <StepIndicator >
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink={{base: "1", md: "0"}}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Center>
  );
}
