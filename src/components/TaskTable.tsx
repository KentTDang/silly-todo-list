import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { TaskTableRow } from "./TaskTableRow/TaskTableRow";
import { Tasks } from "../types";

interface TableTaskProps {
  incompleteTasks: Tasks;
  completeTasks: Tasks;
}

export default function TaskTable(props: TableTaskProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props.incompleteTasks).map(([key, value]) => (
            <TaskTableRow id={key} name={value.task} completed={false} />
          ))}
          {Object.entries(props.completeTasks).map(([key, value]) => (
            <TaskTableRow id={key} name={value.task} completed={true} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
