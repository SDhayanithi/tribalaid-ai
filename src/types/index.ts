export type UserRole =
  | 'applicant'
  | 'scrutiny'
  | 'committee'
  | 'admin'
  | 'fellowship'
  | 'grievance';

export interface AuthUser {
  role: UserRole;
  name: string;
  id: string;
  email?: string;
  designation?: string;
  portalName: string;
}

export interface AuditLogRecord {
  id: string;
  applicationId: string;
  action: string;
  actor: string;
  actorRole: string;
  timestamp: string;
  reason?: string;
  metadata?: Record<string, any>;
}

export type SchemeCode = 'NFST' | 'NOS';

export type ApplicationStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Document Verification'
  | 'Deficiency Raised'
  | 'Resubmitted'
  | 'Scrutiny Verified'
  | 'Eligible for Selection'
  | 'Committee Shortlisted'
  | 'Selected'
  | 'Waitlisted'
  | 'Rejected'
  | 'Disbursement Active';

export type AIRiskLevel = 'Low' | 'Medium' | 'High';

export type DocumentType =
  | 'ST Certificate'
  | 'Academic Marksheet'
  | 'Identity Proof'
  | 'Income Certificate'
  | 'Admission / Research Proposal';

export type DocumentStatus =
  | 'Verified'
  | 'Pending'
  | 'Deficiency'
  | 'Resubmitted'
  | 'Under Scrutiny';

export interface ApplicationDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: DocumentStatus;
  aiConfidence: number; // 0-100
  aiRisk: AIRiskLevel;
  ocrExtracted: {
    [key: string]: string;
  };
  formFieldMatches: {
    field: string;
    formValue: string;
    ocrValue: string;
    isMatch: boolean;
    remark?: string;
  }[];
  deficiencyReason?: string;
  deficiencyRemarks?: string;
  deficiencyRaisedAt?: string;
  deficiencyRaisedBy?: string;
  resubmittedAt?: string;
  resubmissionRemarks?: string;
  verificationAudit?: {
    verifiedBy: string;
    verifiedAt: string;
    remarks: string;
  };
}

export interface Application {
  id: string; // e.g. NFST-2026-00482
  applicantName: string;
  email: string;
  phone: string;
  scheme: SchemeCode;
  schemeName: string;
  category: 'ST';
  tribeName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  state: string;
  district: string;
  annualIncome: number; // in INR
  academicScore: number; // percentage
  degree: string;
  institution: string;
  researchTitle?: string;
  submittedAt: string;
  status: ApplicationStatus;
  aiRisk: AIRiskLevel;
  aiRiskScore: number; // 0-100
  aiRecommendation: 'Recommended' | 'Review Required' | 'High Risk';
  committeeDecision?: 'Selected' | 'Waitlisted' | 'Not Selected' | 'Pending';
  overrideRemarks?: string;
  overrideBy?: string;
  overrideAt?: string;
  rejectionReason?: string;
  slaHoursRemaining: number;
  slaStatus: 'On Track' | 'Approaching SLA' | 'SLA Breached';
  documents: ApplicationDocument[];
  timeline: {
    stage: string;
    date: string;
    status: 'completed' | 'current' | 'upcoming';
    description: string;
    officer?: string;
  }[];
  disbursement?: {
    fellowshipAmountMonthly: number;
    annualContingency: number;
    paymentCycle: 'Monthly DBT' | 'Quarterly DBT';
    nextDisbursementDate: string;
    bankName: string;
    accountMasked: string;
    ifsc: string;
    status: 'Processing' | 'Disbursed' | 'Awaiting Selection';
    transactionId?: string;
  };
}

export interface FellowRecord {
  id: string; // FST-2026-00231
  applicationId: string;
  name: string;
  scheme: SchemeCode;
  institution: string;
  department: string;
  researchArea: string;
  guideName: string;
  startDate: string;
  currentYear: 1 | 2 | 3 | 4 | 5;
  totalYears: number;
  renewalStatus: 'Up to Date' | 'Renewal Due' | 'Under Review' | 'Overdue';
  progressReportStatus: 'Approved' | 'Submitted - Under Review' | 'Pending Submission';
  paymentStatus: 'Active' | 'Hold' | 'Processing DBT';
  monthlyStipend: number;
  contingencyAnnual: number;
  disbursedTotal: number;
  milestones: {
    year: number;
    status: 'Completed' | 'Current' | 'Upcoming';
    progressReportDate?: string;
    reviewerRemarks?: string;
    disbursedAmount: number;
  }[];
  paymentHistory: {
    id: string;
    period: string;
    amount: number;
    disbursementDate: string;
    dbtStatus: 'Credited' | 'Initiated' | 'Scheduled';
    utrNumber: string;
  }[];
}

export interface GrievanceTicket {
  id: string; // GRV-2026-1042
  applicationId?: string;
  applicantName: string;
  applicantEmail?: string;
  scheme: SchemeCode;
  issueCategory: 'Document Verification' | 'Disbursement' | 'Eligibility' | 'Portal Technical' | 'Other';
  subject: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved';
  assignedOfficer: string;
  createdAt: string;
  slaHoursRemaining: number;
  slaStatus: 'On Track' | 'Approaching SLA' | 'SLA Breached';
  attachmentName?: string;
  responses: {
    id: string;
    sender: string;
    senderRole: string;
    timestamp: string;
    message: string;
    isInternal: boolean;
  }[];
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionRemarks?: string;
}

export interface SchemeConfig {
  code: SchemeCode;
  name: string;
  ministry: string;
  description: string;
  annualBudgetCr: number;
  utilizedBudgetCr: number;
  totalSlots: number;
  eligibility: {
    minAcademicScore: number;
    maxAnnualIncome: number;
    ageLimit: number;
    eligibleDegrees: string[];
    allowedCategories: string[];
  };
  requiredDocuments: {
    id: string;
    name: DocumentType;
    required: boolean;
    description: string;
  }[];
  slaHours: {
    scrutiny: number;
    deficiencyResolution: number;
    grievance: number;
  };
  isActive: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'deficiency' | 'deadline' | 'sla' | 'selection' | 'fellowship';
  read: boolean;
  linkTo?: string;
  targetRole?: UserRole;
}

export interface StateAnalytics {
  state: string;
  applications: number;
  verified: number;
  selected: number;
  disbursedCr: number;
  growthYoY: number; // percentage
  topDistricts: string[];
}
