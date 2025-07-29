/**
 * Type definitions for BigTime Client API
 */

/**
 * Basic client information from the /client endpoint
 */
export interface BigTimeClient {
  SystemId: number;
  Nm: string;
  DisplayName?: string;
  LegalNm?: string;
  ClientId?: string;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
  Country?: string;
  FullAddress?: string;
  MainPH?: string;
  MainFX?: string;
  Notes?: string;
  IsInactive?: boolean;
  DtCreated?: string;
  DtModified?: string;
}

/**
 * Detailed client information from the /client/detail endpoint
 */
export interface BigTimeClientDetail extends BigTimeClient {
  BillNm?: string;
  BillAddress?: string;
  BillCity?: string;
  BillState?: string;
  BillZip?: string;
  BillCountry?: string;
  QBCustomerId?: string;
  QBClassId?: string;
  QBPOSentBy?: string;
  Status?: number;
  LeadSourceId?: number;
  CostCenterA?: number;
  CostCenterB?: number;
  CostCenterC?: number;
  BillingContactId?: number;
  PrimaryContactId?: number;
  IndustryId?: number;
  ContactList?: BigTimeClientContact[];
}

/**
 * Client contact information
 */
export interface BigTimeClientContact {
  Id: number;
  FullNm?: string;
  Tag?: 'PRIMARY' | 'BILLING' | 'OTHER';
  ClientSid: number;
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
  Address?: {
    Id: number;
    Address?: string;
    City?: string;
    State?: string;
    Zip?: string;
    Country?: string;
    FullAddress?: string;
  };
}

/**
 * Basic client information from the picklist/clients endpoint
 */
export interface BigTimeClientPicklist {
  Id: string;
  Name: string;
  Group?: string;
  IsInactive: boolean;
}