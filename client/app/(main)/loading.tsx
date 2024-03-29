import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full flex flex-col items-center justify-center my-3">
            <span className="w-full max-w-lg block rounded-lg p-3 shadow-sm border">
                <div className="flex h-full itmes-center gap-2 mb-2">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex flex-col pt-1">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                    </div>
                </div>
                <Skeleton className='w-full h-[400px]'/>
                <div className="mt-2">
                    <Skeleton className='h-4 w-96'/>
                    <Skeleton className='h-4 w-28 mt-1'/>
                    <div className="mt-3 flex items-center justify-around w-full gap-8 text-xs">
                        <Skeleton className='h-10 w-24'/>
                        <Skeleton className='h-10 w-24'/>
                        <Skeleton className='h-10 w-24'/>
                    </div>
                </div>
            </span>
        </div>
    )
}