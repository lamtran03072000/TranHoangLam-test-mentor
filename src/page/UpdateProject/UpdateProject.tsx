import { message } from "antd";
import { type } from "os";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextEditter from "../../components/TextEditter/TextEditter";
import { projectApi } from "../../services/api/ProjectApi";

type ItemCategory = {
  id: number;
  projectCategoryName: string;
};

type ResultDataCategory = ItemCategory[] | [];

export type UpdateProjectState = {
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  creator: number;
};

type ParamType = {
  projectId: string;
};

// Type ProjectDetail
export interface TypeProjectDetail {
  lstTask: LstTask[];
  members: Member[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  projectCategory: ProjectCategory;
  alias: string;
}

export interface LstTask {
  lstTaskDeTail: LstTaskDeTail[];
  statusId: string;
  statusName: string;
  alias: string;
}

export interface LstTaskDeTail {
  priorityTask: PriorityTask;
  taskTypeDetail: TaskTypeDetail;
  assigness: any[];
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

export interface Member {
  userId: number;
  name: string;
  avatar: string;
  email: any;
  phoneNumber: any;
}

export interface Creator {
  id: number;
  name: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
}

type Props = {};

export default function UpdateProject({}: Props) {
  const navigate = useNavigate();
  const { projectId } = useParams<ParamType>();
  const [project, setProject] = useState<UpdateProjectState>({
    id: 0,
    projectName: "",
    description: "Trung tâm cybersoft mãi đỉnh",
    categoryId: 0,
    creator: 0,
  });
  const [dataCategory, setDataCategory] = useState<ResultDataCategory>([]);
  const fetchProjectCategory = async () => {
    try {
      const res = await projectApi.getProjectCategory();

      setDataCategory(res.data.content);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const fetchProjectDetail = async () => {
    try {
      if (projectId) {
        const res = await projectApi.getProjectDetail(parseInt(projectId));
        const dataProject: TypeProjectDetail = res.data.content;
        setProject({
          id: dataProject.id,
          categoryId: dataProject.projectCategory.id,
          creator: dataProject.creator.id,
          description: dataProject.description,
          projectName: dataProject.projectName,
        });
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchProjectDetail();
    fetchProjectCategory();
  }, []);

  const renderCategory = () => {
    return dataCategory.map((item) => {
      return (
        <option value={item.id} key={item.id}>
          {item.projectCategoryName}
        </option>
      );
    });
  };
  const handleChangeDescription = (editor: string) => {
    if (editor) {
      setProject({ ...project, description: editor });
    }
  };
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };
  const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const key in project) {
      if (project.hasOwnProperty(key)) {
        if (!project[key as keyof UpdateProjectState]) {
          message.error(`${key} cannot be blank`);
          return;
        }
      }
    }
    try {
      await projectApi.updateProject(project, project.id);
      message.success("Update project success");
      navigate("/home");
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <main className="px-20 space-y-6">
      <h1 className="text-3xl font-bold  ">Update Project</h1>
      <form onSubmit={handleUpdateProject} className="space-y-3">
        <div>
          <label className="block text-xl w-full ">Project Name</label>
          <input
            value={project.projectName}
            onChange={handleChangeValue}
            name="projectName"
            type="text"
            className="block w-2/3 px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
          />
        </div>

        <div className="w-2/3">
          <TextEditter
            description={project.description}
            handleChangeDescription={handleChangeDescription}
          />
        </div>
        <div>
          <select
            value={project.categoryId}
            onChange={handleChangeValue}
            name="categoryId"
            className="block w-2/3 px-3 py-2 border border-gray-300 rounded focus:outline-gray-400"
          >
            <option value="0">Choose Category</option>
            {renderCategory()}
          </select>
        </div>
        <button className="border-blue-400 px-3 py-2 rounded text-blue-400 border">
          Update Project
        </button>
      </form>
    </main>
  );
}
