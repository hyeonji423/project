import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { POST_MY_MEDI_API_URL } from '../../utils/apiUrl'
import { postRequest } from '../../utils/requestMethods'



const postMyMediFetchThunk = (actionType, apiURL)=>{
  return createAsyncThunk(actionType, async (postData, { rejectWithValue }) => {
    // console.log(postData);
    try {
      const options = {
        body: JSON.stringify(postData), // 표준 JSON 문자열로 변환 json 형식일 때
        // method: "POST",
        // body: postData, // json 형식이 아닐 때
      };
      const response = await postRequest(apiURL, options);
      return response; // { status, data } 형태로 반환
    }
    catch (error) {
      // 에러 시 상태 코드와 메시지를 포함한 값을 rejectWithValue로 전달
      return rejectWithValue(error);
    }
  });
}

export const fetchPostMyMediData = postMyMediFetchThunk(
  'fetchPostMyMedi', // action type
  POST_MY_MEDI_API_URL // 요청 url
)

// handleFulfilled 함수 정의 : 요청 성공 시 상태 업데이트 로직을 별도의 함수로 분리
const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

// handleRejected 함수 정의 : 요청 실패 시 상태 업데이트 로직을 별도의 함수로 분리
const handleRejected = (state, action) => {
  // console.log('Error', action.payload);
  state.isError = true;
  state.errorMessage = action.payload?.msg || "Something went wrong"
};


const myMediSlice = createSlice({
  name: 'myMedi', // slice 기능 이름
  initialState: {
    // 초기 상태 지정
    postMyMediData: null,
    
  },
  
  extraReducers: (builder)=>{
    builder
      .addCase(fetchPostMyMediData.fulfilled, handleFulfilled('postMyMediData'))
      .addCase(fetchPostMyMediData.rejected, handleRejected)

    
  }
})  // slice 객체 저장


export default myMediSlice.reducer;