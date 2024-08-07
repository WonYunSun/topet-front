import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../component/TopBar";
import styles from "../css/shortsscreen.module.css";
import ShortItem from "../component/ShortsComp/ShortItem";
import shortsApi from "../api/shortsApi";

function ShortsDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [thsiShorts, setThisShorts] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasFetchedRandom, setHasFetchedRandom] = useState(false); // 랜덤 쇼츠를 가져왔는지 체크하는 상태
    const [scrollY, setScrollY] = useState(0); // 현재 스크롤 위치를 추적하는 상태

    const screenX = window.outerWidth;
    const screenY = window.outerHeight;

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up
        };
    }, [
        
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getShortsDetail();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoaded(true);
            }
        };
        fetchData();
    }, []);

    const getShortsDetail = async () => {
        const resp = await shortsApi.getShortsDetail(id);
        setThisShorts(resp);
        console.log(resp);
    };

    const getRandomShorts = async () => {
        if (!hasFetchedRandom) { // 이미 랜덤 쇼츠를 가져온 경우가 아니라면
            const resp = await shortsApi.getRandomShorts();
            console.log(resp); // 랜덤 쇼츠를 콘솔에 출력
            setHasFetchedRandom(true); // 랜덤 쇼츠를 가져온 상태로 업데이트
            navigate(`/shortsDetail/${resp}`)
        }
    }

    // 스크롤 이벤트를 감지하는 함수
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY); // 현재 스크롤 위치 업데이트

        if (currentScrollY >= 1) {
            getRandomShorts(); // 스크롤이 내려가면 랜덤 쇼츠를 가져옴
        }

        // 스크롤이 위로 올라가는 경우
        if (currentScrollY < scrollY) {
            navigate(-1); // 이전 주소로 돌아가기
        }
    };

    if (!isLoaded) {
        return (<div>Loading...</div>);
    }

    return (
        <div style={{ margin: "0px", overflow: "hidden" }}>
            <h1 style={{ zIndex: 1, position: "absolute" }}>ShortsDetail</h1>
            <video src={thsiShorts.videoSrc} autoPlay loop style={{ width: screenX, height: screenY }}></video>
            <div>하단여백</div>
        </div>
    );
}

export default ShortsDetail;
