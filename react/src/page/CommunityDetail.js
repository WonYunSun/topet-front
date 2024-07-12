import { useParams } from 'react-router-dom';
import TopBar from '../component/TopBar';
import styles from '../css/community_detail.module.css'
import { BsChatFill } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";


const CommunityDetail = () => {
  const { comid } = useParams();
  const title = "저희 집의 자랑 귀여운 요크셔 테리어 보고 가세요~"
  const content = "안녕하세요 저희 집 강아지를 자랑하고 싶어서 올려봤습니다. 품종은 요크셔테리어고, 이름은 체리에요. 체리는 11살이 된 노견이랍니다. 우리 집에 온 게 엊그제 같은데 벌써 11차가 되었네요. 불과 작년만 해도 아주 건강한 강아지였습니다. 지금은 아픈 곳이 많아서 산책을 못 나가고 있어요ㅠㅠ 병이 더 진전이 되지 않고 오래오래 살았으면 좋겠네요"
  const imgURLs = ["https://cdn.pixabay.com/photo/2017/02/05/17/20/yorkshire-2040656_1280.jpg", "https://cdn.pixabay.com/photo/2017/02/05/17/20/yorkshire-2040656_1280.jpg", "https://cdn.pixabay.com/photo/2017/02/05/17/20/yorkshire-2040656_1280.jpg", "https://cdn.pixabay.com/photo/2017/02/05/17/20/yorkshire-2040656_1280.jpg", "https://cdn.pixabay.com/photo/2017/02/05/17/20/yorkshire-2040656_1280.jpg"] 

  return (
    <div>
      <TopBar />
      
      <div className={styles.profile}>
        <img src={imgURLs[0]} alt='' className={styles.profileImg} />
        <div className={styles.profileDetails}>
        <div className={styles.profileName}>체리 (hon****)</div>
        <div className={styles.profileInfo}>요크셔 테리어 · 11살 · 암컷(중성화)</div>
      </div>
    </div>
    <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
      {imgURLs.length > 1 ? (
        <div className={styles.images_container}>
          {imgURLs.map((url, index) => (
            <img key={index} src={url} alt={`이미지 ${index + 1}`} />
          ))}
        </div>
      ) : (
        <div className={styles.content}><img src={imgURLs[0]} alt='이미지' /></div>
      )}
      <div className={styles.hashtags}>
        <span className={styles.hashtag}>#요크셔</span>
        <span className={styles.hashtag}>#자랑</span>
        <span className={styles.hashtag}>#슬개골</span>
        <span className={styles.hashtag}>#노견</span>
      </div>
      <div className={styles.like_and_coment}>
                <div className="icon-group">
                  <BiSolidLike className={styles.icon}/>
                  <span> 10</span> {/* 여기 나중에 받아온 값으로 변경 */}
                </div>
                <div className="icon-group">
                  <BsChatFill className={styles.icon}/>
                  <span> 5</span> {/* 여기 나중에 받아온 값으로 변경 */}
                </div>
              </div>
      <div className={styles.coment_area}>

      </div>
    <p>게시물 ID: {comid}</p>
    </div>
  );
};

export default CommunityDetail;
