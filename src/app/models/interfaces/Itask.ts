export interface ITask {
    id: number;
    title: string;
    completed: boolean;
    categoryId?: number;
}