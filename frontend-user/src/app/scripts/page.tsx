import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  SearchIcon, 
  FilterIcon, 
  PlayIcon, 
  CodeIcon, 
  ClockIcon, 
  StarIcon,
  InfoIcon
} from 'lucide-react';
import Link from 'next/link';

// Mock data for scripts
const scripts = [
  {
    id: '1',
    name: 'Data Backup',
    description: 'Automated backup script for database and files',
    language: 'Python',
    category: 'Backup',
    executionTime: '2m 30s',
    popularity: 4.8,
  },
  {
    id: '2',
    name: 'Email Campaign',
    description: 'Send personalized emails to a list of subscribers',
    language: 'JavaScript',
    category: 'Marketing',
    executionTime: '1m 15s',
    popularity: 4.5,
  },
  {
    id: '3',
    name: 'System Monitor',
    description: 'Monitor system resources and send alerts',
    language: 'Shell',
    category: 'Monitoring',
    executionTime: '5m',
    popularity: 4.9,
  },
  {
    id: '4',
    name: 'File Organizer',
    description: 'Organize files by type and date',
    language: 'Python',
    category: 'Utility',
    executionTime: '1m',
    popularity: 4.2,
  },
  {
    id: '5',
    name: 'API Integration',
    description: 'Connect to external APIs and process data',
    language: 'JavaScript',
    category: 'Integration',
    executionTime: '3m 45s',
    popularity: 4.7,
  },
  {
    id: '6',
    name: 'Database Cleanup',
    description: 'Clean up old records and optimize database',
    language: 'SQL',
    category: 'Database',
    executionTime: '4m 20s',
    popularity: 4.6,
  },
];

export default function ScriptsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredScripts = scripts.filter(script => 
    script.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    script.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Available Scripts</h1>
          <p className="text-muted-foreground">
            Browse and execute automation scripts
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search scripts..."
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredScripts.map((script) => (
          <Card key={script.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{script.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{script.description}</p>
                </div>
                <div className="flex items-center text-yellow-500">
                  <StarIcon className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{script.popularity}</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  <CodeIcon className="mr-1 h-3 w-3" />
                  {script.language}
                </span>
                <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {script.category}
                </span>
                <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  <ClockIcon className="mr-1 h-3 w-3" />
                  {script.executionTime}
                </span>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Link href={`/scripts/${script.id}`}>
                  <Button variant="outline" size="sm" className="mr-2">
                    <InfoIcon className="mr-1 h-4 w-4" />
                    Details
                  </Button>
                </Link>
                <Button size="sm" className="flex items-center">
                  <PlayIcon className="mr-1 h-4 w-4" />
                  Execute
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 