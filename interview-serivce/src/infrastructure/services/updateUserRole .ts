import RabbitMQClient from "../MQ/client";

interface UpdateRoleResponse {
  accessToken: string;
 
}

export const updateUserRole = async (
  interviewerId: string
): Promise<UpdateRoleResponse | null> => {
  try {
    const client = await RabbitMQClient.getInstance();
    console.log("Sending message to update user role:", interviewerId);

    const updateRole = await client.produce(
      interviewerId,
      "updateRoleInterviewer",
      "toUser"
    ) as UpdateRoleResponse
    console.log("Message sent:", updateRole);

    if (updateRole && updateRole.accessToken) {
      return { accessToken: updateRole.accessToken };
    }

    return null;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update user role");
  }
};
