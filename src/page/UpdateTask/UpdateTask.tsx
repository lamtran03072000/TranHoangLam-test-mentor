import React, { useEffect, useState } from "react";
import { projectApi } from "../../services/api/ProjectApi";
import { message, Select, SelectProps, Space } from "antd";
import TextEditter from "../../components/TextEditter/TextEditter";
import { useNavigate, useParams } from "react-router-dom";
export type AllProject = Project[];

// type result data when getTaskId
export interface ResultTaskUpdate {
  priorityTask: PriorityTask;
  taskTypeDetail: TaskTypeDetail;
  assigness: Assigness[];
  lstComment: any[];
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  typeId: number;
  priorityId: number;
  projectId: number;
}

export interface PriorityTask {
  priorityId: number;
  priority: string;
}

export interface TaskTypeDetail {
  id: number;
  taskType: string;
}

export interface Assigness {
  id: number;
  avatar: string;
  name: string;
  alias: string;
}

// Project
export interface Project {
  members: Member[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

export interface Member {
  userId: number;
  name: string;
  avatar: string;
}

export interface Creator {
  id: number;
  name: string;
}

// Status
export type AllStatus = Status[];

export interface Status {
  statusId: string;
  statusName: string;
  alias: string;
  deleted: string;
}

export type AllPriority = Priority[];

export interface Priority {
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
}
export type AllTaskType = TaskType[];

export interface TaskType {
  id: number;
  taskType: string;
}

export type AllUser = User[];
export interface User {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
}

export interface DataUpdateTask {
  listUserAsign: number[];
  taskId: string;
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
}
type Props = {};
type ParamType = {
  taskId: string;
};
export default function UpdateTask({}: Props) {
  const { taskId } = useParams<ParamType>();
  const navigate = useNavigate();
  const [allProject, setAllProject] = useState<AllProject>([]);
  const [allStatus, setAllStatus] = useState<AllStatus>([]);
  const [allPriority, setAllPriority] = useState<AllPriority>([]);
  const [allTaskType, setAllTaskType] = useState<AllTaskType>([]);
  const [usersAssign, setUsersAssign] = useState<SelectProps["options"]>([]);
  const [dataUpdateTask, setDataUpdateTask] = useState<DataUpdateTask>({
    listUserAsign: [0],
    taskName: "",
    description: "",
    statusId: "",
    originalEstimate: 0,
    timeTrackingRemaining: 0,
    timeTrackingSpent: 0,
    projectId: 0,
    typeId: 0,
    priorityId: 0,
    taskId: "",
  });
  const fetchDateProjectUpdate = async () => {
    try {
      if (taskId) {
        const res = await projectApi.getTaskDetail(parseInt(taskId));
        const data: ResultTaskUpdate = res.data.content;
        setDataUpdateTask({
          taskId: data.taskId.toString(),
          description: data.description,
          listUserAsign: data.assigness.map((d) => d.id),
          originalEstimate: data.originalEstimate,
          priorityId: data.priorityId,
          projectId: data.projectId,
          statusId: data.statusId,
          taskName: data.taskName,
          timeTrackingRemaining: data.timeTrackingRemaining,
          timeTrackingSpent: data.timeTrackingSpent,
          typeId: data.typeId,
        });
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const fetchAllProject = async () => {
    try {
      const res = await projectApi.getAllProject();
      setAllProject(res.data.content);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const fetchAllStatus = async () => {
    try {
      const res = await projectApi.getAllStatus();
      setAllStatus(res.data.content);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const fetchAllPriority = async () => {
    try {
      const res = await projectApi.getAllPriority();
      setAllPriority(res.data.content);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const fetchAllTaskType = async () => {
    try {
      const res = await projectApi.getAllTaskType();
      setAllTaskType(res.data.content);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const fetchAllUser = async () => {
    try {
      const res = await projectApi.getAllUser();
      const users: AllUser = res.data.content;

      const usersAssign = users.map((user) => ({
        label: user.name,
        value: user.userId,
      }));
      setUsersAssign(usersAssign);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllProject();
    fetchAllStatus();
    fetchAllPriority();
    fetchAllTaskType();
    fetchAllUser();
    fetchDateProjectUpdate();
  }, []);
  const renderProject = () =>
    allProject.map((p) => {
      return (
        <option value={p.id} key={p.id}>
          {p.projectName}
        </option>
      );
    });
  const renderStatus = () =>
    allStatus.map((s) => {
      return (
        <option value={s.statusId} key={s.statusId}>
          {s.statusName}
        </option>
      );
    });
  const renderPriority = () =>
    allPriority.map((p) => {
      return (
        <option value={p.priorityId} key={p.priorityId}>
          {p.description}
        </option>
      );
    });
  const renderTaskType = () =>
    allTaskType.map((t) => {
      return (
        <option value={t.id} key={t.id}>
          {t.taskType}
        </option>
      );
    });
  const handleChangeUserAssign = (value: number[]) => {
    if (value.length) {
      setDataUpdateTask({ ...dataUpdateTask, listUserAsign: value });
    }
  };
  const handleChangeDescription = (editor: string) => {
    if (editor) {
      setDataUpdateTask({ ...dataUpdateTask, description: editor });
    }
  };
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    setDataUpdateTask({ ...dataUpdateTask, [name]: value });
  };
  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const key in dataUpdateTask) {
      if (dataUpdateTask.hasOwnProperty(key)) {
        if (!dataUpdateTask[key as keyof DataUpdateTask]) {
          message.error(`${key} cannot be blank`);
          return;
        }
        if (!dataUpdateTask.listUserAsign.length) {
          message.error(`List User Assign cannot be blank`);
          return;
        }
      }
    }
    try {
      const res = await projectApi.updateTask(dataUpdateTask);
      message.success("Update task success");
      navigate("/home");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <main className="text-xs">
      <h1 className="text-3xl font-bold  ">Update Task</h1>
      <form onSubmit={handleCreateTask} className="space-y-2">
        {/* // Project  */}
        <div>
          <label className="block w-full font-bold">Project</label>

          <select
            onChange={handleChangeValue}
            value={dataUpdateTask.projectId}
            name="projectId"
            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
          >
            <option value="0">Choose project</option>
            {renderProject()}
          </select>
        </div>
        {/* TaskName */}
        <div>
          <label className="block w-full font-bold">Task name</label>
          <input
            onChange={handleChangeValue}
            name="taskName"
            value={dataUpdateTask.taskName}
            type="text"
            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
          />
        </div>
        {/* Status */}
        <div>
          <label className="block w-full font-bold">Status</label>
          <select
            value={dataUpdateTask.statusId}
            onChange={handleChangeValue}
            name="statusId"
            className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
          >
            <option value="0">Choose Status</option>
            {renderStatus()}
          </select>
        </div>
        <div className="flex space-x-10">
          {/* Priority */}
          <div className="flex-1">
            <label className="block w-full font-bold">Priority</label>

            <select
              value={dataUpdateTask.priorityId}
              onChange={handleChangeValue}
              name="priorityId"
              className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
            >
              <option value="0">Choose Priority</option>
              {renderPriority()}
            </select>
          </div>
          {/* Tasktype */}
          <div className="flex-1">
            <label className="block w-full font-bold">Task Type</label>

            <select
              value={dataUpdateTask.typeId}
              onChange={handleChangeValue}
              name="typeId"
              className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
            >
              <option value="0">Choose Task Type</option>
              {renderTaskType()}
            </select>
          </div>
        </div>
        {/* Assign */}
        <div>
          <label className="block w-full font-bold">Assigness</label>
          <Space style={{ width: "100%" }} direction="vertical">
            <Select
              mode="multiple"
              value={dataUpdateTask.listUserAsign}
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChangeUserAssign}
              options={usersAssign}
            />
          </Space>
        </div>
        <div className="flex space-x-10">
          {/* Original Estimate */}
          <div className="flex-1">
            <label className="block w-full font-bold">Original Estimate</label>
            <input
              value={dataUpdateTask.originalEstimate}
              onChange={handleChangeValue}
              name="originalEstimate"
              type="number"
              className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
            />
          </div>
          <div className="flex-1 flex space-x-10">
            {/* Time spent */}
            <div className="flex-1">
              <label className="block w-full font-bold">Time spent</label>
              <input
                value={dataUpdateTask.timeTrackingSpent}
                onChange={handleChangeValue}
                name="timeTrackingSpent"
                type="number"
                className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
              />
            </div>
            {/* Time remaining */}
            <div className="flex-1">
              <label className="block w-full font-bold">Time remaining</label>
              <input
                value={dataUpdateTask.timeTrackingRemaining}
                onChange={handleChangeValue}
                name="timeTrackingRemaining"
                type="number"
                className="block w-full px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block w-full font-bold">Description</label>
          <TextEditter
            description={dataUpdateTask.description}
            handleChangeDescription={handleChangeDescription}
          />
        </div>

        <button className="border-blue-400 px-3 py-2 rounded text-blue-400 border">
          Update Task
        </button>
      </form>
    </main>
  );
}
