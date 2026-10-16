export interface GradePoint {
  grade: string;
  gpa: number;
}

export interface AbsoluteBracket {
  grade: string;
  min: number;
  max: number;
  gpa: number;
}

export const calculateAbsoluteGPA = (percentage: number, brackets: AbsoluteBracket[]): GradePoint => {
  for (const bracket of brackets) {
    if (percentage >= bracket.min && percentage <= bracket.max) {
      return { grade: bracket.grade, gpa: bracket.gpa };
    }
  }
  return { grade: 'F', gpa: 0.0 };
};

export const calculateContinuousGPA = (percentage: number, uni_id: string): GradePoint => {
  // Handles Virtual University, Peshawar, UAF logic
  if (uni_id === 'uni_vu') {
    if (percentage < 50) return { grade: 'F', gpa: 0.0 };
    if (percentage >= 85) return { grade: 'A', gpa: 4.0 };
    
    // Example piece-wise logic based on documentation
    // If between 50 and 60.99
    if (percentage >= 50 && percentage < 61) {
      const gpa = 1.00 + ((percentage - 50) / 10.99) * 0.99;
      return { grade: 'C', gpa: parseFloat(gpa.toFixed(2)) };
    }
    // Simple mock logic for VU's continuous decrements
    const gpa = 4.0 - ((85 - percentage) * 0.07); // Approximation
    return { grade: getGradeFromGPA(gpa), gpa: Math.max(1.0, parseFloat(gpa.toFixed(2))) };
  }
  
  if (uni_id === 'uni_peshawar') {
    const p = Math.floor(percentage); // They use flooring/rounding
    if (p < 50) return { grade: 'F', gpa: 0.0 };
    if (p >= 85) return { grade: 'A', gpa: 4.0 };
    const gpa = 4.0 - ((85 - p) * 0.1);
    return { grade: getGradeFromGPA(gpa), gpa: parseFloat(gpa.toFixed(2)) };
  }

  return { grade: 'F', gpa: 0.0 };
};

export const calculateRelativeGPA = (marks: number, mean: number, stdDev: number): GradePoint => {
  // Uses Z-Score: (Marks - Mean) / StdDev
  if (stdDev === 0) return { grade: 'C', gpa: 2.0 };
  
  const zScore = (marks - mean) / stdDev;
  
  if (zScore >= 1.5) return { grade: 'A', gpa: 4.0 };
  if (zScore >= 1.0) return { grade: 'A-', gpa: 3.67 };
  if (zScore >= 0.5) return { grade: 'B+', gpa: 3.33 };
  if (zScore >= 0.0) return { grade: 'B', gpa: 3.0 };
  if (zScore >= -0.5) return { grade: 'B-', gpa: 2.67 };
  if (zScore >= -1.0) return { grade: 'C+', gpa: 2.33 };
  if (zScore >= -1.5) return { grade: 'C', gpa: 2.0 };
  
  return { grade: 'F', gpa: 0.0 };
};

const getGradeFromGPA = (gpa: number) => {
  if (gpa >= 3.67) return 'A';
  if (gpa >= 3.0) return 'B';
  if (gpa >= 2.0) return 'C';
  if (gpa >= 1.0) return 'D';
  return 'F';
};

export const convertCGPAToPercentage = (cgpa: number, m: number = 25, c: number = 0): number => {
  return (cgpa * m) + c;
};
