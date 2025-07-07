import React, { useEffect, useState, useLayoutEffect } from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Calendar } from "../component/CalendarComp/Calendar";
import TopBar from "../component/TopBar";
import AnimalSelect from "../component/AnimalProfileComp/AnimalSelect";
import BottomSheet from "../component/BottomSheet";
import ScheduleBottom from "../component/CalendarComp/ScheduleBottom";
import styles from "../css/calendarscreen.module.css";
import FloatingBtn from "../component/ButtonComp/FloatingBtn";
import isBetween from "dayjs/plugin/isBetween";
import NavBar from "../component/NavBarComp/NavBar";
import CheckModal from "../component/CheckModal";
import SubBottomSheet from "../component/SubBottomSheet";
import { useSelector, useDispatch } from "react-redux";
import scheduleApi from "../api/scheduleApi";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isBetween);

const Calendarscreen = () => {
  const reduxMember = useSelector((state) => state.member.member);
  const reduxPet = useSelector((state) => state.selectedPet.selectedPet);
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1204px)",
  });

  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  //console.log("캘린더에서 출력한 reduxMember : " ,reduxMember);
  //console.log("캘린더에서 출력한 reduxPet : " ,reduxPet);

  const [schedules, setSchedules] = useState();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState(null);
  const [selectedPet, setSelectedPet] = useState(reduxPet);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showCancleModal, setShowCancleModal] = useState(false);
  const [initialAddScheduleValues, setInitialAddScheduleValues] = useState({
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
    title: "",
    content: "",
    isComplete: false,
    color: "#DE496E",
  });
  const [bottomSheetContent, setBottomSheetContent] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showEditDeleteBottomSheet, setEditDeleteBottomSheet] = useState(false);
  const [editDeleteBottomSheettype, setEditDeleteBottomSheettype] =
    useState(null);
  const [ScheduleDelete, setScheduleDelete] = useState(false); // 스케줄 삭제 상태

  const [scheduleSubmittedSuccessfully, setScheduleSubmittedSuccessfully] =
    useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSchduleUpdate, setIsSchduleUpdate] = useState(false);

  useEffect(() => {
    // handleAddScheduleBottomSheetClose();
    handleCloseBottomSheet();
    // modal();
    console.log("scheduleSubmittedSuccessfully", scheduleSubmittedSuccessfully);
  }, [scheduleSubmittedSuccessfully]);

  useEffect(() => {
    console.log("selectedPet이 변동되어서, 새로운 데이터를 요청함");
    const fetchData = async () => {
      try {
        let mySchedule = await scheduleApi.getPetScheduleAPI(selectedPet.id);
        setSchedules(mySchedule);
        console.log("새로운 데이터 : ", schedules);
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      } finally {
        setIsLoaded(true); // 데이터 로딩 완료
        setIsSchduleUpdate(false);
      }
    };
    fetchData();
  }, [selectedPet, isSchduleUpdate]);

  const handleDotsClick = (schedule) => {
    setSelectedSchedule(schedule);
    setEditDeleteBottomSheettype("EditDelete");
    setEditDeleteBottomSheet(true);
  };

  const handleCloseshowEditDeleteBottomSheet = () => {
    setEditDeleteBottomSheet(false);
  };

  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setBottomSheetType("editSchedule");
    setEditDeleteBottomSheet(false);
  };

  const handleDeleteClick = (schedule) => {
    setEditDeleteBottomSheet(false);
    setShowBottomSheet(false);
    setScheduleDelete(true);
  };

  const handleOpenPetBottomSheet = () => {
    setBottomSheetType("pet");
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    setBottomSheetContent(null);
  };

  const handleAddScheduleBottomSheetClose = () => {
    console.log("1", scheduleSubmittedSuccessfully);
    if (scheduleSubmittedSuccessfully) {
      setScheduleSubmittedSuccessfully(false);
      console.log("2", scheduleSubmittedSuccessfully);
    } else if (!scheduleSubmittedSuccessfully) {
      modal();
    }
    setShowBottomSheet(false);
  };

  const modal = () => {
    if (!scheduleSubmittedSuccessfully) {
      setTimeout(() => setShowCancleModal(true), 100);
    }
  };

  const handleContinueWriting = () => {
    setShowCancleModal(false);
    if (bottomSheetType == "addSchedule") {
      setBottomSheetType("addSchedule");
    } else if (bottomSheetType == "scheduleDetail") {
      setBottomSheetType("scheduleDetail");
      setScheduleDelete(false);
    } else {
      setBottomSheetType("editSchedule");
    }

    setShowBottomSheet(true);
    setShowCancleModal(false);
  };

  const handleCloseCancleModal = () => {
    setScheduleDelete(false);
    setShowCancleModal(false);
  };

  const handleDateClick = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setInitialAddScheduleValues((prev) => ({
      ...prev,
      startDate: dayjs(date).toDate(),
      endDate: dayjs(date).toDate(),
    }));
  };

  const handleFloatingBtnClick = () => {
    setBottomSheetType("addSchedule");
    setInitialAddScheduleValues({
      startDate: dayjs(selectedDate).toDate(),
      endDate: dayjs(selectedDate).toDate(),
      title: "",
      content: "",
      isComplete: false,
      color: "#DE496E",
      // selectedPhoto: "",
    });
    setShowBottomSheet(true);
  };

  const handleScheduleClick = (schedule) => {
    console.log("Clicked schedule: ", schedule);
    setSelectedSchedule(schedule);
    setBottomSheetType("scheduleDetail");
    setShowBottomSheet(true);
  };
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Mobile>
        <TopBar />
      </Mobile>

      <div className={`${isDeskTop ? styles.Calendarwrapper : ""}`}>
        {(isMobile || isTablet) &&
          (reduxPet == null ? (
            <></>
          ) : (
            <div className={`${isTablet && styles.tb_paddingdiv}`}>
              <AnimalSelect
                onClick={handleOpenPetBottomSheet}
                selectedPet={selectedPet}
              />
            </div>
          ))}

        <BottomSheet
          show={showBottomSheet}
          onClose={
            bottomSheetType === "addSchedule" ||
            bottomSheetType === "editSchedule"
              ? handleAddScheduleBottomSheetClose
              : handleCloseBottomSheet
          }
          scheduleSubmittedSuccessfully={scheduleSubmittedSuccessfully}
          setScheduleSubmittedSuccessfully={setScheduleSubmittedSuccessfully} // 전달된 부분
          type={bottomSheetType}
          initialTags={[]}
          selectedDate={selectedDate}
          schedules={schedules}
          setSchedules={setSchedules}
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
          initialAddScheduleValues={initialAddScheduleValues}
          schedule={bottomSheetContent}
          onDotsClick={handleDotsClick}
          onEditClick={handleEditClick}
          selectedSchedule={selectedSchedule}
          reduxPet={reduxPet}
          setIsSchduleUpdate={setIsSchduleUpdate}
        />
        {showCancleModal &&
          (bottomSheetType === "addSchedule" ||
            bottomSheetType === "editSchedule") && (
            <CheckModal
              Content="일정 작성을 취소하시겠어요?"
              CancleBtnContent="작성 취소"
              ContinueBtnContent="계속 작성"
              onClose={handleCloseCancleModal}
              onContinue={handleContinueWriting}
            />
          )}

        {ScheduleDelete && (
          <CheckModal
            Content="일정을 삭제하시겠어요?"
            CancleBtnContent="삭제"
            ContinueBtnContent="삭제 취소"
            onClose={handleCloseCancleModal}
            onContinue={handleContinueWriting}
          />
        )}

        <Mobile>
          <Calendar schedules={schedules} onDateClick={handleDateClick} />
          <ScheduleBottom
            schedules={schedules}
            selectedDate={selectedDate}
            onScheduleClick={handleScheduleClick}
          />
        </Mobile>
        <DeskTop>
          {!isTablet ? (
            <div className={`${styles.CalendarscreenWrap_dtver}`}>
              <div className={`${styles.leftWrapper}`}>
                <div>캘린더</div>
              </div>
              <div className={`${styles.rightWrapper}`}>
                <div>
                  <Calendar
                    schedules={schedules}
                    onDateClick={handleDateClick}
                  />
                </div>
                <div>
                  {reduxPet == null ? (
                    <></>
                  ) : (
                    <AnimalSelect
                      onClick={handleOpenPetBottomSheet}
                      selectedPet={selectedPet}
                    />
                  )}
                  <ScheduleBottom
                    schedules={schedules}
                    selectedDate={selectedDate}
                    onScheduleClick={handleScheduleClick}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <Calendar schedules={schedules} onDateClick={handleDateClick} />
              <ScheduleBottom
                schedules={schedules}
                selectedDate={selectedDate}
                onScheduleClick={handleScheduleClick}
              />
            </>
          )}
        </DeskTop>

        <SubBottomSheet
          show={showEditDeleteBottomSheet}
          onClose={handleCloseshowEditDeleteBottomSheet}
          type={editDeleteBottomSheettype}
          onEditClick={handleEditClick}
          selectedSchedule={selectedSchedule}
          onDeleteClick={handleDeleteClick}
        />

        {reduxPet === null || reduxPet === undefined ? (
          ""
        ) : (
          <FloatingBtn onClick={handleFloatingBtnClick} />
        )}
      </div>
    </>
  );
};

export default Calendarscreen;
