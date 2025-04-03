import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { api } from '@/lib/api';
import { calculateTokenCost, truncateText } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

interface ScriptCardProps {
  script: {
    id: string;
    name: string;
    description: string;
    tokenCost: number;
    category: string;
    version: string;
  };
}

export function ScriptCard({ script }: ScriptCardProps) {
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleExecute = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.subscription.tokensRemaining < script.tokenCost) {
      setError('Insufficient tokens');
      return;
    }

    setIsExecuting(true);
    setError(null);

    try {
      const response = await api.executeScript(script.id);
      if (response.error) {
        setError(response.error);
      } else {
        router.push(`/executions/${response.data.id}`);
      }
    } catch (err) {
      setError('Failed to execute script');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{script.name}</CardTitle>
        <CardDescription>
          {truncateText(script.description, 100)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">{script.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Version:</span>
            <span className="font-medium">{script.version}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Token Cost:</span>
            <span className="font-medium">{calculateTokenCost(script.tokenCost)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          onClick={handleExecute}
          disabled={isExecuting || (user?.subscription.tokensRemaining ?? 0) < script.tokenCost}
          className="w-full"
        >
          {isExecuting ? 'Executing...' : 'Execute Script'}
        </Button>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {user && (
          <p className="text-sm text-muted-foreground">
            Tokens remaining: {calculateTokenCost(user.subscription.tokensRemaining)}
          </p>
        )}
      </CardFooter>
    </Card>
  );
} 