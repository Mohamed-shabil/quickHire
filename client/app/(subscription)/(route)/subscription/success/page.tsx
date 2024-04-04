import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import React from "react";

const SubscriptionSuccess = () => {
  return (
    <main className="w-full h-[90vh] flex item-center justify-center ">
      <Alert className="w-[450px] h-auto">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </main>
  );
};

export default SubscriptionSuccess;
