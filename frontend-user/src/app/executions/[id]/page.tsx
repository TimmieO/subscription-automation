import * as React from 'react';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { formatDateTime } from '@/lib/utils';

interface ExecutionPageProps {
  params: {
    id: string;
  };
}

export default function ExecutionPage({ params }: ExecutionPageProps) {
  const [execution, setExecution] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadExecution();
  }, [params.id]);

  const loadExecution = async () => {
    try {
      const response = await api.getExecutionLog(params.id);
      if (response.error) {
        setError(response.error);
      } else {
        setExecution(response.data);
      }
    } catch (err) {
      setError('Failed to load execution details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !execution) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <p className="text-destructive">{error || 'Execution not found'}</p>
        <Button onClick={loadExecution}>Retry</Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'text-green-500';
      case 'FAILED':
        return 'text-red-500';
      case 'PENDING':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{execution.scriptName}</span>
            <span className={getStatusColor(execution.status)}>
              {execution.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Start Time</p>
              <p className="font-medium">
                {formatDateTime(execution.startTime)}
              </p>
            </div>
            {execution.endTime && (
              <div>
                <p className="text-sm text-muted-foreground">End Time</p>
                <p className="font-medium">
                  {formatDateTime(execution.endTime)}
                </p>
              </div>
            )}
          </div>

          {execution.errorMessage && (
            <div>
              <p className="text-sm text-muted-foreground">Error Message</p>
              <p className="mt-1 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {execution.errorMessage}
              </p>
            </div>
          )}

          {execution.output && (
            <div>
              <p className="text-sm text-muted-foreground">Output</p>
              <pre className="mt-1 rounded-md bg-muted p-3 text-sm">
                {execution.output}
              </pre>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 