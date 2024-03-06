import { Server, Socket } from 'socket.io'

class SocketService {
    private _io:Server;
    constructor(){
        console.log('Init Socket Service ...');
        this._io = new Server({
            cors:{
                allowedHeaders:['*'],
                origin:'http://localhost:3000'
            }
        });
    }


    public initListeners(){
        const io = this._io;
        console.log('Init Socket Listeners...');

        io.on('connect',(socket:Socket)=>{
            console.log(`New Socket Connected`,socket.id);
            socket.on('event:message',async({message}:{message:string})=>{
                console.log('New Msg Rec',message);
            });
        });
    }

    get io (){
        return this._io;
    }
}

export default SocketService;