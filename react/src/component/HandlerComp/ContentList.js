import React, { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { LoadError, Loading, NoContent } from "./CompHandler";

const PAGE_SIZE = 10;

const ContentList = ({ posts, fetchItems, renderItem, fetchParams }) => {
  const [resources, setResources] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchParamsMemo = useMemo(
    () => fetchParams,
    [JSON.stringify(fetchParams)]
  );

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
    setPage(0);
    setHasMore(true);
    setHasError(false);
    setResources([]);
  }, [fetchParamsMemo]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreItems();
    }
  }, [inView, hasMore]);

  return (
    <div>
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
