import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { axiosInstance } from "@/axios/axios";
import { toast } from "../ui/use-toast";
import { Check, Loader2, Router, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducers";
import { setClose } from "@/store/slices/modalSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { updateProfileImage } from "@/services/api/profile.service";

export function AvatarModal() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        const selectedImage = document.getElementById(
            "upload"
        ) as HTMLInputElement;
        const image = selectedImage.files?.[0];
        if (image) {
            data.append("profile", image);
        }
        setLoading(true);

        try {
            const response = await updateProfileImage(data);
            toast({
                title: "Profile Avatar Updated Successfully",
                action: (
                    <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded">
                        <Check />
                    </div>
                ),
            });
            onClose();
            router.refresh();
        } catch (error: any) {
            toast({
                title: "Something went wrong",
                ...(error.response.errors[0].message && {
                    description: error.response.errors[0].message,
                }),
                action: (
                    <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded">
                        <X />
                    </div>
                ),
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setPreview(url);
        }
    };

    const onClose = () => {
        dispatch(setClose());
    };

    const user = useSelector((state: RootState) => state.user.userData);
    const open = useSelector((state: RootState) => state.modal.open);
    const type = useSelector((state: RootState) => state.modal.type);
    const isModalOpen = open && type === "ProfileAvatar";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>About Section</DialogTitle>
                    <DialogDescription>
                        {
                            "Make changes to your profile here. Click save when you're done."
                        }
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={onSubmit}
                    className="mt-8 grid grid-cols-6 gap-6"
                >
                    <div className="col-span-6 flex justify-center">
                        <Label
                            htmlFor="upload"
                            className="cursor-pointer rounded-full border-blue-600 border-2"
                        >
                            <Image
                                src={preview ? preview : "/user.png"}
                                alt={"Profile"}
                                width={100}
                                height={100}
                                className="w-24 h-24 object-cover rounded-full"
                            />
                            <input
                                type="file"
                                name="profile"
                                id="upload"
                                className="hidden"
                                onChange={(e) => {
                                    handlePreview(e);
                                }}
                            />
                        </Label>
                    </div>
                    <DialogFooter>
                        <Button disabled={!preview || loading} type="submit">
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Upload"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
