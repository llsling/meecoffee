import { useState, useEffect } from "react";

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userPhone, setUserPhone] = useState(null); //手機號碼

  const handleSubmit = async () => {
    // 註冊時檢查確認密碼
    if (isRegister && password !== confirmPassword) {
      alert("密碼不一致");
      return;
    }
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    console.log("API_BASE_URL =", API_BASE_URL);

    const url = isRegister
      ? `${API_BASE_URL}/api/auth/register`
      : `${API_BASE_URL}/api/auth/login`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      });
      console.log("login response status =", res.status);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "操作失敗");
        return;
      }
      // 存 token
      localStorage.setItem("token", data.token);
      const meRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!meRes.ok) {
        alert("取得使用者資訊失敗");
        return;
      }
      const meData = await meRes.json();
      setUserPhone(meData.phone);
    } catch (err) {
      console.error(err);
      alert("系統錯誤");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("not login");
        return res.json();
      })
      .then((data) => {
        setUserPhone(data.phone);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);
  //登入成功後，只顯示歡迎畫面
  if (userPhone) {
    return (
      <div className="max-w-sm mx-auto mt-20 mb-20 p-6 bg-white shadow rounded text-center">
        <h2 className="text-2xl font-bold">歡迎～{userPhone}</h2>
      </div>
    );
  }
  return (
    <div className="max-w-sm mx-auto mt-20 p-6 mb-12 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isRegister ? "註冊會員" : "會員登入"}
      </h2>
      <div className="space-y-4">
        <input
          type="tel"
          placeholder="手機號碼"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {isRegister && (
          <input
            type="password"
            placeholder="確認密碼"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-black text-white py-2 rounded"
      >
        {isRegister ? "註冊會員" : "登入"}
      </button>
      <p className="text-center text-sm mt-4">
        {isRegister ? (
          <>
            已經是會員？
            <button
              className="text-blue-600 ml-1"
              onClick={() => setIsRegister(false)}
            >
              登入
            </button>
          </>
        ) : (
          <>
            還不是會員？
            <button
              className="text-blue-600 ml-1"
              onClick={() => setIsRegister(true)}
            >
              註冊會員
            </button>
          </>
        )}
      </p>
    </div>
  );
}
