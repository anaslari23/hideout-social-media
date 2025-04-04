
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  SkipForward,
  X,
  AlertCircle,
  ArrowLeft,
  Check
} from "lucide-react";
import AuthLayout from "./AuthLayout";
import { useAuth, SignupData } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface StepProps {
  onNext: (data: any) => void;
  onBack?: () => void;
  isLoading: boolean;
}

const Step1: React.FC<StepProps> = ({ onNext, isLoading }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<{firstName?: string; lastName?: string}>({});

  const validateForm = () => {
    const newErrors: {firstName?: string; lastName?: string} = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ firstName, lastName });
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center text-black mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.firstName && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {errors.firstName}
            </div>
          )}
        </div>
        <div>
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.lastName ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.lastName && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {errors.lastName}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Button type="submit" disabled={isLoading}>
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

const Step2: React.FC<StepProps> = ({ onNext, onBack, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      username?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      newErrors.username = "Username can only contain letters, numbers, dots, and underscores";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(password)) {
      newErrors.password = "Password must include uppercase, lowercase, number, and special character";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ username, password });
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center text-black mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={errors.username ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.username && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {errors.username}
            </div>
          )}
        </div>
        
        <div>
          <Input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {errors.password}
            </div>
          )}
        </div>
        
        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "border-red-500" : ""}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {errors.confirmPassword}
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            disabled={isLoading}
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

const Step3: React.FC<StepProps & {
  onSendOtp: (phoneNumber: string) => Promise<boolean>;
  onVerifyOtp: (phoneNumber: string, otp: string) => Promise<boolean>;
}> = ({ onNext, onBack, isLoading, onSendOtp, onVerifyOtp }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState<{phoneNumber?: string; otp?: string}>({});
  const { toast } = useToast();

  const validatePhoneNumber = () => {
    const newErrors: {phoneNumber?: string} = {};
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    setErrors({...errors, phoneNumber: newErrors.phoneNumber});
    return !newErrors.phoneNumber;
  };

  const handleSendOtp = async () => {
    if (!validatePhoneNumber()) return;
    
    const success = await onSendOtp(phoneNumber);
    if (success) {
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${phoneNumber}`,
      });
    } else {
      toast({
        title: "Failed to send OTP",
        description: "Please check your phone number and try again",
        variant: "destructive",
      });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      setErrors({...errors, otp: "Please enter a valid 4-digit OTP"});
      return;
    }
    
    setVerificationAttempted(true);
    const success = await onVerifyOtp(phoneNumber, otp);
    
    if (success) {
      setIsVerified(true);
      toast({
        title: "Verification Successful",
        description: "Your phone number has been verified",
      });
    } else {
      setErrors({...errors, otp: "Invalid OTP, please try again"});
      toast({
        title: "Verification Failed",
        description: "The code you entered is incorrect",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerified) {
      onNext({ phoneNumber });
    } else if (otpSent) {
      handleVerifyOtp();
    } else {
      handleSendOtp();
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center text-black mb-6">Verify Phone</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={errors.phoneNumber ? "border-red-500" : ""}
            disabled={isLoading || otpSent}
          />
          {errors.phoneNumber && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {errors.phoneNumber}
            </div>
          )}
        </div>
        
        {otpSent && (
          <div className="mt-4">
            <p className="text-sm text-center mb-2">Enter the 4-digit code sent to your phone</p>
            <div className="flex justify-center my-4">
              <InputOTP maxLength={4} value={otp} onChange={setOtp} disabled={isLoading || isVerified}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.otp && (
              <div className="text-red-500 text-sm mt-1 text-center">
                {errors.otp}
              </div>
            )}
            {isVerified && (
              <div className="text-green-500 text-sm mt-2 flex items-center justify-center">
                <Check size={16} className="mr-1" /> Phone number verified successfully
              </div>
            )}
            <div className="text-center mt-2">
              <button 
                type="button"
                onClick={handleSendOtp} 
                className="text-blue-500 text-sm hover:underline"
                disabled={isLoading}
              >
                Resend Code
              </button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            disabled={isLoading}
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || (verificationAttempted && !isVerified)}
          >
            {!otpSent ? "Send Code" : isVerified ? "Complete" : "Verify"}
          </Button>
        </div>
      </form>
    </>
  );
};

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    password: "",
  });
  const { signup, sendOtp, verifyOtp, socialLogin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = (data: any) => {
    setUserData({ ...userData, ...data });
    
    if (step === 3) {
      handleCompleteSignup({ ...userData, ...data });
      return;
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleCompleteSignup = async (finalData: SignupData) => {
    const success = await signup(finalData);
    
    if (success) {
      toast({
        title: "Registration successful",
        description: "Welcome to Hideout! You can now login.",
      });
      navigate("/login");
    } else {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account",
        variant: "destructive",
      });
    }
  };

  const handleSocialSignup = async (provider: string) => {
    const success = await socialLogin(provider);
    
    if (success) {
      toast({
        title: `${provider} signup successful`,
        description: "Welcome to Hideout!",
      });
      navigate("/feed");
    } else {
      toast({
        title: "Signup failed",
        description: `Could not connect to ${provider}`,
        variant: "destructive",
      });
    }
  };

  const handleSkip = () => {
    console.log("Development mode: Skipping registration");
    navigate("/feed");
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-center text-black mb-8">HIDEOUT</h1>
        
        {step === 1 && <Step1 onNext={handleNext} isLoading={isLoading} />}
        {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} isLoading={isLoading} />}
        {step === 3 && (
          <Step3 
            onNext={handleNext} 
            onBack={handleBack} 
            isLoading={isLoading}
            onSendOtp={sendOtp}
            onVerifyOtp={verifyOtp}
          />
        )}
        
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
                  className="rounded-full p-2 bg-slate-800 text-white hover:bg-slate-900 transition-colors"
                  onClick={() => handleSocialSignup("X")}
                  disabled={isLoading}
                  aria-label="Sign up with X"
                >
                  <X size={16} />
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
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Login here
                </Link>
              </p>
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
