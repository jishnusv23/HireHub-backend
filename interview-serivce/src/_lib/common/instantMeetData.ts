
export const fetchInstantMeetData = (): {
  startTime: string;
  date: Date;
  title: string;
  description: string;
  jobPosition: string;
  participants: any[];
  interviewType:string
  instantMeet: boolean;
} => {
  try {
    const todayDate = new Date();
    const todayTime = new Date(todayDate.getTime());
    todayTime.setSeconds(0, 0);
    const formattedTime = todayDate.toTimeString().slice(0, 5);
    console.log(
      "🚀 ~ file: instantMeetData.ts:15 ~ formattedTime:",
      formattedTime
    );

    const data = {
      startTime: formattedTime,
      date: todayDate,
      title: "a",
      description: "b",
      jobPosition: "c",
      instantMeet: true,
      interviewType: "HR",
      Ongoing:true,
      participants: [],
    };

    return data;
  } catch (error: any) {
    console.error("Something wrong in instantMeetData:", error);
    throw error;
  }
};
