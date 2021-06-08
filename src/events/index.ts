import { BigNumber } from "ethers";
import { AaveServices } from "../contracts/types/AaveServices";
import { RefinanceTask, TaskState } from "../types";
import { get, set } from "local-storage";
import config from "config";

export const Submitted = "STask";
export const Executed = "ETask";
export const Cancelled = "CTask";
/* eslint-disable @typescript-eslint/no-unused-vars, prefer-const */
export const init = async (aaveServices: AaveServices, user: string) => {
  await getTaskByState(aaveServices, user);

  // subcribe to events.

  aaveServices.on(aaveServices.filters.LogExecSuccess(null, user), (id) => {
    const executedTaskDico = JSON.parse(get(Executed)) as {
      [id: string]: RefinanceTask;
    };
    const submittedTaskDico = JSON.parse(get(Submitted)) as {
      [id: string]: RefinanceTask;
    };
    executedTaskDico[id.toString()] = submittedTaskDico[id.toString()];
    executedTaskDico[id.toString()].state = TaskState.Executed;
    delete submittedTaskDico[id.toString()];
    set(Submitted, JSON.stringify(submittedTaskDico));
    set(Executed, JSON.stringify(executedTaskDico));
  });

  aaveServices.on(
    aaveServices.filters.LogTaskCancelled(null, user),
    (_taskHash, _owner, id) => {
      const cancelledTaskDico = JSON.parse(get(Cancelled)) as {
        [id: string]: RefinanceTask;
      };
      const submittedTaskDico = JSON.parse(get(Submitted)) as {
        [id: string]: RefinanceTask;
      };
      cancelledTaskDico[id.toString()] = submittedTaskDico[id.toString()];
      cancelledTaskDico[id.toString()].state = TaskState.Cancelled;
      delete submittedTaskDico[id.toString()];
      set(Submitted, JSON.stringify(submittedTaskDico));
      set(Cancelled, JSON.stringify(cancelledTaskDico));
    }
  );

  aaveServices.on(
    aaveServices.filters.LogTaskSubmitted(null, null, user),
    (taskHash, taskType, owner, id, payload) => {
      const submittedTaskDico = JSON.parse(get(Submitted)) as {
        [id: string]: RefinanceTask;
      };
      submittedTaskDico[String(id)] = submittedTaskDico[String(id)] = {
        state: TaskState.CheckPending,
        taskHash: taskHash,
        taskType: taskType,
        owner: owner,
        id: String(id),
        payload: payload,
      } as unknown as RefinanceTask;
      set(Submitted, JSON.stringify(submittedTaskDico));
    }
  );
};

export const getTasks = (state: string): { [id: string]: RefinanceTask } => {
  return JSON.parse(get(state)) as { [id: string]: RefinanceTask };
};

const getTaskByState = async (aaveServices: AaveServices, user: string) => {
  const blockNumber = config.get("BlockNumber") as number;
  const userSubmittedTasks = await aaveServices.queryFilter(
    aaveServices.filters.LogTaskSubmitted(null, null, user),
    blockNumber
  );
  const userCancelledTasks = await aaveServices.queryFilter(
    aaveServices.filters.LogTaskCancelled(null, user),
    blockNumber
  );
  const userExecutedTasks = await aaveServices.queryFilter(
    aaveServices.filters.LogExecSuccess(null, user),
    blockNumber
  );

  let submittedTaskDico: { [id: string]: RefinanceTask } = {};
  let cancelledTaskDico: { [id: string]: RefinanceTask } = {};
  let executedTaskDico: { [id: string]: RefinanceTask } = {};

  for (const userSubmittedTask of userSubmittedTasks) {
    const id = userSubmittedTask.topics[3];
    submittedTaskDico[id] = {
      state: TaskState.CheckPending,
      taskHash: userSubmittedTask.topics[0],
      taskType: BigNumber.from(userSubmittedTask.topics[1]),
      owner: user,
      id: id,
      payload: userSubmittedTask.topics[4],
    } as unknown as RefinanceTask;
  }

  for (const userCancelledTask of userCancelledTasks) {
    const id: string = userCancelledTask.topics[2];
    cancelledTaskDico[id] = submittedTaskDico[id];
    delete submittedTaskDico[id];
    cancelledTaskDico[id].state = TaskState.Cancelled;
  }

  for (const userExecutedTask of userExecutedTasks) {
    const id: string = userExecutedTask.topics[0];
    executedTaskDico[id] = submittedTaskDico[id];
    delete submittedTaskDico[id];
    executedTaskDico[id].state = TaskState.Executed;
  }

  set(Submitted, JSON.stringify(submittedTaskDico));
  set(Cancelled, JSON.stringify(cancelledTaskDico));
  set(Executed, JSON.stringify(executedTaskDico));
};

/* eslint-enable @typescript-eslint/no-unused-vars, prefer-const */
