/**
 * Type definitions for BigTime Staff API
 */

/**
 * Basic address information for a staff member
 */
export interface BigTimeStaffAddress {
  Id: number;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Country?: string;
  FullAddress?: string;
}

/**
 * Custom field for a staff member
 */
export interface BigTimeStaffCustomField {
  Sid: number;
  Name?: string;
  Value: string;
}

/**
 * Basic staff information from the /staff endpoint
 */
export interface BigTimeStaff {
  StaffSID: number;
  FName?: string;
  SName: string;
  Title?: string;
  ManagerID?: number;
  EMail: string;
  Phone_Cell?: string;
  Phone_Wk?: string;
  Phone_Hm?: string;
  Notes?: string;
  IsInactive: boolean;
  DtCreated?: string;
  DtModified?: string;
  DefaultRole?: number;
  Address?: BigTimeStaffAddress;
  Capacity?: number;
}

/**
 * Detailed staff information from the /staff/detail endpoint
 */
export interface BigTimeStaffDetail extends BigTimeStaff {
  Status?: number;
  Start_dt?: string;
  Term_dt?: string;
  UsePayrollItem?: boolean;
  CostCenterA?: number;
  CostCenterB?: number;
  CostCenterC?: number;
  CostFactor?: number;
  HourRateType?: number;
  Rate1?: number;
  Rate2?: number;
  Rate3?: number;
  Rate4?: number;
  Rate5?: number;
  StaffOrgId?: number;
  StaffType?: number;
  HomeTimezone?: string;
  UdfList?: BigTimeStaffCustomField[];
  PostTimeAsBilled?: boolean;
  // QuickBooks integration fields
  QBEmployeeId?: string;
  QBVendorId?: string;
  QBClassDefaultId?: string;
  // Sage Intacct integration fields
  IAEmployeeId?: string;
  IAVendorId?: string;
  IAClassDefaultId?: number;
}

/**
 * Basic staff information from the picklist/staff endpoint
 */
export interface BigTimeStaffPicklist {
  Id: string;
  Name: string;
  Group?: string;
  IsInactive: boolean;
}

/**
 * Staff allocation detail
 */
export interface BigTimeStaffAllocationDetail {
  StaffSid: number;
  StaffFName?: string;
  StaffSName?: string;
  StaffCC1?: number;
  StaffCC2?: number;
  StaffCC3?: number;
  StaffOrgID?: number;
  StaffInactive: boolean;
  StaffStatus?: number;
  RealCapacity?: number;
  RawCapacity?: number;
  ProjectSid?: number;
  ProjectDName?: string;
  ProjectCC1?: number;
  ProjectCC2?: number;
  ProjectCC3?: number;
  ProjectBillable?: boolean;
  ProjectInactive?: boolean;
  ProjectDeactivated?: boolean;
  ProjectTypeId?: number;
  ProjectStatusProd?: number;
  Period?: number;
  AllocatedHours?: number;
  StaffRole?: number;
  IsRole?: boolean;
}

/**
 * Staff allocation summary detail
 */
export interface BigTimeStaffAllocationSummary {
  details: BigTimeStaffAllocationDetail[];
}

/**
 * Staff skill information
 */
export interface BigTimeStaffSkill {
  SkillSID: number;
  SkillNm: string;
  SkillDesc?: string;
  SkillTypeSID: number;
  SkillCategorySID?: number;
  SkillCategoryNm?: string;
  RoleList?: number[];
  IsExpiring: boolean;
  IsRating: boolean;
  CreatedDt?: string;
  ModifiedDt?: string;
}

/**
 * Staff skill assignment information
 */
export interface BigTimeStaffSkillAssignment {
  StaffSkillSID: number;
  StaffSID: number;
  FName?: string;
  SName?: string;
  FullName?: string;
  SkillSID: number;
  SkillNm?: string;
  SkillDesc?: string;
  IndustrySID?: number;
  IndustryNm?: string;
  SkillCategoryNm?: string;
  SkillTypeSID?: number;
  SkillTypeNm?: string;
  IsExpiring: boolean;
  IsRating: boolean;
  Rating?: number;
  CreatedDt?: string;
  CreatedBy?: string;
  ModifiedDt?: string;
  ModifiedBy?: string;
  StaffSkillCertificationSID?: number;
  FileType?: number;
  IsExpired?: boolean;
  CertificationAssetName?: string;
  CertificationCreatedBy?: string;
  CertificationModifiedBy?: string;
}

/**
 * Staff invite response
 */
export interface BigTimeStaffInviteResponse {
  SuccessfullyInvitedStaffSids: number[];
  FailedInviteStaffErrors?: {
    StaffSids: number[];
    FailureErrorMessages: {
      StaffSid: number;
      ErrorMessage: string;
    }[];
  };
}

/**
 * Staff skill types response
 */
export interface BigTimeStaffSkillTypes {
  [key: string]: string;
}