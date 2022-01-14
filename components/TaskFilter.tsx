import Link from "next/link";
import React from "react";
import { TaskStatus } from "../generated/graphql-frontend";

interface Props {
  status?: TaskStatus;
}

const TaskFilter: React.FC<Props> = ({ status }) => {
  return (
    <ul className="task-filter">
      <li>
        <Link href="/" scroll={false}>
          <a className={!status ? "task-filter-active" : ""}>All</a>
        </Link>
      </li>
      <li>
        <Link href="/[status]" as="/active" scroll={false} shallow={true}>
          <a
            className={status === TaskStatus.Active ? "task-filter-active" : ""}
          >
            Active
          </a>
        </Link>
      </li>
      <li>
        <Link href="/[status]" as="/completed" scroll={false} shallow={true}>
          <a
            className={
              status === TaskStatus.Completed ? "task-filter-active" : ""
            }
          >
            Completed
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default TaskFilter;
