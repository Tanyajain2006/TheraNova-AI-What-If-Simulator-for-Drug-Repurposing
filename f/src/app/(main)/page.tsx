import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  FlaskConical,
  Radar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const features = [
    {
      title: "Molecule \"What-If\" Simulator",
      description: "Instantly generate a hypothetical innovation case for a molecule and disease pair.",
      link: "/simulator",
      icon: <FlaskConical className="w-8 h-8 text-primary" />,
      image: PlaceHolderImages.find(img => img.id === "simulator")
    },
    {
      title: "Patient-First RepurposeBot",
      description: "Surface hidden off-label signals from real-world evidence like patient forums.",
      link: "/repurpose-bot",
      icon: <Bot className="w-8 h-8 text-primary" />,
      image: PlaceHolderImages.find(img => img.id === "repurpose-bot")
    },
    {
      title: "Competitive Innovation Radar",
      description: "Get real-time alerts on competitor filings, trials, and research in your space.",
      link: "/radar",
      icon: <Radar className="w-8 h-8 text-primary" />,
      image: PlaceHolderImages.find(img => img.id === "radar")
    },
  ];

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Welcome to Repurpose AI
        </h1>
        <p className="text-muted-foreground">
          Your intelligent partner in drug repurposing. Here’s how you can get started.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            {feature.image && (
              <div className="overflow-hidden">
                <Image
                  src={feature.image.imageUrl}
                  alt={feature.image.description}
                  width={600}
                  height={400}
                  data-ai-hint={feature.image.imageHint}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardHeader className="flex-grow">
              <div className="flex items-start gap-4">
                {feature.icon}
                <div className="flex flex-col">
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  <CardDescription className="mt-1">{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-accent hover:bg-accent/90">
                <Link href={feature.link}>
                  Launch Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Activity</CardTitle>
          <CardDescription>An overview of recent analyses and alerts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-12">
            <p>No recent activity to display.</p>
            <p className="text-sm">Your simulations and alerts will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
