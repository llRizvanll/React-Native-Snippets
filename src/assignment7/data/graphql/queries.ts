import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($limit: Int, $offset: Int) {
    tasks(limit: $limit, offset: $offset) {
      id
      title
      completed
      createdAt
    }
  }
`;

export const GET_TASK_COUNT = gql`
  query GetTaskCount {
    taskCount
  }
`;
