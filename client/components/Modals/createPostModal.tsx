import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "../ui/use-toast"
import { Check, Loader2, Router, X } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useSelector,useDispatch } from "react-redux"
import { RootState } from "@/store/reducers";
import { setClose } from '@/store/slices/modalSlice'
import useQuery from '@/hooks/useQuery'
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { url } from "inspector"

export function CreatePostModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [preview,setPreview] = useState('');
  const [caption,setCaption] = useState('')
  const [loading,setLoading] = useState(false);
  const formSchema = z.object({
    posts:z.string().optional(),
    caption: z.string().optional()
  }).refine(data=>{
    console.log(data.posts)
    if(!data.caption && !data.posts) return false;
    return true;
  },{
    message:"fill atlease one of the field",
    path:['posts']
  })

  const form = useForm({  
    resolver:zodResolver(formSchema),
    mode:"onTouched"
  });
  
  const onSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true)
    const data = new FormData();
    const selectedImage = document.getElementById('upload') as HTMLInputElement;
    const image = selectedImage.files?.[0];
    if (image) {
        data.append('posts',image);
    }
    if(caption){
        data.append('caption',caption)
    }
    axios.post('http://localhost:3004/api/posts/create',data).then(res=>{
        console.log(res)
      toast({
        title: "Profile Section Updated Successfully",
        action: (
          <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded"><Check /></div>
        ),
      })
      onClose();
      router.refresh();
    }).catch(err=>{
      console.log(err);
      toast({
        title: "Something Went Wrong",
        description:"Please try again!",
        action: (
          <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded"><X /></div>
        ),
      })
    }).finally(()=>{
        setLoading(false);
    })
  }
  
  const onClose =()=>{
    form.reset();
    dispatch(setClose())
  }
  const user = useSelector((state:RootState)=>state.user.userData)
  const open = useSelector((state:RootState)=>state.modal.open)
  const type = useSelector((state:RootState)=>state.modal.type)
  const isModalOpen = open && type === 'CreatePost';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
          <form onSubmit={onSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <Textarea placeholder="What's in your mind..." onChange={(e)=>{setCaption(e.target.value)}}/>
              </div>
              <div className="col-span-6">
                <Input  type="file" accept="image/*" id="upload" className="mt-1 w-full rounded-md"/>
              </div>
            <DialogFooter>
              <Button 
                disabled={loading}
                type="submit"
              >
                {loading ? <Loader2 className="animate-spin"/>: 'Submit'}
              </Button>
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  )
}
