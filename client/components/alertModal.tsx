
import { RootState } from "@/store/reducers";
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
} from "./ui/alert-dialog";
import { setClose } from "@/store/slices/modalSlice";
import { useDispatch,useSelector } from "react-redux"; 

interface alertModalProps{
    show:boolean;
    title:string;
    description:string;
}


const AlertModal = ({show,title,description,}:alertModalProps) => {
    const dispatch = useDispatch();
    const onClose =()=>{
        dispatch(setClose());
    }
    const isOpen = useSelector((state:RootState)=> state.modal.open);
    
    console.log('isOpen',isOpen)
    return ( 
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
 
export default AlertModal;