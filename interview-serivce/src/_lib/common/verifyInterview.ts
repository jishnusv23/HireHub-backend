export const InterviewTimeDateValid = (date: any, time: string): boolean => {
  // console.log(
  //   "🚀 ~ file: verifyInterview.ts:3 ~ InterviewTimeDateValid ~ date:",
  //   date
  // );
  // console.log("🚀 ~ file: verifyInterview.ts:4 ~ time:", time);

  // If the date is already a Date object, convert it to ISO string first
  const dateISO = date instanceof Date ? date.toISOString() : date;
  // console.log(
  //   "🚀 ~ file: verifyInterview.ts:6 ~ InterviewTimeDateValid ~ dateISO:",
  //   dateISO
  // );


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

  // Convert the difference to minutes
  const differenceInMinutes = differenceInMillis / (1000 * 60);
  console.log(
    "🚀 ~ file: verifyInterview.ts:18 ~ InterviewTimeDateValid ~ differenceInMinutes:",
    differenceInMinutes
  );


  if (differenceInMinutes >= -5 && differenceInMinutes <= 330) {
    // Adjust the upper limit to match your requirements (e.g., 5.5 hours = 330 minutes)
    return true; 
  }

  return false;
};
