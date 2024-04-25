import Link from "next/link";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full container">
            <div>
                <h2 className="font-semibold text-2xl mt-4">Reports</h2>
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">{children}</div>
            </div>
        </main>
    );
};

export default AdminLayout;
