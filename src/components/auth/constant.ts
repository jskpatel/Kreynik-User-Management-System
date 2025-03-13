export interface SignUpFormFields {
  fname: string;
  lname: string;
  age: number;
  email: string;
  password: string;
  type: "admin" | "manager" | "employee"
}
export const signUpFormFields: SignUpFormFields = {
  fname: "",
  lname: "",
  age: 21,
  email: "",
  password: "",
  type: "admin"
}


export interface UserType {
  value: string;
  label: string;
}
export const UserTypes = {
  admin: "admin",
  manager: "manager",
  employee: "employee"
}
export const UserType: UserType[] = [
  { value: UserTypes.admin, label: "Admin" },
  { value: UserTypes.manager, label: "Manager" },
  { value: UserTypes.employee, label: "Employee" },
];


// Initial values
export const INITS = {
  page: 1,
  limit: 10,
}