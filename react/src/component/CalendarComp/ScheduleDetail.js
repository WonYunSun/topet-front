import React from "react";

function ScheduleDetail({ schedule }) {
  return schedule ? (
    <div>
      <h2>{schedule.scheduleTitle}</h2>
      <p>{schedule.scheduleContent}</p>
      <p>Color: {schedule.color}</p>
      <p>startDate: {schedule.startDate}</p>
      <p>endDate: {schedule.endDate}</p>
      {schedule.isComplete ? <div>완료</div> : <div>미완료</div>}
    </div>
  ) : (
    <div></div>
  );
}

export default ScheduleDetail;
