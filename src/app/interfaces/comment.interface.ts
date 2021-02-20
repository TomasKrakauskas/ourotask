export interface Comment {

    _id: string,
    task_id: string,
    creator_id: string,
    reply: string,

    content: string,

    createdAt: Date
}