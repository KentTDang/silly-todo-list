import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

interface TableTaskProps {
  incompleteTasks: Array<any>;
  completeTasks: Array<any>;
}

export default function TaskTable(props: TableTaskProps) {
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>State</th>
          <th>Actions</th>
        </tr>
            {props.incompleteTasks.map((task, i) => (
              <tr key={`task-${i}`}>
                <td>{task.task}</td>
                <td>Incomplete</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>Complete</button>
                </td>
              </tr>
            ))}
            {props.completeTasks.map((task, i) => (
              <tr key={`task-${i}`}>
                <td>{task.task}</td>
                <td>Complete</td>
              </tr>
            ))}
      </table>
    </div>
  );
}
