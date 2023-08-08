import { TaskDTO } from "../interfaces/dtos/task.dto";
import { TaskDoneDTO } from "../interfaces/dtos/taskDone.dto";
import { TaskInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
import { TaskDoneInterface } from "../interfaces/taskDone.interface";
import { formatDateToSimpleDate } from "../utils";
import { BadRequestError, ConflictRequestError } from "../../helpers/errors";
const prisma = new PrismaClient();

export class TaskRepository {
   async getAllTasks(): Promise<TaskDTO[]> {
      const tasks = await prisma.task.findMany();
      return tasks;
   }
   async getTasksByRoutine(
      userId: string,
      routineId: string
   ): Promise<TaskDTO[]> {
      const tasks = await prisma.task.findMany({
         where: {
            routine: {
               userId,
               id: routineId,
            },
         },
      });
      return tasks;
   }

   async getTaskById(id: string): Promise<TaskDTO | {}> {
      const response = await prisma.task.findUnique({
         where: {
            id: id,
         },
      });
      if (!response) {
         return {};
      }
      return response;
   }

   async createTask(task: TaskInterface): Promise<TaskDTO> {
      const newTask = await prisma.task.create({ data: task });
      return newTask;
   }

   async putTask(task: TaskInterface): Promise<TaskDTO> {
      const updatedTask = await prisma.task.update({
         where: { id: task.id },
         data: task,
      });
      return updatedTask;
   }

   async deleteTask(taskId: string): Promise<TaskDTO> {
      const deletedTask = await prisma.task.delete({
         where: { id: taskId },
      });
      return deletedTask;
   }

   async checkTask(checkedTaskObj: TaskDoneInterface): Promise<TaskDoneDTO> {
      const taskToBeChecked = await prisma.task.findFirst({
         where: {
            id: checkedTaskObj.taskId,
         },
         select: {
            doneDate: {
               select: {
                  checkDate: true,
               },
            },
         },
      });

      const formattedCheckedTaskDate = formatDateToSimpleDate(
         checkedTaskObj.checkDate
      );

      taskToBeChecked?.doneDate.forEach((DatabaseTaskDate) => {
         const formattedDatabaseDate = formatDateToSimpleDate(
            DatabaseTaskDate.checkDate
         );
         if (formattedDatabaseDate === formattedCheckedTaskDate) {
            throw new ConflictRequestError(
               "This task was already checked today"
            );
         }
      });

      const checkedTask = await prisma.taskDoneDate.create({
         data: checkedTaskObj,
      });

      return checkedTask;
   }

   async uncheckTask(taskId: string): Promise<TaskDoneDTO> {
      const uncheckedTasksToDelete = await prisma.taskDoneDate.findMany({
         where: {
            taskId: taskId,
         },
      });

      const today = formatDateToSimpleDate(new Date());

      const checkDateToDelete = uncheckedTasksToDelete.find(
         (task) => formatDateToSimpleDate(task.checkDate) === today
      );
      console.log(checkDateToDelete, "CheckDate to delete");

      if (!checkDateToDelete) {
         throw new BadRequestError(
            "Task not found with the given ID and checkDate."
         );
      }
      const uncheckedTask = await prisma.taskDoneDate.delete({
         where: { id: checkDateToDelete.id },
      });
      return uncheckedTask;
   }
}
