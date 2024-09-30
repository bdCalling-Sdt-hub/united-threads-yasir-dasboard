export interface TUser {
  fcmToken: any
  _id: string
  name: string
  slug: string
  email: string
  contact: string
  gender: string
  profilePicture: any
  role: string
  isActive: boolean
  isDelete: boolean
  createdAt: string
  updatedAt: string
  validation: Validation
}

export interface Validation {
  isVerified: boolean
  _id: string
}

export interface TUserCount {
    name: string,
    doctor: number,
    patient: number,
    admin:number
}




// Interface for the Validation object
interface IValidation {
  isVerified: boolean;
  _id: string;
}

// Interface for the User object


// Interface for Blood Pressure
export interface IBloodPressure {
  _id: string;
  user: string; // User's ObjectId
  date: string;
  time: string;
  data: number;
  diastolic: number;
  systolic: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for Glucose
export interface IGlucose {
  _id: string;
  user: string; // User's ObjectId
  date: string;
  time: string;
  label: string;
  data: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for Weight
export interface IWeight {
  _id: string;
  user: string; // User's ObjectId
  date: string;
  time: string;
  weight: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for HealthRecord
export interface IHealthRecord {
  _id: string;
  user: string; // User's ObjectId
  file: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for the main Patient data structure
export interface TPatient {
  _id: string;
  user: TUser;
  slug: string;
  dateOfBirth: string | null;
  bloodGroup: string;
  height: number | null;
  lastMenstrualPeriod: string | null;
  weightBeginningPregnancy: number | null;
  pregnancyType: string;
  vitroFertilization: boolean;
  chronicHypertension: boolean;
  lupus: boolean;
  gestationalAge: number | null;
  antiphospholipidSyndrome: boolean;
  motherPreeclampsiaHistory: boolean;
  firstPregnancy: boolean;
  historyOfPreeclampsia: boolean;
  babyBelow2500Grams: boolean;
  higherRiskOfPreeclampsia: boolean;
  isActive: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  bloodPressure: IBloodPressure[];
  glucose: IGlucose[];
  weight: IWeight[];
  healthRecord: IHealthRecord[];
  age: number | null
}


export interface TDoctor {
  _id: string;
  user: TUser;
  slug: string;
  title: string;
  experience: string;
  address: string;
  about: string;
  isActive: boolean;
  isDelete: boolean;
  __v: number;
}

export type TSettings = {
  _id: string,
  label: string
  __v: 0,
  content: string
}