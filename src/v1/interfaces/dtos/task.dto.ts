export interface TaskDTO {
    id?: string;
    description?: string | null;
    comment?: string | null;
    routineId: string
    createdAt: Date;
    updatedAt: Date;
}