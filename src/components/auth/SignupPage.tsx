
import React, { useState } from "react";
import AuthLayout from "./AuthLayout";

interface StepProps {
  onNext: (data: any) => void;
}

const Step1: React.FC<StepProps> = ({ onNext }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ firstName, lastName });
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center text-black mb-6">SignUp</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="auth-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            className="auth-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="auth-small-button">
            NEXT
          </button>
        </div>
      </form>
    </>
  );
};

const Step2: React.FC<StepProps> = ({ onNext }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ username });
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center text-black mb-6">SignUp</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Create Username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="auth-small-button">
            NEXT
          </button>
        </div>
      </form>
    </>
  );
};

const Step3: React.FC<StepProps> = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ phoneNumber, otp });
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center text-black mb-6">SignUp</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="tel"
            placeholder="Enter Phone Number"
            className="auth-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            className="auth-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="auth-small-button">
            GO
          </button>
        </div>
      </form>
    </>
  );
};

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  const handleNext = (data: any) => {
    setUserData({ ...userData, ...data });
    if (step === 3) {
      // Final step - would normally send data to server
      console.log("Registration complete with data:", { ...userData, ...data });
      // Redirect to feed after registration
      window.location.href = "/feed";
      return;
    }
    
    setStep(step + 1);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-center text-black mb-8">HIDEOUT</h1>
        
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onNext={handleNext} />}
        {step === 3 && <Step3 onNext={handleNext} />}
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
