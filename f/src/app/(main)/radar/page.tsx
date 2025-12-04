"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import Link from "next/link";
import { runInnovationRadar } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Radar, Bell, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Radar className="mr-2 h-4 w-4" />
      )}
      Set Alert
    </Button>
  );
}

export default function RadarPage() {
  const initialState = { message: null, data: null, error: null };
  const [state, dispatch] = useFormState(runInnovationRadar, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to set alert. Please check your inputs.",
      });
    }
  }, [state.error, toast]);

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Competitive Innovation Radar</CardTitle>
            <CardDescription>
              Get notified of competitor filings related to specific molecules.
            </CardDescription>
          </CardHeader>
          <form action={dispatch}>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="moleculeName">Molecule</Label>
                  <Input id="moleculeName" name="moleculeName" placeholder="e.g., Ozempic" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="competitorName">Competitor</Label>
                  <Input id="competitorName" name="competitorName" placeholder="e.g., PharmaCorp" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="filingType">Filing Type</Label>
                  <Select name="filingType" defaultValue="trial">
                    <SelectTrigger id="filingType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trial">Clinical Trial</SelectItem>
                      <SelectItem value="patent">Patent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle className="font-headline">Recent Alerts</CardTitle>
            <CardDescription>
              Newly detected competitor activity will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
            {pending ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
              </div>
            ) : state.data ? (
                <Alert>
                    <Bell className="h-4 w-4" />
                    <AlertTitle className="font-headline flex items-center justify-between">
                        New Filing Detected!
                        {state.data.filingLink && (
                           <Button variant="ghost" size="sm" asChild>
                               <Link href={state.data.filingLink} target="_blank">
                                    View Filing
                                   <ExternalLink className="h-3 w-3 ml-2" />
                               </Link>
                           </Button> 
                        )}
                    </AlertTitle>
                    <AlertDescription>
                        {state.data.alertMessage}
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="text-center text-muted-foreground py-12">
                    <p>Alerts about competitor activity will be displayed here.</p>
                </div>
            )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
