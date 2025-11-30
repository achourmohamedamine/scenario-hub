import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScenarioCard } from "@/components/ScenarioCard";
import { PlayCircle, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScenarioResult {
  name: string;
  source: "Solar" | "Battery" | "Steg";
  solarUsed: number;
  batteryUsed: number;
  stegUsed: number;
  finalBatteryLevel: number;
  solarPercent: number;
  batteryPercent: number;
  stegPercent: number;
}

const Scenarios = () => {
  const [scenarios, setScenarios] = useState<ScenarioResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const runScenarios = async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/run-scenarios");
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setScenarios(data);
      
      toast({
        title: "Scenarios completed",
        description: `Successfully ran ${data.length} scenario(s)`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to run scenarios";
      setError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Mock data for demonstration when API is not available
      const mockScenarios: ScenarioResult[] = [
        {
          name: "Optimal Solar Priority",
          source: "Solar",
          solarUsed: 45.2,
          batteryUsed: 12.8,
          stegUsed: 8.5,
          finalBatteryLevel: 78,
          solarPercent: 68,
          batteryPercent: 19,
          stegPercent: 13,
        },
        {
          name: "Battery Backup Mode",
          source: "Battery",
          solarUsed: 32.1,
          batteryUsed: 28.4,
          stegUsed: 15.2,
          finalBatteryLevel: 52,
          solarPercent: 42,
          batteryPercent: 38,
          stegPercent: 20,
        },
        {
          name: "Grid Peak Hours",
          source: "Steg",
          solarUsed: 15.8,
          batteryUsed: 8.3,
          stegUsed: 38.9,
          finalBatteryLevel: 65,
          solarPercent: 25,
          batteryPercent: 13,
          stegPercent: 62,
        },
      ];
      
      setScenarios(mockScenarios);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Energy Scenarios</h1>
            <p className="text-muted-foreground mt-1">
              Run and analyze different energy consumption scenarios
            </p>
          </div>
          <Button
            onClick={runScenarios}
            disabled={loading}
            size="lg"
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <PlayCircle className="h-5 w-5" />
                Run Scenarios
              </>
            )}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">
              {error} - Showing mock data for demonstration
            </p>
          </div>
        )}

        {/* Results Container */}
        <div className="rounded-lg border bg-card p-6 min-h-[500px]">
          {scenarios.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <PlayCircle className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No scenarios run yet</h3>
              <p className="text-muted-foreground max-w-md">
                Click the "Run Scenarios" button above to analyze different energy consumption
                patterns and optimize your energy usage.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario, index) => (
                <ScenarioCard key={index} scenario={scenario} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
