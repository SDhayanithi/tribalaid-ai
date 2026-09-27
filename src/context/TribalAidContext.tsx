import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Application,
  FellowRecord,
  GrievanceTicket,
  SchemeConfig,
  StateAnalytics,
  NotificationItem,
  SchemeCode,
  AuditLogRecord
} from '../types';
import {
  INITIAL_APPLICATIONS,
  INITIAL_FELLOWS,
  INITIAL_GRIEVANCES,
  INITIAL_SCHEMES,
  STATE_ANALYTICS_DATA,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

const INITIAL_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'AUD-001',
    applicationId: 'NFST-2026-00482',
    action: 'Application Submitted',
    actor: 'Arun Kumar',
    actorRole: 'Applicant',
    timestamp: '12 Sep 2026, 10:45 AM',
    reason: 'Initial submission of NFST fellowship application with 5 uploaded documents.'
  },
  {
    id: 'AUD-002',
    applicationId: 'NFST-2026-00482',
    action: 'AI Document Parsing Completed',
    actor: 'MoTA Vision AI Engine v3.4',
    actorRole: 'Automated System',
    timestamp: '12 Sep 2026, 11:02 AM',
    reason: 'OCR entity recognition extracted metadata across ST, Academic, and Income certificates.'
  },
  {
    id: 'AUD-003',
    applicationId: 'NFST-2026-00482',
    action: 'Deficiency Notice Issued',
    actor: 'Dr. V. Radhakrishnan',
    actorRole: 'Scrutiny Officer',
    timestamp: '13 Sep 2026, 03:20 PM',
    reason: 'Income value variance detected: Form indicates ₹1,50,000 while certificate reflects ₹1,80,000. Clarification affidavit requested.'
  }
];

