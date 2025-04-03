import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  SearchIcon, 
  FilterIcon, 
  PlayIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  ExternalLinkIcon
} from 'lucide-react';
import Link from 'next/link';

// Mock data for executions
const executions = [
  {
    id: '1',
    scriptId: '1',
    scriptName: 'Data Backup',
    status: 'success',
    startedAt: '2024-03-20 10:30:00',
    endedAt: '2024-03-20 10:32:15',
    duration: '2m 15s',
    triggeredBy: 'Scheduled',
  },
  {
    id: '2',
    scriptId: '1',
    scriptName: 'Data Backup',
    status: 'failed',
    startedAt: '2024-03-19 15:45:00',
    endedAt: '2024-03-19 15:46:30',
    duration: '1m 30s',
    triggeredBy: 'Manual',
    error: 'Invalid backup path',
  },
  {
    id: '3',
    scriptId: '2',
    scriptName: 'Email Campaign',
    status: 'success',
    startedAt: '2024-03-18 09:15:00',
    endedAt: '2024-03-18 09:16:15',
    duration: '1m 15s',
    triggeredBy: 'Manual',
  },
  {
    id: '4',
    scriptId: '3',
    scriptName: 'System Monitor',
    status: 'running',
    startedAt: '2024-03-20 11:00:00',
    endedAt: null,
    duration: '5m 30s',
    triggeredBy: 'Scheduled',
  },
  {
    id: '5',
    scriptId: '4',
    scriptName: 'File Organizer',
    status: 'success',
    startedAt: '2024-03-17 14:20:00',
    endedAt: '2024-03-17 14:21:00',
    duration: '1m',
    triggeredBy: 'Manual',
  },
  {
    id: '6',
    scriptId: '5',
    scriptName: 'API Integration',
    status: 'success',
    startedAt: '2024-03-16 16:10:00',
    endedAt: '2024-03-16 16:13:45',
    duration: '3m 45s',
    triggeredBy: 'Scheduled',
  },
];

export default function ExecutionsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredExecutions = executions.filter(execution => 
    execution.scriptName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    execution.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    execution.triggeredBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'running':
        return <AlertCircleIcon className="h-5 w-5 text-blue-500 animate-pulse" />;
      default:
        return <AlertCircleIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Execution History</h1>
        <p className="text-muted-foreground">
          View and manage your script executions
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search executions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Script</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Started</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Triggered By</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredExecutions.map((execution) => (
                <tr key={execution.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{execution.scriptName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {getStatusIcon(execution.status)}
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusClass(execution.status)}`}>
                        {execution.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{execution.startedAt}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <ClockIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                      {execution.duration}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{execution.triggeredBy}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/scripts/${execution.scriptId}`}>
                        <Button variant="outline" size="sm">
                          <ExternalLinkIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button size="sm" className="flex items-center">
                        <PlayIcon className="mr-1 h-4 w-4" />
                        Run Again
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 