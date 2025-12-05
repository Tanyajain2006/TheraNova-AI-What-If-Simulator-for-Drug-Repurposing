"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { runRepurposeBot } from "@/lib/actions";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Bot } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Bot className="mr-2 h-4 w-4" />
      )}
      Analyze Sources
    </Button>
  );
}

const dataSources = [
    { id: 'forums', label: 'Anonymized Patient Forums' },
    { id: 'guidelines', label: 'Guideline Updates' },
    { id: 'studies', label: 'Observational Studies' },
    { id: 'social', label: 'Social Media Analysis' }
]

export default function RepurposeBotPage() {
  const initialState = { message: null, data: null, error: null };
  const [state, dispatch] = useFormState(runRepurposeBot, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze sources. Please check your inputs.",
      });
    }
  }, [state.error, toast]);

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Patient-First RepurposeBot</CardTitle>
            <CardDescription>
              Surface hidden off-label signals by analyzing real-world evidence sources.
            </CardDescription>
          </CardHeader>
          <form action={dispatch}>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="moleculeName">Molecule Name</Label>
                  <Input id="moleculeName" name="moleculeName" placeholder="e.g., Metformin" />
                </div>
                <div className="grid gap-2">
                    <Label>Data Sources</Label>
                    <div className="space-y-2">
                        {dataSources.map(source => (
                             <div key={source.id} className="flex items-center space-x-2">
                                <Checkbox id={source.id} defaultChecked={['forums', 'guidelines', 'studies'].includes(source.id)} />
                                <label htmlFor={source.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {source.label}
                                </label>
                            </div>
                        ))}
                    </div>
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
            <CardTitle className="font-headline">Discovered Off-Label Signals</CardTitle>
            <CardDescription>
              Potential new uses based on data analysis will appear below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pending ? (
              <div className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
              </div>
            ) : state.data ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead>Evidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.data.offLabelSignals.map((signal, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{signal.source}</TableCell>
                      <TableCell>{signal.signal}</TableCell>
                      <TableCell className="text-muted-foreground">{signal.evidence}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
                <div className="text-center text-muted-foreground py-12">
                    <p>Analysis results will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
