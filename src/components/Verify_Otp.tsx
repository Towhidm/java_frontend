import {  useState,useEffect } from "react";
import { api } from "../api/axiosInstance";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(30);


    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

   // countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/verifyEmail",
        {
          email,
          otp,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (error: any) {
      setMessage(error.response?.data?.message || "Verification failed");
    }
  };

//for resend button
  const handleResend = async () => {
    try {
      const res = await api.post(
        "/auth/resendOtp",
        { email }
      );

      setMessage(res.data.message);
      setTimer(30);

    } catch (error: any) {
      setMessage(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>

      <form onSubmit={handleVerify}>
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <br />

        <button type="submit">Verify</button>
      </form>

      {message && <p>{message}</p>}
     <br />

      <button onClick={handleResend} disabled={timer > 0}>
        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
      </button>
    </div>
    
  );
};

export default VerifyOtp;