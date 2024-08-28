import RabbitMQClient from "../MQ/client";

export const updateUserRole = async (interviewerId: string): Promise<{ accessToken: string } | null> => {
  try {
    const client = await RabbitMQClient.getInstance();
    console.log("Sending message to update user role:", interviewerId);
    
     const updateRole = await client.produce(
       interviewerId,
       "updateRoleInterviewer",
       "toUser"
     );
     console.log("Message sent:", updateRole);
    
   
    if (updateRole && updateRole.accessToken) {
      return { accessToken: updateRole.accessToken };
    }
    
    return null;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update user role");
  }
}