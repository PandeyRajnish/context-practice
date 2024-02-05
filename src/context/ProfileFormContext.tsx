import React, { createContext, useContext, useState } from "react";

interface ProfileFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  education: string;
  role: string;
  experience: string;
  bio: string;
  skills?: string[];
  upload?: any[];
}

interface ProfileFormContextProps {
  formData: ProfileFormData;
  updateFormData: (data: Partial<ProfileFormData>) => void;
}

const ProfileFormContext = createContext<ProfileFormContextProps | undefined>(
  undefined
);

export const ProfileFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "Rajnish Pandey",
    email: "rajnish@gmail.com",
    address: "Ranchi",
    city: "Ranchi",
    role: "React Developer",
    experience: "2 Years",
    bio: "I'm a React developer",
    upload: [],
    skills: [],
    education: "MCA",
  });

  const updateFormData = (data: Partial<ProfileFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <ProfileFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </ProfileFormContext.Provider>
  );
};

export const useProfileForm = () => {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error("useProfileForm must be used within a ProfileFormProvider");
  }
  return context;
};
