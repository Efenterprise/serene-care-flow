
export interface AdmissionsAgreement {
  id: string;
  resident_id: string;
  agreement_type: string;
  template_version: string;
  agreement_content: any;
  status: 'draft' | 'pending_signatures' | 'partially_signed' | 'fully_signed' | 'expired';
  created_by?: string;
  created_at: string;
  updated_at: string;
  expires_at?: string;
  notes?: string;
  // PandaDoc integration fields
  pandadoc_document_id?: string;
  pandadoc_template_id?: string;
  pandadoc_status?: string;
  pandadoc_download_url?: string;
  pandadoc_view_url?: string;
  pandadoc_created_at?: string;
  pandadoc_completed_at?: string;
}

export interface AgreementSignature {
  id: string;
  agreement_id: string;
  signer_type: 'resident' | 'responsible_party' | 'witness' | 'facility_representative';
  signer_name: string;
  signer_contact_id?: string;
  signature_data: string;
  ip_address?: string;
  user_agent?: string;
  signed_at: string;
  signature_method: 'electronic' | 'wet_signature' | 'verbal_consent';
}

export interface AgreementTemplate {
  id: string;
  template_name: string;
  template_type: string;
  version: string;
  content: any;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
