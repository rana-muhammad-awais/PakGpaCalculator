export const institutions = [
  { id: 'uni_comsats', name: 'COMSATS University', sector: 'Public' },
  { id: 'uni_air', name: 'Air University', sector: 'Public' },
  { id: 'uni_nust', name: 'National University of Sciences and Technology (NUST)', sector: 'Public' },
  { id: 'uni_gcu', name: 'Government College University (GCU) Lahore', sector: 'Public' },
  { id: 'uni_uol', name: 'University of Lahore (UOL)', sector: 'Private' },
  { id: 'uni_sindh', name: 'University of Sindh', sector: 'Public' },
  { id: 'uni_iba', name: 'Institute of Business Administration (IBA) Karachi', sector: 'Public' },
  { id: 'uni_fast', name: 'FAST-NUCES', sector: 'Private' },
  { id: 'uni_ucp', name: 'University of Central Punjab (UCP)', sector: 'Private' },
  { id: 'uni_fuuast', name: 'Federal Urdu University (FUUAST)', sector: 'Public' },
  { id: 'uni_ajku', name: 'University of Azad Jammu & Kashmir (AJKU)', sector: 'Public' },
  { id: 'uni_qau', name: 'Quaid-i-Azam University (QAU)', sector: 'Public' },
  { id: 'uni_vu', name: 'Virtual University (VU) of Pakistan', sector: 'Public' },
  { id: 'uni_peshawar', name: 'University of Peshawar', sector: 'Public' },
  { id: 'uni_uaf', name: 'University of Agriculture Faisalabad (UAF)', sector: 'Public' },
];

