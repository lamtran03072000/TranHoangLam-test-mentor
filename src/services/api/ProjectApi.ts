import { CreateProjectState } from "../../page/CreateProject/CreateProject";
import { DataCreateTask } from "../../page/CreateTask/CreateTask";
import { UpdateProjectState } from "../../page/UpdateProject/UpdateProject";
import { https } from "../urlConfig";

export const projectApi = {
  getProjectCategory: () => {
    let uri = "/api/ProjectCategory";
    return https.get(uri);
  },
  createProject: (project: CreateProjectState) => {
    let uri = "/api/Project/createProjectAuthorize";
    return https.post(uri, project);
  },
  getProjectDetail: (id: number) => {
    let uri = `/api/Project/getProjectDetail?id=${id}`;
    return https.get(uri);
  },
  updateProject: (project: UpdateProjectState, id: number) => {
    let uri = `/api/Project/updateProject?projectId=${id}`;
    return https.put(uri, project);
  },
  getAllProject: () => {
    let uri = "/api/Project/getAllProject";
    return https.get(uri);
  },
  getAllStatus: () => {
    let uri = "/api/Status/getAll";
    return https.get(uri);
  },
  getAllPriority: () => {
    let uri = "/api/Priority/getAll";
    return https.get(uri);
  },
  getAllTaskType: () => {
    let uri = "/api/TaskType/getAll";
    return https.get(uri);
  },
  getAllUser: () => {
    let uri = "/api/Users/getUser";
    return https.get(uri);
  },
  createTask: (data: DataCreateTask) => {
    let uri = "/api/Project/createTask";
    return https.post(uri, data);
  },
};
