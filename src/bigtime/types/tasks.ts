/**
 * Type definitions for BigTime Task API
 */

/**
 * Basic task information from the /task endpoints
 */
export interface BigTimeTask {
  TaskSid: number;
  ProjectSid: number;
  TaskNm: string;
  TaskGroup?: string;
  FullName?: string;
  TaskType?: number;
  TaskType_nm?: string;
  CurrentStatus?: number;
  CurrentStatus_nm?: string;
  TaskId?: string;
  Priority?: string;
  Notes?: string;
  AssignCount?: number;
  AssignmentList?: { Sid: number; Nm: string }[];
  AssignmentNames?: string;
  DueDt?: string;
  StartDt?: string;
  FeeOrExpense?: number;
  BudgetHours?: number;
  BudgetFees?: number;
  BudgetExps?: number;
  BudgetTotal?: number;
  PerComp?: number;
  IsArchived?: boolean;
  DefaultQBClass?: number;
  IsSeriesMaster?: boolean;
  MasterTaskSid?: number;
  ParentSid?: number;
  NoCharge?: boolean;
}

/**
 * Detailed task information from the /task/detail endpoint
 */
export type BigTimeTaskDetail = BigTimeTask;

/**
 * Task budget status information from the /task/BudgetStatusByProject endpoint
 */
export interface BigTimeTaskBudgetStatus {
  TaskSid: number;
  HoursInput?: number;
  HoursBill?: number;
  FeesInput?: number;
  FeesCost?: number;
  ExpensesInput?: number;
  ExpensesBillable?: number;
  TotalWip?: number;
}

/**
 * Task creation parameters for the /task/detail endpoint
 */
export interface BigTimeTaskCreate {
  TaskSid: number; // 0 for new tasks
  ProjectSid: number;
  TaskNm: string;
  // Optional fields below
  ProjectLinkValue?: string;
  ProjectLinkType?: number;
  TaskGroup?: string;
  TaskType?: number;
  TaskTypeName?: string;
  CurrentStatus?: number;
  CurrentStatusName?: string;
  TaskId?: string;
  Priority?: string;
  Notes?: string;
  AssignmentList?: number[];
  AssignLinkListValue?: string;
  AssignLinkListType?: number;
  DueDt?: string;
  StartDt?: string;
  FeeOrExpense?: number;
  BudgetHours?: number;
  BudgetFees?: number;
  BudgetExps?: number;
  PerComp?: number;
  DefaultQBClass?: number;
  ParentSid?: number;
  NoCharge?: boolean;
}