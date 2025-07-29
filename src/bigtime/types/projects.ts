/**
 * Type definitions for BigTime Project API
 */

/**
 * Basic project information from the picklist/projects endpoint
 */
export interface BigTimeProjectPicklist {
  Id: string;
  Name: string;
  Group?: string;
  IsInactive: boolean;
}

/**
 * Project information returned from the /project endpoint
 */
export interface BigTimeProject {
  SystemId: number;
  Nm: string;
  DisplayName?: string;
  ProjectCode: string;
  TypeId?: number;
  StartDt?: string;
  EndDt?: string;
  IsInactive: boolean;
  StatusProd?: number;
  Notes?: string;
  ClientId?: number;
  PrimaryContactId?: number;
  BillingContactId?: number;
  DtCreated?: string;
  DtModified?: string;
  BudgetHrs?: number;
  EstimatedHours?: number;
  TotalBudget?: number;
}

/**
 * Detailed project information from the /project/detail endpoint
 */
export interface BigTimeProjectDetail extends BigTimeProject {
  StatusProd_nt?: string;
  StatusBill?: number;
  IsAllStaff?: boolean;
  IsNoCharge?: boolean;
  InvoiceType?: number;
  InvoiceTotals?: number;
  ContractNotes?: string;
  InvoiceNotes?: string;
  BillingRateBaseRateStyle?: string;
  BasicRate?: number;
  QBClassDefault?: number;
  QBCustomerId?: string;
  QBCustomerId_nm?: string;
  ContactList?: BigTimeProjectContact[];
  AddressList?: BigTimeProjectAddress[];
  Client?: BigTimeProjectClient;
  CostCenterA?: number;
  CostCenterB?: number;
  CostCenterC?: number;
  UdfList?: any[]; // Custom fields
}

/**
 * Contact information for a project
 */
export interface BigTimeProjectContact {
  Id: number;
  FullNm?: string;
  Tag?: 'PRIMARY' | 'BILLING' | 'OTHER';
  ProjectSid: number;
  ClientSid?: number;
  FName?: string;
  SName?: string;
  MName?: string;
  Prefix?: string;
  Title?: string;
  CompanyNm?: string;
  EMail?: string;
  Phone?: string;
  Phone_2?: string;
  Phone_3?: string;
  Fax?: string;
  Notes?: string;
  ContactType?: number;
  Address?: BigTimeProjectAddress;
  LinkedProjects?: BigTimeLinkedProject[];
}

/**
 * Address information
 */
export interface BigTimeProjectAddress {
  Id: number;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Country?: string;
  FullAddress?: string;
}

/**
 * Linked project information (for contacts)
 */
export interface BigTimeLinkedProject {
  SystemId: number;
  Nm: string;
  DisplayName?: string;
  ProjectCode: string;
  IsInactive: boolean;
  PrimaryContactId?: number;
  BillingContactId?: number;
}

/**
 * Client information for a project
 */
export interface BigTimeProjectClient {
  SystemId: number;
  Nm: string;
  ClientCode?: string;
  IsInactive?: boolean;
}