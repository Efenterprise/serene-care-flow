
-- Create grievances table
CREATE TABLE public.grievances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grievance_number TEXT NOT NULL UNIQUE DEFAULT CONCAT('GRV-', EXTRACT(YEAR FROM NOW()), '-', LPAD(EXTRACT(DOY FROM NOW())::TEXT, 3, '0'), '-', LPAD(EXTRACT(HOUR FROM NOW())::TEXT, 2, '0'), LPAD(EXTRACT(MINUTE FROM NOW())::TEXT, 2, '0')),
  resident_id UUID REFERENCES public.residents(id),
  complainant_name TEXT NOT NULL,
  complainant_relationship TEXT,
  complainant_contact_info JSONB,
  is_anonymous BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  subcategory TEXT,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'received',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date_occurred DATE,
  location TEXT,
  witnesses JSONB,
  evidence_collected JSONB,
  assigned_to UUID REFERENCES auth.users(id),
  department TEXT,
  investigation_notes TEXT,
  resolution_description TEXT,
  corrective_actions JSONB,
  complainant_satisfied BOOLEAN,
  appeal_requested BOOLEAN DEFAULT false,
  appeal_notes TEXT,
  regulatory_reportable BOOLEAN DEFAULT false,
  reported_to_authorities BOOLEAN DEFAULT false,
  authority_notification_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  investigation_started_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,
  due_date TIMESTAMP WITH TIME ZONE
);

-- Create grievance comments/communications table
CREATE TABLE public.grievance_communications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grievance_id UUID NOT NULL REFERENCES public.grievances(id) ON DELETE CASCADE,
  communication_type TEXT NOT NULL, -- 'internal_note', 'complainant_update', 'investigation_note'
  sender_id UUID REFERENCES auth.users(id),
  sender_name TEXT,
  recipient_info JSONB,
  subject TEXT,
  message TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT true,
  communication_method TEXT, -- 'email', 'phone', 'in_person', 'mail'
  attachments JSONB,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grievance documents table
CREATE TABLE public.grievance_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grievance_id UUID NOT NULL REFERENCES public.grievances(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  original_file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  document_type TEXT, -- 'evidence', 'response', 'investigation', 'resolution'
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  description TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grievance status history table for audit trail
CREATE TABLE public.grievance_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grievance_id UUID NOT NULL REFERENCES public.grievances(id) ON DELETE CASCADE,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  previous_assigned_to UUID REFERENCES auth.users(id),
  new_assigned_to UUID REFERENCES auth.users(id),
  change_reason TEXT,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.grievances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grievance_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grievance_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grievance_status_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allowing authenticated users to access all grievances for now)
CREATE POLICY "Allow all operations for authenticated users" ON public.grievances
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON public.grievance_communications
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON public.grievance_documents
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON public.grievance_status_history
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_grievances_status ON public.grievances(status);
CREATE INDEX idx_grievances_category ON public.grievances(category);
CREATE INDEX idx_grievances_assigned_to ON public.grievances(assigned_to);
CREATE INDEX idx_grievances_created_at ON public.grievances(created_at);
CREATE INDEX idx_grievances_resident_id ON public.grievances(resident_id);
CREATE INDEX idx_grievance_communications_grievance_id ON public.grievance_communications(grievance_id);
CREATE INDEX idx_grievance_documents_grievance_id ON public.grievance_documents(grievance_id);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_grievances_updated_at
  BEFORE UPDATE ON public.grievances
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to log status changes
CREATE OR REPLACE FUNCTION public.log_grievance_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status OR OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
    INSERT INTO public.grievance_status_history (
      grievance_id,
      previous_status,
      new_status,
      previous_assigned_to,
      new_assigned_to,
      changed_by
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      OLD.assigned_to,
      NEW.assigned_to,
      NEW.updated_by
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER grievance_status_change_trigger
  AFTER UPDATE ON public.grievances
  FOR EACH ROW
  EXECUTE FUNCTION public.log_grievance_status_change();
