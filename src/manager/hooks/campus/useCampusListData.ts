import React from 'react';
import { RowType, SearchTitle, TableData } from '../../types';
import { campusListRequest } from '../../services/api';

export function useCampusListData() {
  const campusSearchTitle = SearchTitle.CAMPUS;
  const [campusData, setCampusData] = React.useState<TableData>({
    type: RowType.CAMPUS,
    contents: []
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadCampuses = async () => {
      setIsLoading(true);
      try {
        const response = await campusListRequest();
        const data = response.data;
        setCampusData({
          type: RowType.CAMPUS,
          contents: data.map((campus: any) => ({
            id: campus.id,
            name: campus.name + ' 캠퍼스'
          }))
        });
      } catch (error) {
        console.error('Failed to fetch campuses:', error);
        // 에러 처리 로직 추가
      } finally {
        setIsLoading(false);
      }
    };
    loadCampuses();
  }, []);

  const handleAddCampus = () => {
    // 캠퍼스 추가 요청 로직
  };

  return { campusSearchTitle, campusData, isLoading, handleAddCampus };
}
