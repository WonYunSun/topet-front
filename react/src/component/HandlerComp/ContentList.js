import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LoadError, Loading, NoContent } from "./CompHandler";
import styles from "../../css/contentlist.module.css";

const PAGE_SIZE = 10;

const ContentList = ({ fetchItems, renderItem, fetchParams }) => {
  const [resources, setResources] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadMoreItems = async () => {
    if (!hasMore || loading) {
      return;
    }
    try {
      const newResource = await fetchItems(page, PAGE_SIZE);
      if (newResource.length < PAGE_SIZE) {
        setHasMore(false);
      }
      setResources((prev) => [...prev, ...newResource]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setHasError(true);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
    setPage(0); // Reset page to 0 when parameters change
    setHasMore(true); // Reset hasMore when params change
    setHasError(false);
    setResources([]); // Clear current resources
    loadMoreItems(); // Load items based on the new parameters
  }, [fetchParams]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreItems();
    }
  }, [inView, hasMore]);

  return (
    <div className={styles.list_wrapper}>
      {resources.map(renderItem)}
      {!loading && hasMore && (
        <div ref={ref}>
          <Loading />
        </div>
      )}
      {!loading && hasError && <LoadError />}
      {!loading && !hasError && !hasMore && resources.length === 0 && (
        <NoContent />
      )}
    </div>
  );
};

export default ContentList;
