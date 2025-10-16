'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface InstallmentOption {
  parcels: number;
  installment: number;
  total: number;
}

interface CourseContextData {
  selectedCourseId: string | null;
  selectedInstallment: InstallmentOption | null;
  setSelectedCourse: (courseId: string) => void;
  setSelectedInstallmentOption: (installment: InstallmentOption) => void;
  clearSelections: () => void;
}

const CourseContext = createContext<CourseContextData | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedInstallment, setSelectedInstallment] = useState<InstallmentOption | null>(null);

  const setSelectedCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const setSelectedInstallmentOption = (installment: InstallmentOption) => {
    setSelectedInstallment(installment);
  };

  const clearSelections = () => {
    setSelectedCourseId(null);
    setSelectedInstallment(null);
  };

  return (
    <CourseContext.Provider
      value={{
        selectedCourseId,
        selectedInstallment,
        setSelectedCourse,
        setSelectedInstallmentOption,
        clearSelections,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse deve ser usado dentro de um CourseProvider')
  }
  return context;
}