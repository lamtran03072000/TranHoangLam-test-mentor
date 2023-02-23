import React, { useEffect, useRef, useState } from "react";
import { AllProject, Creator, Member } from "../CreateTask/CreateTask";
import { projectApi } from "../../services/api/ProjectApi";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { InputRef, message, Tag } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
type Props = {};

export interface DataType {
  key: string;
  id: number;
  projectName: string;
  categoryName: string;
  members: Member[];
  creator: Creator;
}
type DataIndex = keyof DataType;

export default function Home({}: Props) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  //  start Table

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            className="bg-blue-500 rounded text-white hover:text-white hover:bg-blue-700"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => <span>{text}</span>,
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      width: "10%",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return <span>{id}</span>;
      },
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Project Name",
      width: "10%",
      dataIndex: "projectName",
      key: "projectName",
      render: (projectName) => {
        return <span>{projectName}</span>;
      },
      ...getColumnSearchProps("projectName"),
    },
    {
      title: "Category Name",
      width: "10%",

      dataIndex: "categoryName",
      key: "categoryName",
      render: (categoryName) => {
        return <span>{categoryName}</span>;
      },
    },
    {
      title: "creator",
      width: "10%",

      dataIndex: "creator",
      key: "creator",
      render: (creator: Creator) => {
        return <span>{creator.name}</span>;
      },
    },
    {
      title: "members",
      width: "25%",

      key: "members",
      dataIndex: "members",
      render: (members: Member[]) => {
        return (
          <div className="space-x-1">
            {members.map((m) => {
              return (
                <Tag color={"volcano"} key={m.userId}>
                  {m.name.toUpperCase()}
                </Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "15%",

      render: (_, record) => (
        <div className="space-x-3">
          <NavLink
            to={`/updateProject/${record.id}`}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 duration-200"
          >
            update
          </NavLink>
          <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 duration-200">
            Delete
          </button>
        </div>
      ),
    },
  ];
  //end Table
  const [data, setData] = useState<DataType[]>([]);
  const fetchAllProject = async () => {
    try {
      const res = await projectApi.getAllProject();
      const resData: AllProject = res.data.content;
      const data: DataType[] = resData.map((d) => ({
        id: d.id,
        key: d.id.toString(),
        projectName: d.projectName,
        categoryName: d.categoryName,
        creator: d.creator,
        members: d.members,
      }));
      setData(data);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllProject();
  }, []);
  return (
    <main className="">
      <h1 className="text-3xl font-bold ">Project management</h1>
      <Table pagination={{ pageSize: 6 }} columns={columns} dataSource={data} />
    </main>
  );
}
