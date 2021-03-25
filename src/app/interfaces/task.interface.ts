export interface Task {

    _id: string,
    
    sprint_id: string,
    creator_id: string,
    assignee_id: string,

    task_type: string,
    label_ids: Array<string>,

    title: string,
    description: string,
    status: string,
    
    attachments: Array<String>,

    counter: number,
    counter_code: string,

    due_date: Date,
    completion_date: Date,

    createdAt: Date

} 