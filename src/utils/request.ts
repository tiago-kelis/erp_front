import { ApiGetUser, ApiSignIn } from "src/models/auth";
import { useApi } from "./api"
import { ApiGetPermissions } from "src/models/permission";
import { ApiGetGroup, ApiGetGroups } from "src/models/group";
import { ApiGetEmployee, ApiGetEmployees } from "src/models/employee";
import { ApiGetTask, ApiGetTasks } from "src/models/task";

// Authentications
const signIn = async ({email, password}: {  email: string, password: string }) => {
    const response = await useApi<ApiSignIn>('auth/signin', 'POST', { email, password }, false);
    return response;
}

// Users
const getUser = async () => {
    const response = await useApi<ApiGetUser>('auth/user', 'GET');
    return response;
}

// Groups and Permissions
const getPermissions = async () => {
    const response = await useApi<ApiGetPermissions>('companies/permissions', 'GET');
    return response;
}

const getGroups = async () => {
    const response = await useApi<ApiGetGroups>('companies/groups', 'GET');
    return response;
}

const getAnGroup = async (id: number) => {
    const response = await useApi<ApiGetGroup>(`companies/groups/${id}`, 'GET');
    return response;
}


const addGroup = async ({nome, permissions}: {nome: string, permissions: string}) => {
    const response = await useApi('companies/groups', 'POST', {nome, permissions});
    return response;
}


const editGroup = async ( id: number, {nome, permissions}: {nome?: string, permissions?: string}) => {
    const response = await useApi(`companies/groups/${id}`, 'PUT', {nome, permissions});
    return response;
}

const deleteGroup = async (id: number) => {
    const response = await useApi(`companies/groups/${id}`, 'DELETE');
    return response;
}


// Employees
const getEmployees = async () => {
    const response = await useApi<ApiGetEmployees>('companies/employees', 'GET');
    return response;
}

const getAnEmplyee = async (id: number) => {
    const response = await useApi<ApiGetEmployee>(`companies/employees/${id}`, 'GET');
    return response;
}

const addEmployee = async ({ nome, email, password }: {nome: string, email: string, password: string }) => {
    const response = await useApi('companies/employees', 'POST', {nome, email, password });
    return response;
}


const editEmployee = async (id: number, { nome, email, groups }: {nome?: string, email?: string, groups: string }) => {
    const response = await useApi(`companies/employees/${id}`, 'PUT', {nome, email, groups });
    return response;
}

const deleteEmployee = async (id: number) => {
    const response = await useApi(`companies/employees/${id}`, 'DELETE');
    return response;
}


// Tasks
const getTasks = async () => {
    const response = await useApi<ApiGetTasks>('companies/tasks', 'GET');
    return response;
}

const getAnTask = async (id: number) => {
    const response = await useApi<ApiGetTask>(`companies/tasks/${id}`, 'GET');
    return response;
}

const addTask = async ({ title, description, due_date, employee_id, status_id }: {title: string, description: string, due_date: string, employee_id: number, status_id: number }) => {
    const response = await useApi<ApiGetTask>('companies/tasks', 'POST', {title, description, due_date, employee_id, status_id });
    return response;
}


const editTask = async (id: number, { nome, description, due_date, employee_id, status_id }: {nome?: string, description?: string, due_date?: string, employee_id?: number, status_id?: number }) => {
    const response = await useApi(`companies/tasks/${id}`, 'PUT', {nome, description, due_date, employee_id, status_id });
    return response;
}

const deleteTask = async (id: number) => {
    const response = await useApi(`companies/tasks/${id}`, 'DELETE');
    return response;    
}


//Exporting All requests
export const useRequest = () => ({

    //Auth
    signIn,
    getUser,

    //Groups and Permissions
    getPermissions,
    getGroups,
    getAnGroup,
    addGroup,
    editGroup,
    deleteGroup,

    //Employees
    getEmployees,
    getAnEmplyee,
    addEmployee,
    editEmployee,    
    deleteEmployee,

    //Tasks
    getTasks,
    getAnTask,
    addTask,
    editTask,
    deleteTask

})