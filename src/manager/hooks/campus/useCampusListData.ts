import React from 'react';
import { RowType, SearchTitle, TableData } from '../../types';
import { campusListRequest } from '../../services/api';

export const useCampusListData = () => {
  const campusSearchTitle = SearchTitle.CAMPUS;

  const [campusData, setCampusData] = React.useState<TableData>({
    type: RowType.CAMPUS,
    contents: []
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const loadCampus = async () => {
    setIsLoading(true);
    try {
      const response = await campusListRequest();
      const data = response.data;

      setCampusData({
        type: RowType.CAMPUS,
        contents: data.map((item: any) => ({
          id: item.id,
          name: item.name + ' 캠퍼스'
        }))
      });
    } catch (error) {
      console.error('캠퍼스 정보 로드 실패: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadCampus();
  }, []);
  return {
    campusSearchTitle,
    campusData,
    isLoading,
    loadCampus
  };
};
