import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  
  fetchGetMediInfoByIdData,
} from "../../redux/slices/medicineSlice";

function Medidetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getMediInfoByIdData: medicineInfo } = useSelector((state) => state.medicine);
  
  const [medicineData, setMedicineData] = useState({
    제품명: "",
    주성분: "",
    효능: "",
    사용법: "",
    부작용: "",
    image_url: "",
    약음식주의사항: "",
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchGetMediInfoByIdData(id));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (medicineInfo) {
      setMedicineData({
        제품명: medicineInfo.제품명,
        주성분: medicineInfo.주성분,
        효능: medicineInfo.효능,
        사용법: medicineInfo.사용법,
        부작용: medicineInfo.이상반응,
        업체명: medicineInfo.업체명,
        image_url: medicineInfo.image_url || "/mediImage/default.jpg",
        약음식주의사항: medicineInfo.약음식주의사항,
      });
    }
  }, [medicineInfo]);

  if (isLoading) return <div className="text-center py-8">로딩 중...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">에러: {error}</div>;
  if (!medicineInfo) {
    return (
      <div className="text-center py-8">
        데이터를 불러오는데 문제가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center py-8 mb-10">
      <div className="w-[70%] max-w-[1200px] flex flex-col gap-6 mt-10">
        <h1 className="text-4xl font-bold mb-10">의약품 상세정보</h1>
      </div>

      <div className="flex w-[70%] max-w-[1200px]">
        <div className="border border-gray-200 rounded-lg mb-4 shadow-sm">
          <img
            // src="/mediImage/게보린정.jpg"
            src={medicineData.image_url}            
            onError={(e) => {
              e.target.src = "/mediImage/default.jpg";
              e.target.onerror = null;
            }}
            alt={medicineData.제품명}
            className="w-[300px] h-[300px] object-cover"
          />
        </div>
        <div className="w-[70%] text-3xl font-bold mb-2 ml-12">
          {medicineData.제품명}
          <div className="flex w-full text-[18px] font-medium flex-col gap-4 mt-4">
            <p className="text-gray-400 text-sm">
              업체명: {medicineData.업체명}
            </p>
          </div>
          <span className="block border-b my-6 border-gray-300 w-4/5"></span>
          <h2 className="text-2xl text-blue-600 font-bold mb-2">주성분</h2>
          <p className="text-sm font-thin">{medicineData.주성분}</p>
        </div>
      </div>

      <div className="w-[70%] max-w-[1200px]">
        <div className="p-6">
          <h2 className="text-2xl text-blue-600 font-bold mb-3">효능</h2>
          <p className="leading-relaxed">{medicineData.효능}</p>
        </div>

        <div className="p-6">
          <h2 className="text-2xl text-blue-600 font-bold mb-3">사용법</h2>
          <p className="leading-relaxed">{medicineData.사용법}</p>
        </div>

        <div className="p-6">
          <h2 className="text-2xl text-blue-600 font-bold mb-3">부작용</h2>
          <p className="leading-relaxed">{medicineData.부작용}</p>
        </div>

        <div className="p-6">
          <h2 className="text-2xl text-blue-600 font-bold mb-3">
            약음식 주의사항
          </h2>
          <p className="leading-relaxed">{medicineData.약음식주의사항}</p>
        </div>
      </div>
    </div>
  );
}

export default Medidetail;
