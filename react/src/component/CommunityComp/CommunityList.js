import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import CommunityApi from '../../api/communityApi';
import CommunityListData from './CommunityListData';
import ContentList from '../HandlerComp/ContentList';

const CommunityList = ({ sortListText }) => {
  const { animalType, category } = useParams();
  
  const fetchPosts = (page, pageSize) => {
      return sortListText === "최신순" ?
      CommunityApi.fetchCommunityPosts(animalType, category, pageSize, page)
      : CommunityApi.fetchSortLikeCommunityPosts(animalType, category, pageSize, page);
  }

  const renderPosts = (item) => (
    <CommunityListData 
              key={item.id} 
              item={item}
    />
  );

  useEffect(() => {

  }, [animalType, category, sortListText]);

  return (
    <div>
      <div className={styles.communities_content_area}>
        <ContentList fetchItems={fetchPosts} renderItem={renderPosts} fetchParams={[category, animalType]}
            />
      </div>
    </div>
  );
};

export default CommunityList;
