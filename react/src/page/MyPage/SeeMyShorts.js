import React, { useState, useEffect } from "react";
import MyPageCommonTopBar from '../../component/MyPageComp/MyPageCommonTopBar'
import ShortItem from "../../component/ShortsComp/ShortItem";
import shortsApi from "../../api/shortsApi";
import styles from "../../css/shortsscreen.module.css"

const SeeMyShorts = () => {

    const [shorts, setShorts] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                console.log("요청보냄")
                await getMyShorts();
            }catch(error){
                console.log(error);
            }finally{
                setIsLoaded(true);
            }
         
        }
        fetchData();
    },[])
    

    const getMyShorts =async() =>{
        const resp = await shortsApi.getMyShorts();
        
        setShorts(resp);
    }
    if(!isLoaded){
        return(<div>Loading...</div>)
    }
    return (
        <div style={{width:"80%"}}>
            <MyPageCommonTopBar title={'내 쇼츠'} />
            {(shorts!=null && shorts != "")? shorts.map((short) => (
              <ShortItem
                key={short.id}
                id={short.id}
                thumbnailUrl={short.thumbnailUrl}
                title={short.title}
                author={short.author}
                
                widthAdjust="100%" // 그리드 내에서 너비를 조정
                heightAdjust="250px" // 필요 시 높이를 조정
              />
            )) : <div>쇼츠가없습니다</div>}
        </div>
    )
}

export default SeeMyShorts;