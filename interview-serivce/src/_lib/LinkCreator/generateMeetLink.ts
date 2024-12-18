export const generateMeetLink = (
  data: any
): { meetingLink: string; uniqueId: string } => {
  const uniqueId = Math.random().toString(36).substring(2, 15);

  const meetingLink = `http://localhost:5173/Meet-HireHub/${uniqueId}`;
  return { uniqueId,meetingLink };
};
