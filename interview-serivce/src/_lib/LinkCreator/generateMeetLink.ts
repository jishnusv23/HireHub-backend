export const generateMeetLink = (
  data: any
): { meetingLink: string; uniqueId: string } => {
  const uniqueId = Math.random().toString(36).substring(2, 15);

  const meetingLink = `https://trend-vista.shop/Meet-HireHub/${uniqueId}`;
  return { uniqueId,meetingLink };
};
