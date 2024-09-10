export const InterviewTimeDateValid = (date: any, time: string): boolean => {

  const dateISO = date instanceof Date ? date.toISOString() : date;
  


  const datePart = dateISO.split("T")[0];
  const interviewDateTime = new Date(`${datePart}T${time}:00Z`); 
  // console.log(
  //   "🚀 ~ file: verifyInterview.ts:10 ~ InterviewTimeDateValid ~ interviewDateTime:",
  //   interviewDateTime
  // );

  const now = new Date();
  // console.log(
  //   "🚀 ~ file: verifyInterview.ts:12 ~ InterviewTimeDateValid ~ now:",
  //   now
  // );


  const differenceInMillis = interviewDateTime.getTime() - now.getTime();
  console.log(
    "🚀 ~ file: verifyInterview.ts:15 ~ InterviewTimeDateValid ~ differenceInMillis:",
    differenceInMillis
  );

 
  const differenceInMinutes = differenceInMillis / (1000 * 60);
  console.log(
    "🚀 ~ file: verifyInterview.ts:18 ~ InterviewTimeDateValid ~ differenceInMinutes:",
    differenceInMinutes
  );


  if (differenceInMinutes >= -5 && differenceInMinutes <= 330) {
    // Adjust the upper limit to match 
    return true; 
  }

  return false; 
};
