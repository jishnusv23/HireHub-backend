
export const fetchInstantMeetData = (): {
  startTime: Date;
  date: Date;
  title: string;
  description: string;
  jobPosition: string;
  participants: any[];
} => {
  try {
    const todayDate = new Date();
    const todayTime = new Date(todayDate.getTime());
    todayTime.setSeconds(0, 0); 
    console.log("🚀 ~ file: instantMeetData.ts:13 ~ todayTime:", todayTime) 

    const data = {
      startTime: todayTime,
      date: todayDate,
      title: "",
      description: "",
      jobPosition: "",
      participants: [],
    };

    return data;
  } catch (error: any) {
    console.error("Something wrong in instantMeetData:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
