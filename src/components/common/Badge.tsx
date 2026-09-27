import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'saffron';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const variantStyles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/80',
    error: 'bg-rose-50 text-rose-700 border-rose-200/80',
    info: 'bg-blue-50 text-blue-700 border-blue-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    saffron: 'bg-orange-50 text-orange-800 border-orange-200'
  };

  const dotColors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-blue-500',
    neutral: 'bg-slate-400',
    saffron: 'bg-orange-500'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'Verified':
    case 'Scrutiny Verified':
    case 'Eligible for Selection':
    case 'Selected':
    case 'Approved':
    case 'Up to Date':
    case 'Resolved':
    case 'Credited':
      return (
        <Badge variant="success" dot>
          {status}
        </Badge>
      );
    case 'Deficiency':
    case 'Deficiency Raised':
    case 'Renewal Due':
    case 'Approaching SLA':
    case 'High Risk':
    case 'Review Required':
      return (
        <Badge variant="warning" dot>
          {status}
        </Badge>
      );
    case 'SLA Breached':
    case 'Rejected':
    case 'Not Selected':
    case 'Hold':
    case 'Overdue':
      return (
        <Badge variant="error" dot>
          {status}
        </Badge>
      );
    case 'Under Review':
    case 'Document Verification':
    case 'Resubmitted':
    case 'Under Scrutiny':
    case 'In Progress':
    case 'Submitted - Under Review':
    case 'Processing DBT':
    case 'Committee Shortlisted':
      return (
        <Badge variant="info" dot>
          {status}
        </Badge>
      );
    default:
      return (
        <Badge variant="neutral" dot>
          {status}
        </Badge>
      );
  }
};
