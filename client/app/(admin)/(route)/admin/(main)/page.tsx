import DashCard from "@/components/Admin/DashCard";
import InfluencerList from "@/components/Admin/InfluencerList";
import TransactionList from "@/components/Admin/TransactionList";
export default function page() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <DashCard />
                    <DashCard />
                    <DashCard />
                    <DashCard />
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <TransactionList />
                    <InfluencerList />
                </div>
            </main>
        </div>
    );
}
