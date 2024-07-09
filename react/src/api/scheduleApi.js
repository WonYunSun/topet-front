const API_BASE_URL = "http://175.45.202.131:8081/api"; // 실제 API 엔드포인트로 변경하세요.

export const updateScheduleStatus = async (scheduleId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/schedules/postScheduleId/${scheduleId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scheduleId }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to update schedule status:", error);
    throw error;
  }
};
