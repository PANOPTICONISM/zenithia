import { ClientProps } from 'lib/clients';

export type ProjectProps = {
    id?: number,
    project_id?: string,
    title: string,
    start_date: string,
    finish_date: string,
    status: string,
    revenue: string,
    client_id: string | null,
    clients?: ClientProps,
}