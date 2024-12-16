import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchPostAuthData,
  fetchPostEmailVerificationData,
  verifyEmail,
} from "../../redux/slices/authSlice";
import mediLogo from "../../assets/medi_logo.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isEmailVerified, verificationCode } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      alert("이미 로그인된 상태입니다.");
      navigator("/");
    }
  }, [navigator]);

  const [value, setValue] = useState({
    email: "",
    password: "",
    birth_date: "",
    confirm_password: "",
  });

  const [userInputCode, setUserInputCode] = useState("");

  const handleSendVerification = async () => {
    if (!value.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      await dispatch(fetchPostEmailVerificationData(value.email)).unwrap();
      alert("인증 코드가 발송되었습니다.");
    } catch (error) {
      alert("인증 코드 발송 실패");
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = () => {
    if (userInputCode === verificationCode) {
      dispatch(verifyEmail(userInputCode));
      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("인증코드가 일치하지 않습니다.");
    }
  };
  // const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 쿼리가 잡히지 않게(경로 표시X)

    if (
      value.email === "" ||
      value.password === "" ||
      value.confirm_password === "" ||
      value.birth_date === ""
    ) {
      alert("모든 항목은 필수 입력값입니다.");
      return;
    }
    if (value.password !== value.confirm_password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // const formData = new FormData();
    // formData.append("username", value.username);
    // formData.append("email", value.email);
    // formData.append("password", value.password);
    // if (file) {
    //   formData.append("profile_img", file); // 파일 추가
    // }

    const data = {
      email: value.email,
      password: value.password,
      birth_date: value.birth_date,
    };

    try {
      const response = await dispatch(fetchPostAuthData(data)).unwrap();
      // console.log(response);
      if (response.status === 201) {
        alert(response.data.msg);
        navigator("/login");
        return;
      }
      if (response.data.success === false) {
        alert(response.data.msg);
        return;
      }
    } catch (error) {
      alert(error.msg);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto mb-16">
      <div className="logo w-[350px] mt-32 mb-12">
        <img src={mediLogo} alt="logo" />
      </div>
      <div className="shadow-lg px-12 py-10 w-[500px] border mb-16 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* <label htmlFor="username" className="block text-neutral-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-3 py-2 border"
              name="username"
              onChange={handleChange}
            /> */}
          </div>
          <div className="mb-1">
            <label
              htmlFor="email"
              className="block text-neutral-700 text-lg mb-1"
            >
              이메일
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md mb-2"
                name="email"
                onChange={handleChange}
              />
              <button
                onClick={handleSendVerification}
                className="px-4 py-2 bg-blue-500 text-white rounded-md text-[10px] hover:bg-blue-700 hover:text-white transition-all duration-200"
                type="button"
              >
                인증코드 발송
              </button>
            </div>
          </div>

          {verificationCode && (
            <div className="mb-4">
              <label className="block text-neutral-700 text-lg mb-1">
                인증코드 확인
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="인증코드 입력"
                  className="w-full px-3 py-2 border rounded-md"
                  value={userInputCode}
                  onChange={(e) => setUserInputCode(e.target.value)}
                />
                <button
                  onClick={handleVerifyCode}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  type="button"
                >
                  확인
                </button>
              </div>
            </div>
          )}

          <div className="mb-1">
            <label
              htmlFor="password"
              className="block text-neutral-700 text-lg mb-1"
            >
              비밀번호
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md mb-2"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="confirmPassword"
              className="block text-neutral-700 text-lg mb-1"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="Comfirm Password"
              className="w-full px-3 py-2 border rounded-md mb-2"
              name="confirm_password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label
              htmlFor="birth_date"
              className="block text-neutral-700 text-lg mb-1"
            >
              생년월일
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md mb-6"
              name="birth_date"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-6">
            <button
              className="w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200"
              type="submit"
            >
              가입 하기
            </button>
            <Link to="/" className="w-full h-12">
              <button className="w-full h-12 border border-neutral-700 rounded-md hover:text-blue-600 hover:border-blue-600 transition-all duration-200">
                가입 취소
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
