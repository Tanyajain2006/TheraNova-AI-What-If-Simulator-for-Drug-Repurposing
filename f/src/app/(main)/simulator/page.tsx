"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { runMoleculeSimulator } from "@/lib/actions";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="mr-2 h-4 w-4" />
      )}
      Generate Case
    </Button>
  );
}

export default function SimulatorPage() {
  const initialState = { message: null, data: null, error: null };
  const [state, dispatch] = useFormState(runMoleculeSimulator, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate innovation case. Please check your inputs.",
      });
    }
  }, [state.error, toast]);

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Molecule "What-If" Simulator</CardTitle>
            <CardDescription>
              Enter a molecule and a disease to generate a hypothetical
              innovation case.
            </CardDescription>
          </CardHeader>
          <form action={dispatch}>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="molecule">Molecule</Label>
                  <Input id="molecule" name="molecule" placeholder="e.g., Sildenafil" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="disease">Disease</Label>
                  <Input id="disease" name="disease" placeholder="e.g., Alzheimer's Disease" />
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
            <CardTitle className="font-headline">Innovation Case</CardTitle>
            <CardDescription>
              The generated report will appear below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pending ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-12 w-full" />
                </div>
            ) : state.data ? (
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground">
                {state.data.innovationCase.split('\n\n').map((paragraph, index) => {
                    const parts = paragraph.split('**');
                    return (
                        <div key={index} className="mb-4">
                            <h3 className="font-bold text-md text-primary font-headline">{parts[1]}</h3>
                            <p>{parts[2]?.trim()}</p>
                        </div>
                    );
                })}
              </div>
            ) : (
                <div className="text-center text-muted-foreground py-12">
                    <p>Your generated report will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
