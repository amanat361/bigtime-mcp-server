/**
 * Type definitions for BigTime Time API
 */

/**
 * Basic time entry information from the /time endpoints
 */
export interface BigTimeTimeEntry {
  SID: number;
  IsNew?: boolean;
  Dt: string;
  ProjectSID: number;
  ProjectNm?: string;
  ClientID?: number;
  ClientNm?: string;
  StaffSID: number;
  FName?: string;
  SName?: string;
  SourceNm?: string;
  BudgCatID?: number;
  BudgCatNm?: string;
  TaskSID?: number;
  TaskNm?: string;
  QBClass?: number;
  QBClassNm?: string;
  PayrollItem?: number;
  PayrollItemNm?: string;
  Hours_IN: number;
  Notes?: string;
  RevisionNotes?: string;
  AuditLogNote?: string;
  NoCharge?: boolean;
  IsApproved?: boolean;
  CanApproved?: boolean;
  ApprovalStatus?: number;
  ApprovalStatusNm?: string;
  ApprovalInfo?: any;
  InvoiceSID?: number;
  IsInvoiced?: boolean;
  HoursBillable?: number;
  BillRate?: number;
  ChargeBillable?: number;
  BillingRateLocked?: boolean;
  CostRate?: number;
  DtCreated?: number;
  DtModified?: number;
}

/**
 * Time entry creation/update parameters
 */
export interface BigTimeTimeEntryCreate {
  SID?: number; // 0 for new entries
  Dt: string;
  ProjectSID: number;
  ProjectLinkValue?: string;
  ProjectLinkType?: number;
  StaffSID: number;
  StaffLinkValue?: string;
  StaffLinkType?: number;
  BudgCatID?: number;
  BudgCatLinkValue?: string;
  BudgCatLinkType?: number;
  TaskSID?: number;
  TaskNm?: string;
  QBClass?: number;
  PayrollItem?: number;
  Hours_IN: number;
  Notes?: string;
  RevisionNotes?: string;
  AuditLogNote?: string;
  NoCharge?: boolean;
  HoursBillable?: number;
  BillRate?: number;
  ChargeBillable?: number;
  BillingRateLocked?: boolean;
  CostRate?: number;
}

/**
 * Daily total for time entries
 */
export interface BigTimeDailyTotal {
  staffSid: number;
  dt: string;
  totalHours: number;
  timerCount: number;
  billableHours: number;
  nonBillableHours: number;
  totalUnsubmittedTime: number;
}