
// MDS 3.0 Validation Engine - Comprehensive field-level validation

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'error' | 'warning';
}

export interface ValidationWarning {
  field: string;
  message: string;
  code: string;
}

export interface SkipPattern {
  field: string;
  condition: (data: any) => boolean;
  skipTo?: string;
}

export class MdsValidationEngine {
  // Core validation rules for each section
  private static sectionAValidation = {
    a0100: {
      required: true,
      pattern: /^\d{6}$/,
      message: 'Provider number must be 6 digits'
    },
    a0310: {
      required: true,
      values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '99'],
      message: 'Invalid assessment type'
    },
    a1010: {
      required: true,
      type: 'date',
      message: 'Valid admission date required'
    }
  };

  private static sectionBValidation = {
    b0100: {
      required: true,
      values: ['0', '1', '2', '3'],
      message: 'Invalid comatose status'
    },
    b0200: {
      required: true,
      values: ['0', '1', '2', '3'],
      skipPatterns: [
        {
          condition: (data: any) => data.b0100 === '1',
          skipTo: 'b1000'
        }
      ]
    }
  };

  // Skip pattern definitions
  private static skipPatterns: SkipPattern[] = [
    {
      field: 'b0200',
      condition: (data) => data.section_b?.b0100 === '1',
      skipTo: 'b1000'
    },
    {
      field: 'c0200',
      condition: (data) => data.section_c?.c0100 !== '0',
      skipTo: 'c0600'
    },
    {
      field: 'd0200',
      condition: (data) => data.section_d?.d0100 !== '0',
      skipTo: 'd0350'
    }
  ];

  static validateSection(sectionId: string, sectionData: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    switch (sectionId) {
      case 'section_a':
        return this.validateSectionA(sectionData);
      case 'section_b':
        return this.validateSectionB(sectionData);
      case 'section_c':
        return this.validateSectionC(sectionData);
      case 'section_d':
        return this.validateSectionD(sectionData);
      case 'section_g':
        return this.validateSectionG(sectionData);
      default:
        return { isValid: true, errors: [], warnings: [] };
    }
  }

  private static validateSectionA(data: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // A0100 - Provider Number validation
    if (!data.a0100) {
      errors.push({
        field: 'a0100',
        message: 'Provider number is required',
        code: 'A0100_REQUIRED',
        severity: 'error'
      });
    } else if (!/^\d{6}$/.test(data.a0100)) {
      errors.push({
        field: 'a0100',
        message: 'Provider number must be exactly 6 digits',
        code: 'A0100_FORMAT',
        severity: 'error'
      });
    }

    // A0310 - Assessment Type validation
    if (!data.a0310) {
      errors.push({
        field: 'a0310',
        message: 'Assessment type is required',
        code: 'A0310_REQUIRED',
        severity: 'error'
      });
    }

    // A1010 - Admission Date validation
    if (!data.a1010) {
      errors.push({
        field: 'a1010',
        message: 'Admission date is required',
        code: 'A1010_REQUIRED',
        severity: 'error'
      });
    } else {
      const admissionDate = new Date(data.a1010);
      const today = new Date();
      
      if (admissionDate > today) {
        errors.push({
          field: 'a1010',
          message: 'Admission date cannot be in the future',
          code: 'A1010_FUTURE',
          severity: 'error'
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static validateSectionB(data: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Skip pattern: If resident is comatose (B0100 = 1), skip to vision section
    if (data.b0100 === '1') {
      // Clear hearing-related fields that should be skipped
      const skipFields = ['b0200', 'b0300', 'b0600', 'b0700', 'b0800'];
      skipFields.forEach(field => {
        if (data[field] && data[field] !== '-') {
          warnings.push({
            field,
            message: 'This field should be dashed when resident is comatose',
            code: `${field.toUpperCase()}_SKIP_PATTERN`
          });
        }
      });
    }

    // B0200 - Hearing validation
    if (!['0', '1', '2', '3', '-'].includes(data.b0200)) {
      errors.push({
        field: 'b0200',
        message: 'Invalid hearing assessment value',
        code: 'B0200_INVALID',
        severity: 'error'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static validateSectionC(data: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // C0100 - Interview attempted validation
    if (!['0', '1'].includes(data.c0100)) {
      errors.push({
        field: 'c0100',
        message: 'Must indicate if interview was attempted',
        code: 'C0100_REQUIRED',
        severity: 'error'
      });
    }

    // If interview completed (C0100 = 0), validate BIMS items
    if (data.c0100 === '0') {
      const bimsFields = ['c0200', 'c0300', 'c0400'];
      bimsFields.forEach(field => {
        if (!['0', '1', '2', '3', '4'].includes(data[field])) {
          errors.push({
            field,
            message: 'BIMS item must have valid score when interview completed',
            code: `${field.toUpperCase()}_REQUIRED`,
            severity: 'error'
          });
        }
      });

      // C0500 - BIMS Summary Score calculation
      if (data.c0200 && data.c0300 && data.c0400) {
        const expectedTotal = parseInt(data.c0200) + parseInt(data.c0300) + parseInt(data.c0400);
        if (data.c0500 && parseInt(data.c0500) !== expectedTotal) {
          errors.push({
            field: 'c0500',
            message: 'BIMS total score does not match sum of items',
            code: 'C0500_CALCULATION',
            severity: 'error'
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static validateSectionD(data: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // D0100 - Interview attempted validation
    if (!['0', '1', '2', '3'].includes(data.d0100)) {
      errors.push({
        field: 'd0100',
        message: 'Must indicate interview status',
        code: 'D0100_REQUIRED',
        severity: 'error'
      });
    }

    // If interview completed, validate PHQ-9 items
    if (data.d0100 === '0') {
      // Should have PHQ-9 data
      if (!data.d0300) {
        warnings.push({
          field: 'd0300',
          message: 'PHQ-9 total should be calculated when interview completed',
          code: 'D0300_EXPECTED'
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static validateSectionG(data: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    const adlFields = ['g0110', 'g0120', 'g0130', 'g0140', 'g0150', 'g0160', 'g0170', 'g0180', 'g0190', 'g0200'];
    
    adlFields.forEach(field => {
      if (!['0', '1', '2', '3', '4', '7', '8'].includes(data[field])) {
        errors.push({
          field,
          message: 'Invalid ADL assistance level',
          code: `${field.toUpperCase()}_INVALID`,
          severity: 'error'
        });
      }
    });

    // Check for logical inconsistencies
    if (data.g0130 && data.g0140) {
      const walkRoom = parseInt(data.g0130);
      const walkCorridor = parseInt(data.g0140);
      
      if (walkRoom < walkCorridor && walkRoom !== 8 && walkCorridor !== 8) {
        warnings.push({
          field: 'g0140',
          message: 'Walking in corridor typically requires same or more assistance than walking in room',
          code: 'G0140_LOGIC_CHECK'
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Utility methods
  static getSkipPatterns(sectionId: string): SkipPattern[] {
    return this.skipPatterns.filter(pattern => pattern.field.startsWith(sectionId.replace('section_', '')));
  }

  static shouldSkipField(field: string, allData: any): boolean {
    const pattern = this.skipPatterns.find(p => p.field === field);
    return pattern ? pattern.condition(allData) : false;
  }

  static getFieldHelp(field: string): string {
    const helpText: { [key: string]: string } = {
      'a0100': 'Enter the 6-digit CMS Certification Number (CCN) assigned to this facility.',
      'a0310': 'Select the type of assessment being completed. Refer to RAI manual Chapter 2.',
      'a1010': 'Enter the date the resident was admitted to this facility (MMDDYYYY).',
      'b0100': 'Code 1 if resident is comatose. If coded 1, skip hearing items B0200-B0800.',
      'b0200': 'Assess resident\'s hearing ability with hearing aid if used.',
      'c0100': 'Attempt interview if resident appears capable. Code 1 only if interview cannot be attempted.',
      'c0500': 'Sum of C0200, C0300, and C0400. Range 0-15.',
      'd0100': 'Attempt interview unless resident has severe cognitive impairment.',
      'g0110': 'Code for how resident moves to and from lying position, turns side to side, and positions body while in bed.'
    };
    
    return helpText[field] || 'Refer to RAI Manual for detailed coding instructions.';
  }
}
