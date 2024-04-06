import React from "react";

const DashboardLayout = ({
    children,
    dashboardCards,
    influencersList,
    transactionList,
}: {
    children: React.ReactNode;
    dashboardCards: React.ReactNode;
    influencersList: React.ReactNode;
    transactionList: React.ReactNode;
}) => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    {dashboardCards}
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    {transactionList}
                    {influencersList}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
