import React from "react";
import Sidebar from "./Sidebar";

const Management = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Sidebar className="left-0"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <div className="wrapper border border-gray-300 rounded-lg p-10 flex flex-col gap-6">
          <h2 className="title text-2xl font-bold flex justify-center">
            My 상비약 관리 (일반 의약품)
          </h2>
          <form className="flex flex-col gap-4">
            <div className="form-item">
              <label htmlFor="drug_name">제품명</label>
              <input type="text" placeholder="제품명을 입력해주세요." />
            </div>
            <div className="form-item">
              <label htmlFor="drug_company">회사명</label>
              <input type="text" placeholder="제조회사를 입력해주세요." />
            </div>
            <div className="form-item">
              <label htmlFor="open_date">구입/개봉날짜</label>
              <input type="date" />
            </div>
            <div className="form-item flex justify-between">
              <div>
                {" "}
                <label htmlFor="exp_date">유효기간</label>
                <input type="date" />
              </div>
              <button className="btn">알림설정</button>
            </div>
            <div className="form-item">
              <label htmlFor="main_symtom">대표증상</label>
              <input type="text" placeholder="대표증상을 입력해주세요." />
            </div>
            <div className="form-item flex flex-col gap-2">
              <label htmlFor="note">NOTE</label>
              <textarea rows="4"></textarea>
            </div>
            <button className="btn h-10 !text-sm">입력완료</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Management;