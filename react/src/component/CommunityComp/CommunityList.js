import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../css/communityList.module.css';
import CommunityApi from '../../api/communityApi';
import CommunityListData from './CommunityListData';
import ContentList from '../HandlerComp/ContentList';

const CommunityList = ({ sortListText, searchText, searchType }) => {
  const { animalType, category } = useParams();
  
  const fetchPosts = (page, pageSize) => {
    if (searchText) {
      if (searchType === "제목+본문") {
        return sortListText === "최신순" 
          ? CommunityApi.fetchTitleContentSearchCommunityPosts(animalType, category, pageSize, page, searchText)
          : CommunityApi.fetchTitleContentSearchSortLikeCommunityPosts(animalType, category, pageSize, page, searchText);
      } else if (searchType === "해시태그") {
        return sortListText === "최신순"
          ? CommunityApi.fetchHashTagSearchCommunityPosts(animalType, category, pageSize, page, searchText)
          : CommunityApi.fetchHashTagSearchSortLikeCommunityPosts(animalType, category, pageSize, page, searchText);
      }
    } else {
      return sortListText === "최신순" 
        ?  CommunityApi.fetchCommunityPosts(animalType, category, pageSize, page)
        : CommunityApi.fetchSortLikeCommunityPosts(animalType, category, pageSize, page);
    }
  }

  const renderPosts = (item) => (
    <CommunityListData 
      key={item.id} 
      item={item}
    />
  );

  return (
    <div>
      <div className={styles.communities_content_area}>
        <ContentList fetchItems={fetchPosts} renderItem={renderPosts} fetchParams={[category, animalType, sortListText, searchText, searchType]}
        />
      </div>
    </div>
  );
};

export default CommunityList;