interface TribalAidContextType {
  applications: Application[];
  selectedApplicationId: string;
  setSelectedApplicationId: (id: string) => void;
  activeApplication: Application | undefined;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  resubmitDocument: (appId: string, docId: string, notes: string, newFileName?: string) => void;
  raiseDeficiency: (appId: string, docId: string, reason: string, remarks: string, officerName: string) => void;
  verifyDocument: (appId: string, docId: string, officerName: string, remarks: string) => void;
  approveApplicationByScrutiny: (appId: string, officerName: string, remarks: string) => void;
  rejectApplicationByScrutiny: (appId: string, officerName: string, reason: string) => void;
  sendForManualReview: (appId: string, officerName: string, remarks: string) => void;
  updateCommitteeDecision: (
    appId: string,
    decision: 'Selected' | 'Waitlisted' | 'Not Selected',
    remarks: string,
    reviewerName: string
  ) => void;
  fellows: FellowRecord[];
  updateFellow: (id: string, updates: Partial<FellowRecord>) => void;
  approveProgressReport: (fellowId: string, remarks: string) => void;
  triggerFellowDisbursement: (fellowId: string, amount: number, period: string) => void;
  grievances: GrievanceTicket[];
  createGrievance: (data: {
    applicantName: string;
    applicantEmail?: string;
    applicationId?: string;
    scheme: SchemeCode;
    issueCategory: GrievanceTicket['issueCategory'];
    subject: string;
    description: string;
    attachmentName?: string;
  }) => GrievanceTicket;
  assignGrievanceOfficer: (ticketId: string, officerName: string) => void;
  resolveGrievance: (ticketId: string, officerName: string, resolutionRemarks: string) => void;
  addGrievanceResponse: (ticketId: string, message: string, senderRole: string, isInternal: boolean) => void;
  auditLogs: AuditLogRecord[];
  schemes: SchemeConfig[];
  updateScheme: (code: SchemeCode, updates: Partial<SchemeConfig>) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  stateAnalytics: StateAnalytics[];
  selectedState: string;
  setSelectedState: (state: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TribalAidContext = createContext<TribalAidContextType | undefined>(undefined);

export const TribalAidProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem('tribalaid_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [selectedApplicationId, setSelectedApplicationId] = useState<string>('NFST-2026-00482');

  const [fellows, setFellows] = useState<FellowRecord[]>(() => {
    try {
      const saved = localStorage.getItem('tribalaid_fellows');
      return saved ? JSON.parse(saved) : INITIAL_FELLOWS;
    } catch {
      return INITIAL_FELLOWS;
    }
  });

  const [grievances, setGrievances] = useState<GrievanceTicket[]>(() => {
    try {
      const saved = localStorage.getItem('tribalaid_grievances');
      return saved ? JSON.parse(saved) : INITIAL_GRIEVANCES;
    } catch {
      return INITIAL_GRIEVANCES;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(() => {
    try {
      const saved = localStorage.getItem('tribalaid_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [schemes, setSchemes] = useState<SchemeConfig[]>(() => {
    try {
      const saved = localStorage.getItem('tribalaid_schemes');
      return saved ? JSON.parse(saved) : INITIAL_SCHEMES;
    } catch {
      return INITIAL_SCHEMES;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('tribalaid_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [stateAnalytics] = useState<StateAnalytics[]>(STATE_ANALYTICS_DATA);
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist state in localStorage
  useEffect(() => {
    localStorage.setItem('tribalaid_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('tribalaid_fellows', JSON.stringify(fellows));
  }, [fellows]);

  useEffect(() => {
    localStorage.setItem('tribalaid_grievances', JSON.stringify(grievances));
  }, [grievances]);

  useEffect(() => {
    localStorage.setItem('tribalaid_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('tribalaid_schemes', JSON.stringify(schemes));
  }, [schemes]);

  useEffect(() => {
    localStorage.setItem('tribalaid_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const activeApplication = applications.find((a) => a.id === selectedApplicationId) || applications[0];

  const updateApplication = (id: string, updates: Partial<Application>) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
  };

  const addAuditRecord = (record: Omit<AuditLogRecord, 'id' | 'timestamp'>) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const newRecord: AuditLogRecord = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp,
      ...record
    };
    setAuditLogs((prev) => [newRecord, ...prev]);
  };

  const resubmitDocument = (appId: string, docId: string, notes: string, newFileName?: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const updatedDocs = app.documents.map((doc) => {
          if (doc.id !== docId) return doc;
          return {
            ...doc,
            status: 'Resubmitted' as const,
            fileName: newFileName || doc.fileName,
            uploadedAt: 'Today',
            resubmittedAt: timestamp,
            resubmissionRemarks: notes,
            ocrExtracted: {
              ...doc.ocrExtracted,
              'Annual Family Income': '₹1,50,000 (Endorsed & Rectified)',
              'Affidavit Verified': 'Yes - Stamp Attached'
            },
            formFieldMatches: doc.formFieldMatches.map((m) =>
              m.field === 'Annual Income'
                ? { ...m, isMatch: true, ocrValue: '₹1,50,000', remark: 'Rectified certificate uploaded. Values match application.' }
                : m
            ),
            aiConfidence: 98
          };
        });

        const newTimeline = [
          ...app.timeline,
          {
            stage: 'Document Resubmission',
            date: timestamp,
            status: 'completed' as const,
            description: `Applicant Arun Kumar uploaded rectified document: "${notes}". Forwarded to Scrutiny Officer.`
          }
        ];

        return {
          ...app,
          status: 'Resubmitted',
          documents: updatedDocs,
          timeline: newTimeline
        };
      })
    );

    addAuditRecord({
      applicationId: appId,
      action: 'Document Resubmitted',
      actor: 'Arun Kumar',
      actorRole: 'Applicant',
      reason: notes
    });

    // Notify scrutiny officer
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Document Resubmitted',
        message: `Arun Kumar resubmitted Income Certificate for ${appId}. Ready for verification.`,
        timestamp: 'Just now',
        type: 'deficiency',
        read: false,
        linkTo: `/scrutiny/application/${appId}`,
        targetRole: 'scrutiny'
      },
      ...prev
    ]);
  };

  const raiseDeficiency = (appId: string, docId: string, reason: string, remarks: string, officerName: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const updatedDocs = app.documents.map((doc) => {
          if (doc.id !== docId) return doc;
          return {
            ...doc,
            status: 'Deficiency' as const,
            deficiencyReason: reason,
            deficiencyRemarks: remarks,
            deficiencyRaisedAt: timestamp,
            deficiencyRaisedBy: officerName
          };
        });

        const newTimeline = [
          ...app.timeline,
          {
            stage: 'Deficiency Raised',
            date: timestamp,
            status: 'current' as const,
            description: `Scrutiny Officer ${officerName} raised deficiency: "${reason} - ${remarks}". Action required from applicant.`,
            officer: officerName
          }
        ];

        return {
          ...app,
          status: 'Deficiency Raised',
          documents: updatedDocs,
          timeline: newTimeline
        };
      })
    );

    addAuditRecord({
      applicationId: appId,
      action: 'Deficiency Raised',
      actor: officerName,
      actorRole: 'Scrutiny Officer',
      reason: `${reason}: ${remarks}`
    });

    // Notify applicant
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Action Required: Deficiency Notice',
        message: `Scrutiny Desk flagged an issue on your Income Certificate: ${remarks}`,
        timestamp: 'Just now',
        type: 'deficiency',
        read: false,
        linkTo: '/applicant/documents',
        targetRole: 'applicant'
      },
      ...prev
    ]);
  };

  const verifyDocument = (appId: string, docId: string, officerName: string, remarks: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const updatedDocs = app.documents.map((doc) => {
          if (doc.id !== docId) return doc;
          return {
            ...doc,
            status: 'Verified' as const,
            aiRisk: 'Low' as const,
            aiConfidence: Math.max(doc.aiConfidence, 96),
            verificationAudit: {
              verifiedBy: officerName,
              verifiedAt: timestamp,
              remarks
            }
          };
        });

        return {
          ...app,
          documents: updatedDocs
        };
      })
    );

    addAuditRecord({
      applicationId: appId,
      action: 'Document Verified',
      actor: officerName,
      actorRole: 'Scrutiny Officer',
      reason: remarks
    });
  };

  const approveApplicationByScrutiny = (appId: string, officerName: string, remarks: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const verifiedDocs = app.documents.map((doc) => ({
          ...doc,
          status: 'Verified' as const,
          aiRisk: 'Low' as const
        }));

        const newTimeline = [
          ...app.timeline,
          {
            stage: 'Scrutiny Officer Verified',
            date: timestamp,
            status: 'completed' as const,
            description: `All documents verified and approved by Officer ${officerName}. Forwarded to National Selection Committee.`,
            officer: officerName
          },
          {
            stage: 'Selection Committee Screening',
            date: 'Pending Committee Meeting',
            status: 'current' as const,
            description: 'Enrolled in merit list for final fellowship selection.'
          }
        ];

        return {
          ...app,
          status: 'Scrutiny Verified',
          aiRisk: 'Low',
          documents: verifiedDocs,
          timeline: newTimeline
        };
      })
    );

    addAuditRecord({
      applicationId: appId,
      action: 'Application Approved by Scrutiny',
      actor: officerName,
      actorRole: 'Scrutiny Officer',
      reason: remarks
    });

    // Notify Applicant & Selection Committee
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}-1`,
        title: 'Application Verified',
        message: 'Your scholarship documents have been verified and forwarded to the Selection Committee.',
        timestamp: 'Just now',
        type: 'selection',
        read: false,
        linkTo: '/applicant',
        targetRole: 'applicant'
      },
      {
        id: `NOTIF-${Date.now()}-2`,
        title: 'New Candidate in Merit Pool',
        message: `${appId} (${activeApplication?.applicantName}) has been cleared by scrutiny.`,
        timestamp: 'Just now',
        type: 'selection',
        read: false,
        linkTo: '/selection',
        targetRole: 'committee'
      },
      ...prev
    ]);
  };

  const rejectApplicationByScrutiny = (appId: string, officerName: string, reason: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const newTimeline = [
          ...app.timeline,
          {
            stage: 'Application Rejected',
            date: timestamp,
            status: 'completed' as const,
            description: `Application rejected by Scrutiny Desk. Statutory Reason: "${reason}".`,
            officer: officerName
          }
        ];

        return {
          ...app,
          status: 'Rejected',
          rejectionReason: reason,
          overrideRemarks: reason,
          overrideBy: officerName,
          overrideAt: timestamp,
          timeline: newTimeline
        };
      })
    );

    addAuditRecord({
      applicationId: appId,
      action: 'Application Rejected',
      actor: officerName,
      actorRole: 'Scrutiny Officer',
      reason
    });

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Application Status: Rejected',
        message: `Your application ${appId} was rejected during scrutiny: ${reason}`,
        timestamp: 'Just now',
        type: 'deficiency',
        read: false,
        linkTo: '/applicant',
        targetRole: 'applicant'
      },
      ...prev
    ]);
  };

  const sendForManualReview = (appId: string, officerName: string, remarks: string) => {
    updateApplication(appId, {
      status: 'Under Review',
      aiRisk: 'Medium',
      overrideRemarks: `Field Verification Initiated by ${officerName}: ${remarks}`
    });

    addAuditRecord({
      applicationId: appId,
      action: 'Field Review Dispatched',
      actor: officerName,
      actorRole: 'Scrutiny Officer',
      reason: remarks
    });
  };

  const updateCommitteeDecision = (
    appId: string,
    decision: 'Selected' | 'Waitlisted' | 'Not Selected',
    remarks: string,
    reviewerName: string
  ) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;

        const newTimeline = [
          ...app.timeline,
          {
            stage: `Committee Decision: ${decision}`,
            date: timestamp,
            status: 'completed' as const,
            description: `Selection Committee officially recorded decision: ${decision}. Justification: "${remarks}". Authorized by ${reviewerName}.`,
            officer: reviewerName
          }
        ];

        if (decision === 'Selected') {
          newTimeline.push({
            stage: 'Disbursement Active',
            date: 'Active',
            status: 'current' as const,
            description: 'Enrolled for Direct Benefit Transfer (DBT) monthly fellowship ₹31,000/month.'
          });
        }

        return {
          ...app,
          status: decision === 'Selected' ? 'Selected' : decision === 'Waitlisted' ? 'Waitlisted' : 'Rejected',
          committeeDecision: decision,
          overrideRemarks: remarks,
          overrideBy: reviewerName,
          overrideAt: timestamp,
          timeline: newTimeline,
          disbursement:
            decision === 'Selected'
              ? {
                  fellowshipAmountMonthly: 31000,
                  annualContingency: 20000,
                  paymentCycle: 'Monthly DBT',
                  nextDisbursementDate: '05 October 2026',
                  bankName: 'State Bank of India',
                  accountMasked: '•••• •••• •••• 4910',
                  ifsc: 'SBIN0001842',
                  status: 'Processing',
                  transactionId: 'PFMS2026NFST00482DBT'
                }
              : app.disbursement
        };
      })
    );

    addAuditRecord({
      applicationId: appId,
      action: `Committee Decision: ${decision}`,
      actor: reviewerName,
      actorRole: 'Selection Committee',
      reason: remarks
    });

    // If candidate selected, register into active fellows tracking
    if (decision === 'Selected') {
      const existing = fellows.find((f) => f.applicationId === appId);
      if (!existing) {
        const app = applications.find((a) => a.id === appId);
        if (app) {
          const newFellow: FellowRecord = {
            id: `FST-2026-${appId.split('-')[2] || '00482'}`,
            applicationId: appId,
            name: app.applicantName,
            scheme: app.scheme,
            institution: app.institution,
            department: 'Doctoral Studies Cell',
            researchArea: app.researchTitle || 'Tribal Higher Research Study',
            guideName: 'Prof. Dr. S. Manickam (Supervisor)',
            startDate: '01 Oct 2026',
            currentYear: 1,
            totalYears: 5,
            renewalStatus: 'Up to Date',
            progressReportStatus: 'Approved',
            paymentStatus: 'Active',
            monthlyStipend: 31000,
            contingencyAnnual: 20000,
            disbursedTotal: 31000,
            milestones: [
              { year: 1, status: 'Current', progressReportDate: 'Oct 2027', reviewerRemarks: 'Newly sanctioned fellow.', disbursedAmount: 31000 },
              { year: 2, status: 'Upcoming', disbursedAmount: 0 },
              { year: 3, status: 'Upcoming', disbursedAmount: 0 },
              { year: 4, status: 'Upcoming', disbursedAmount: 0 },
              { year: 5, status: 'Upcoming', disbursedAmount: 0 }
            ],
            paymentHistory: [
              {
                id: `PAY-${Date.now()}`,
                period: 'October 2026',
                amount: 31000,
                disbursementDate: '05 Oct 2026',
                dbtStatus: 'Initiated',
                utrNumber: 'PFMS2026NFST00482DBT'
              }
            ]
          };
          setFellows((prev) => [newFellow, ...prev]);
        }
      }
    }

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: `Fellowship Sanction: ${decision}`,
        message: `Selection Committee officially recorded decision: ${decision}.`,
        timestamp: 'Just now',
        type: 'selection',
        read: false,
        linkTo: '/applicant',
        targetRole: 'applicant'
      },
      ...prev
    ]);
  };

  const updateFellow = (id: string, updates: Partial<FellowRecord>) => {
    setFellows((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const approveProgressReport = (fellowId: string, remarks: string) => {
    setFellows((prev) =>
      prev.map((f) => {
        if (f.id !== fellowId) return f;
        return {
          ...f,
          progressReportStatus: 'Approved',
          renewalStatus: 'Up to Date',
          milestones: f.milestones.map((m) =>
            m.status === 'Current'
              ? {
                  ...m,
                  reviewerRemarks: remarks || 'Progress report verified and approved by Departmental Research Committee.'
                }
              : m
          )
        };
      })
    );
  };

  const triggerFellowDisbursement = (fellowId: string, amount: number, period: string) => {
    setFellows((prev) =>
      prev.map((f) => {
        if (f.id !== fellowId) return f;
        const newPayment = {
          id: `PAY-${Date.now()}`,
          period,
          amount,
          disbursementDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          dbtStatus: 'Credited' as const,
          utrNumber: `DBT${Date.now().toString().slice(-8)}`
        };
        return {
          ...f,
          disbursedTotal: f.disbursedTotal + amount,
          paymentHistory: [newPayment, ...f.paymentHistory]
        };
      })
    );
  };

  const createGrievance = (data: {
    applicantName: string;
    applicantEmail?: string;
    applicationId?: string;
    scheme: SchemeCode;
    issueCategory: GrievanceTicket['issueCategory'];
    subject: string;
    description: string;
    attachmentName?: string;
  }): GrievanceTicket => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newTicket: GrievanceTicket = {
      id: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      applicationId: data.applicationId || 'NFST-2026-00482',
      applicantName: data.applicantName,
      applicantEmail: data.applicantEmail,
      scheme: data.scheme,
      issueCategory: data.issueCategory,
      subject: data.subject,
      description: data.description,
      attachmentName: data.attachmentName,
      priority: 'High',
      status: 'Open',
      assignedOfficer: 'S. Ramanathan (Senior Grievance Officer, MoTA)',
      createdAt: timestamp,
      slaHoursRemaining: 48,
      slaStatus: 'On Track',
      responses: [
        {
          id: `RSP-${Date.now()}`,
          sender: data.applicantName,
          senderRole: 'Applicant',
          timestamp,
          message: data.description,
          isInternal: false
        }
      ]
    };

    setGrievances((prev) => [newTicket, ...prev]);

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'New Citizen Grievance Filed',
        message: `${data.applicantName} filed ticket ${newTicket.id}: ${data.subject}`,
        timestamp: 'Just now',
        type: 'deficiency',
        read: false,
        linkTo: '/grievances',
        targetRole: 'grievance'
      },
      ...prev
    ]);

    return newTicket;
  };

  const assignGrievanceOfficer = (ticketId: string, officerName: string) => {
    setGrievances((prev) =>
      prev.map((g) => (g.id === ticketId ? { ...g, assignedOfficer: officerName, status: 'In Progress' } : g))
    );
  };

  const resolveGrievance = (ticketId: string, officerName: string, resolutionRemarks: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let applicantName = '';
    setGrievances((prev) =>
      prev.map((g) => {
        if (g.id !== ticketId) return g;
        applicantName = g.applicantName;
        return {
          ...g,
          status: 'Resolved',
          resolvedAt: timestamp,
          resolvedBy: officerName,
          resolutionRemarks,
          responses: [
            ...g.responses,
            {
              id: `RSP-${Date.now()}`,
              sender: officerName,
              senderRole: 'Grievance Officer',
              timestamp,
              message: `Official Resolution: ${resolutionRemarks}`,
              isInternal: false
            }
          ]
        };
      })
    );

    // Notify applicant
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: `Grievance ${ticketId} Resolved`,
        message: `Your grievance ticket has been resolved: "${resolutionRemarks}"`,
        timestamp: 'Just now',
        type: 'sla',
        read: false,
        linkTo: '/applicant/grievances',
        targetRole: 'applicant'
      },
      ...prev
    ]);
  };

  const addGrievanceResponse = (ticketId: string, message: string, senderRole: string, isInternal: boolean) => {
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setGrievances((prev) =>
      prev.map((g) => {
        if (g.id !== ticketId) return g;
        return {
          ...g,
          responses: [
            ...g.responses,
            {
              id: `RSP-${Date.now()}`,
              sender: senderRole === 'Applicant' ? g.applicantName : g.assignedOfficer || 'Officer Desk',
              senderRole,
              timestamp,
              message,
              isInternal
            }
          ]
        };
      })
    );

    if (senderRole !== 'Applicant') {
      setNotifications((prev) => [
        {
          id: `NOTIF-${Date.now()}`,
          title: `Officer Response on Grievance ${ticketId}`,
          message: message,
          timestamp: 'Just now',
          type: 'sla',
          read: false,
          linkTo: '/applicant/grievances',
          targetRole: 'applicant'
        },
        ...prev
      ]);
    }
  };

  const updateScheme = (code: SchemeCode, updates: Partial<SchemeConfig>) => {
    setSchemes((prev) => prev.map((s) => (s.code === code ? { ...s, ...updates } : s)));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <TribalAidContext.Provider
      value={{
        applications,
        selectedApplicationId,
        setSelectedApplicationId,
        activeApplication,
        updateApplication,
        resubmitDocument,
        raiseDeficiency,
        verifyDocument,
        approveApplicationByScrutiny,
        rejectApplicationByScrutiny,
        sendForManualReview,
        updateCommitteeDecision,
        fellows,
        updateFellow,
        approveProgressReport,
        triggerFellowDisbursement,
        grievances,
        createGrievance,
        assignGrievanceOfficer,
        resolveGrievance,
        addGrievanceResponse,
        auditLogs,
        schemes,
        updateScheme,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        stateAnalytics,
        selectedState,
        setSelectedState,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </TribalAidContext.Provider>
  );
};

export const useTribalAid = () => {
  const context = useContext(TribalAidContext);
  if (!context) {
    throw new Error('useTribalAid must be used within a TribalAidProvider');
  }
  return context;
};
