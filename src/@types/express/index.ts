//Modifica a biblioteca express com a extensão
declare namespace Express{
    export interface Request {
        user: {
            id: string;
        }
    }
}