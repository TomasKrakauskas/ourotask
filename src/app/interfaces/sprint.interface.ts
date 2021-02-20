export interface Sprint {

    _id: string,
    board_id: string,

    frozen: boolean,
    backlog: boolean,

    title: string,

    due_date: Date,
    completion_date: Date,

    createdAt: Date

}