import { message } from "antd";
import { type } from "os";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextEditter from "../../components/TextEditter/TextEditter";
import { projectApi } from "../../services/api/ProjectApi";

type ItemCategory = {
  id: number;
  projectCategoryName: string;
};

type ResultDataCategory = ItemCategory[] | [];

type Props = {};
export type CreateProjectState = {
  projectName: string;
  description: string;
  categoryId: number;
  alias: string;
};
export default function CreateProject({}: Props) {
  const navigate = useNavigate();
  const [project, setProject] = useState<CreateProjectState>({
    projectName: "",
    description: "Trung tâm cybersoft mãi đỉnh",
    categoryId: 0,
    alias: "",
  });
  const [dataCategory, setDataCategory] = useState<ResultDataCategory>([]);
  useEffect(() => {
    const getProjectCategory = async () => {
      try {
        const res = await projectApi.getProjectCategory();
        setDataCategory(res.data.content);
      } catch (error: any) {
        message.error(error.message);
      }
    };
    getProjectCategory();
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
  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const key in project) {
      if (project.hasOwnProperty(key)) {
        if (!project[key as keyof CreateProjectState]) {
          message.error(`${key} cannot be blank`);
          return;
        }
      }
    }
    try {
      await projectApi.createProject(project);
      message.success("Create project success");
      navigate("/home");
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <main className="px-20 space-y-6">
      <h1 className="text-3xl font-bold  ">CreateProject</h1>
      <form onSubmit={handleCreateProject} className="space-y-3">
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
        <div>
          <label className="block text-xl w-full ">Alias</label>
          <input
            value={project.alias}
            onChange={handleChangeValue}
            name="alias"
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
          Create Project
        </button>
      </form>
    </main>
  );
}
