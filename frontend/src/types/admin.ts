export type Gender =
  | "Male"
  | "Female"
  | "Other";

/* -------------------------------------------------------------------------- */
/* PROFESSOR                                                                  */
/* -------------------------------------------------------------------------- */
export type ProfessorDesignation =
  | "Professor"
  | "Assistant Professor"
  | "Lecturer"
  | "Exhibitor";

export type Professor = {
  id: string;
  name: string;
  designation: ProfessorDesignation;
  imageUrl: string | null;
  phoneNo: string | null;
  email: string | null;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
};

export type ProfessorsResponse = {
  professors: Professor[];
};

export type ProfessorFormData = {
  name: string;
  designation: ProfessorDesignation;
  imageUrl: string;
  phoneNo: string;
  email: string;
  gender: Gender;
};

/* -------------------------------------------------------------------------- */
/* EMPLOYEE                                                                   */
/* -------------------------------------------------------------------------- */
export type Employee = {
  id: string;
  name: string;
  designation: string | null;
  imageUrl: string | null;
  phoneNo: string | null;
  email: string;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
};

export type EmployeesResponse = {
  employees: Employee[];
};

export type EmployeeFormData = {
  name: string;
  designation: string;
  imageUrl: string;
  phoneNo: string;
  email: string;
  gender: Gender;
};

/* -------------------------------------------------------------------------- */
/* ADMIN                                                                      */
/* -------------------------------------------------------------------------- */
export type AdminMeResponse = {
  admin: {
    id: string;
    email: string;
  };
};


/* NOTICES */

export type Notice = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type NoticesResponse = {
  notices: Notice[];
};

export type NoticeFormData = {
  content: string;
};