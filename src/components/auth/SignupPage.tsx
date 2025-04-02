
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, SkipForward } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = (data: any) => {
    setUserData({ ...userData, ...data });
    if (step === 3) {
      // Final step - would normally send data to server
      setIsLoading(true);
      console.log("Registration complete with data:", { ...userData, ...data });
      
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
        navigate("/feed");
      }, 1000);
      return;
    }
    
    setStep(step + 1);
  };

  const handleSocialSignup = (provider: string) => {
    setIsLoading(true);
    console.log(`Signing up with ${provider}`);
    
    // In a real implementation, this would redirect to OAuth
    setTimeout(() => {
      setIsLoading(false);
      navigate("/feed");
    }, 1000);
  };

  const handleSkip = () => {
    console.log("Development mode: Skipping registration");
    navigate("/feed");
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-center text-black mb-8">HIDEOUT</h1>
        
        {step === 1 && <Step1 onNext={handleNext} />}
        {step === 2 && <Step2 onNext={handleNext} />}
        {step === 3 && <Step3 onNext={handleNext} />}
        
        {step === 1 && (
          <>
            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="border-t border-gray-300 flex-1"></div>
              <span className="text-sm text-gray-500 px-2">or</span>
              <div className="border-t border-gray-300 flex-1"></div>
            </div>
            
            <div className="pt-4">
              <p className="text-center text-sm text-gray-500 mb-4">Sign Up Using</p>
              <div className="flex justify-center space-x-4">
                <button 
                  className="rounded-full p-2 bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                  onClick={() => handleSocialSignup("Instagram")}
                  disabled={isLoading}
                  aria-label="Sign up with Instagram"
                >
                  <Instagram size={16} />
                </button>
                <button 
                  className="rounded-full p-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  onClick={() => handleSocialSignup("Facebook")}
                  disabled={isLoading}
                  aria-label="Sign up with Facebook"
                >
                  <Facebook size={16} />
                </button>
                <button 
                  className="rounded-full p-2 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                  onClick={() => handleSocialSignup("SMS")}
                  disabled={isLoading}
                  aria-label="Sign up with SMS"
                >
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
            
            {/* Skip button for dev purposes */}
            <div className="mt-6 text-center">
              <button 
                onClick={handleSkip}
                className="flex items-center mx-auto text-gray-500 hover:text-gray-800 text-sm py-2 px-4 rounded-full border border-dashed border-gray-300 hover:border-gray-400 transition-all"
              >
                <SkipForward size={16} className="mr-1" />
                <span>Skip for Development</span>
              </button>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