export const schemas = [
  // COMSATS
  { id: 'schema_comsats_new', uni_id: 'uni_comsats', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  { id: 'schema_comsats_old', uni_id: 'uni_comsats', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // Air
  { id: 'schema_air', uni_id: 'uni_air', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // NUST (Relative default, can be absolute)
  { id: 'schema_nust_rel', uni_id: 'uni_nust', program: 'Engineering/CS', is_absolute: 0, is_relative: 1, is_continuous: 0 },
  { id: 'schema_nust_abs', uni_id: 'uni_nust', program: 'Absolute Mode', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // GCU
  { id: 'schema_gcu', uni_id: 'uni_gcu', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // UOL
  { id: 'schema_uol', uni_id: 'uni_uol', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // Sindh
  { id: 'schema_sindh_new', uni_id: 'uni_sindh', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // IBA
  { id: 'schema_iba', uni_id: 'uni_iba', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // FAST
  { id: 'schema_fast', uni_id: 'uni_fast', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // UCP
  { id: 'schema_ucp', uni_id: 'uni_ucp', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // FUUAST
  { id: 'schema_fuuast_bs', uni_id: 'uni_fuuast', program: 'BS', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  { id: 'schema_fuuast_ms', uni_id: 'uni_fuuast', program: 'MS/MPhil', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // AJKU
  { id: 'schema_ajku', uni_id: 'uni_ajku', program: 'All', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // QAU
  { id: 'schema_qau_bs', uni_id: 'uni_qau', program: 'BS', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  { id: 'schema_qau_llb', uni_id: 'uni_qau', program: 'LLB', is_absolute: 1, is_relative: 0, is_continuous: 0 },
  // VU
  { id: 'schema_vu', uni_id: 'uni_vu', program: 'All', is_absolute: 0, is_relative: 0, is_continuous: 1 },
  // Peshawar
  { id: 'schema_peshawar', uni_id: 'uni_peshawar', program: 'All', is_absolute: 0, is_relative: 0, is_continuous: 1 },
];

export const temporal_rules = [
  { schema_id: 'schema_comsats_old', batch_start: 2000, batch_end: 2020 },
  { schema_id: 'schema_comsats_new', batch_start: 2021, batch_end: 2099 },
  { schema_id: 'schema_sindh_new', batch_start: 2021, batch_end: 2099 },
];

export const conversions = [
  // formula: percentage = (cgpa * m) + c
  { uni_id: 'uni_ucp', m: 24, c: 10 },
  { uni_id: 'uni_gcu', m: 20, c: 20 },
  { uni_id: 'uni_comsats', m: 25, c: 0 },
  { uni_id: 'uni_nust', m: 25, c: 0 },
  // default HEC is m: 25, c: 0
];

export const absolute_brackets = [
  // COMSATS NEW (HEC Standard)
  { schema_id: 'schema_comsats_new', grade: 'A', min: 85, max: 100, gpa: 4.0 },
  { schema_id: 'schema_comsats_new', grade: 'A-', min: 80, max: 84, gpa: 3.7 },
  { schema_id: 'schema_comsats_new', grade: 'B+', min: 75, max: 79, gpa: 3.3 },
  { schema_id: 'schema_comsats_new', grade: 'B', min: 71, max: 74, gpa: 3.0 },
  { schema_id: 'schema_comsats_new', grade: 'B-', min: 68, max: 70, gpa: 2.7 },
  { schema_id: 'schema_comsats_new', grade: 'C+', min: 64, max: 67, gpa: 2.3 },
  { schema_id: 'schema_comsats_new', grade: 'C', min: 61, max: 63, gpa: 2.0 },
  { schema_id: 'schema_comsats_new', grade: 'C-', min: 58, max: 60, gpa: 1.7 },
  { schema_id: 'schema_comsats_new', grade: 'D+', min: 54, max: 57, gpa: 1.3 },
  { schema_id: 'schema_comsats_new', grade: 'D', min: 50, max: 53, gpa: 1.0 },
  { schema_id: 'schema_comsats_new', grade: 'F', min: 0, max: 49, gpa: 0.0 },

  // IBA KARACHI (Deflated)
  { schema_id: 'schema_iba', grade: 'A', min: 93, max: 100, gpa: 4.0 },
  { schema_id: 'schema_iba', grade: 'A-', min: 87, max: 92, gpa: 3.67 },
  { schema_id: 'schema_iba', grade: 'B+', min: 82, max: 86, gpa: 3.33 },
  { schema_id: 'schema_iba', grade: 'B', min: 77, max: 81, gpa: 3.0 },
  { schema_id: 'schema_iba', grade: 'B-', min: 72, max: 76, gpa: 2.67 },
  { schema_id: 'schema_iba', grade: 'C+', min: 68, max: 71, gpa: 2.33 },
  { schema_id: 'schema_iba', grade: 'C', min: 64, max: 67, gpa: 2.0 },
  { schema_id: 'schema_iba', grade: 'C-', min: 60, max: 63, gpa: 1.67 },
  { schema_id: 'schema_iba', grade: 'F', min: 0, max: 59, gpa: 0.0 },

  // FAST-NUCES (Deflated)
  { schema_id: 'schema_fast', grade: 'A', min: 86, max: 100, gpa: 4.0 },
  { schema_id: 'schema_fast', grade: 'A-', min: 82, max: 85, gpa: 3.67 },
  { schema_id: 'schema_fast', grade: 'B+', min: 78, max: 81, gpa: 3.33 },
  { schema_id: 'schema_fast', grade: 'B', min: 74, max: 77, gpa: 3.0 },
  { schema_id: 'schema_fast', grade: 'B-', min: 70, max: 73, gpa: 2.67 },
  { schema_id: 'schema_fast', grade: 'C+', min: 66, max: 69, gpa: 2.33 },
  { schema_id: 'schema_fast', grade: 'C', min: 62, max: 65, gpa: 2.0 },
  { schema_id: 'schema_fast', grade: 'C-', min: 58, max: 61, gpa: 1.67 },
  { schema_id: 'schema_fast', grade: 'D+', min: 54, max: 57, gpa: 1.33 },
  { schema_id: 'schema_fast', grade: 'D', min: 50, max: 53, gpa: 1.0 },
  { schema_id: 'schema_fast', grade: 'F', min: 0, max: 49, gpa: 0.0 },

  // UCP (Deflated)
  { schema_id: 'schema_ucp', grade: 'A', min: 86, max: 100, gpa: 4.0 },
  { schema_id: 'schema_ucp', grade: 'A-', min: 82, max: 85, gpa: 3.67 },
  { schema_id: 'schema_ucp', grade: 'B+', min: 78, max: 81, gpa: 3.33 },
  { schema_id: 'schema_ucp', grade: 'B', min: 74, max: 77, gpa: 3.0 },
  { schema_id: 'schema_ucp', grade: 'B-', min: 70, max: 73, gpa: 2.67 },
  { schema_id: 'schema_ucp', grade: 'C+', min: 66, max: 69, gpa: 2.33 },
  { schema_id: 'schema_ucp', grade: 'C', min: 62, max: 65, gpa: 2.0 },
  { schema_id: 'schema_ucp', grade: 'C-', min: 58, max: 61, gpa: 1.67 },
  { schema_id: 'schema_ucp', grade: 'D', min: 50, max: 57, gpa: 1.0 },
  { schema_id: 'schema_ucp', grade: 'F', min: 0, max: 49, gpa: 0.0 },

  // FUUAST BS (Liberal)
  { schema_id: 'schema_fuuast_bs', grade: 'A', min: 80, max: 100, gpa: 4.0 },
  { schema_id: 'schema_fuuast_bs', grade: 'B+', min: 75, max: 79, gpa: 3.5 },
  { schema_id: 'schema_fuuast_bs', grade: 'B', min: 70, max: 74, gpa: 3.0 },
  { schema_id: 'schema_fuuast_bs', grade: 'C+', min: 65, max: 69, gpa: 2.5 },
  { schema_id: 'schema_fuuast_bs', grade: 'C', min: 55, max: 64, gpa: 2.0 },
  { schema_id: 'schema_fuuast_bs', grade: 'F', min: 0, max: 54, gpa: 0.0 },
  
  // AJKU (Liberal)
  { schema_id: 'schema_ajku', grade: 'A', min: 80, max: 100, gpa: 4.0 },
  { schema_id: 'schema_ajku', grade: 'B', min: 65, max: 79.9, gpa: 3.0 },
  { schema_id: 'schema_ajku', grade: 'C', min: 50, max: 64.9, gpa: 2.0 },
  { schema_id: 'schema_ajku', grade: 'F', min: 0, max: 49.9, gpa: 0.0 },
];
