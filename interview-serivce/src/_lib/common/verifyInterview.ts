export const InterviewTimeDateValid = (date: any, time: string) => {
  const interviewDateTime = new Date(`${date}T${time}`);
  const now = new Date();

  const differenceInMillis = interviewDateTime.getTime() - now.getTime();
  console.log("🚀 ~ file: verifyInterview.ts:6 ~ InterviewTimeDateValid ~ differenceInMillis:", differenceInMillis)

  const differenceInMinutes = differenceInMillis / (1000 * 60);
  console.log("🚀 ~ file: verifyInterview.ts:9 ~ InterviewTimeDateValid ~ differenceInMinutes:", differenceInMinutes)

  if (differenceInMinutes >= -5 && differenceInMinutes <= 15) {
    return true;
  }
  return false;
};
