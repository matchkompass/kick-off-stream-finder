# Football Streaming Optimizer - API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Libraries](#core-libraries)
3. [React Hooks](#react-hooks)
4. [UI Components](#ui-components)
5. [Page Components](#page-components)
6. [Utility Functions](#utility-functions)
7. [Database Integration](#database-integration)
8. [Data Types](#data-types)
9. [Usage Examples](#usage-examples)

## Overview

This is a React TypeScript application that helps users optimize their football streaming subscriptions. It analyzes user preferences for clubs, leagues, and features to recommend the most cost-effective streaming service combinations.

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui (Radix UI components)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State Management**: TanStack Query
- **Routing**: React Router DOM

## Core Libraries

### StreamingOptimizer

The main optimization algorithm that calculates optimal streaming service combinations.

```typescript
import { StreamingOptimizer } from '@/lib/StreamingOptimizer';
```

#### Constructor

```typescript
constructor(supabase: SupabaseClient<Database>)
```

**Parameters:**
- `supabase`: Supabase client instance for database operations

#### Methods

##### `optimizeForClubs(request: OptimizationRequest): Promise<OptimizationResult[]>`

Finds optimal streaming provider combinations for selected clubs.

**Parameters:**
```typescript
interface OptimizationRequest {
  clubIds: number[];        // Array of selected club IDs
  targetCoverage: number;   // Minimum coverage percentage (0-100)
  maxProviders?: number;    // Maximum number of providers (optional, default: 4)
}
```

**Returns:**
```typescript
interface OptimizationResult {
  providers: StreamingProvider[];  // Recommended providers
  totalCost: number;              // Monthly cost in euros
  coveragePercentage: number;     // Percentage of leagues covered
  coveredLeagues: number;         // Number of leagues covered
  totalLeagues: number;           // Total number of required leagues
  savings?: number;               // Potential savings (optional)
}
```

**Example:**
```typescript
const optimizer = new StreamingOptimizer(supabase);
const results = await optimizer.optimizeForClubs({
  clubIds: [1, 2, 3],
  targetCoverage: 90,
  maxProviders: 3
});
```

##### `clearCache(): void`

Clears the internal optimization cache. Call this when streaming prices or coverage data changes.

## React Hooks

### useStreamingOptimizer

A React hook that provides streaming optimization functionality with state management.

```typescript
import { useStreamingOptimizer } from '@/hooks/useStreamingOptimizer';
```

#### Usage

```typescript
const {
  optimize,
  results,
  loading,
  error,
  clearResults
} = useStreamingOptimizer();
```

#### API

- **`optimize(clubIds: number[], targetCoverages?: number[]): Promise<void>`**
  - Triggers optimization for selected clubs
  - `clubIds`: Array of club IDs to optimize for
  - `targetCoverages`: Optional array of coverage targets (default: [100, 90, 66])

- **`results: OptimizationResult[]`**
  - Array of optimization results for different coverage levels

- **`loading: boolean`**
  - True when optimization is in progress

- **`error: string | null`**
  - Error message if optimization fails

- **`clearResults(): void`**
  - Clears current results and error state

#### Example

```typescript
const MyComponent = () => {
  const { optimize, results, loading, error } = useStreamingOptimizer();
  
  const handleOptimize = () => {
    optimize([1, 2, 3]); // Optimize for clubs with IDs 1, 2, 3
  };
  
  return (
    <div>
      <button onClick={handleOptimize} disabled={loading}>
        {loading ? 'Optimizing...' : 'Find Best Deals'}
      </button>
      {results.map((result, index) => (
        <div key={index}>
          <p>Coverage: {result.coveragePercentage}%</p>
          <p>Cost: €{result.totalCost}/month</p>
        </div>
      ))}
    </div>
  );
};
```

### useClubSelection

Manages club selection and filtering functionality.

```typescript
import { useClubSelection } from '@/hooks/useClubSelection';
```

#### Usage

```typescript
const {
  clubs,
  selectedClubs,
  loading,
  searchTerm,
  setSearchTerm,
  toggleClub,
  clearSelection,
  getSelectedClubNames,
  leagueFilter,
  setLeagueFilter,
  availableLeagues
} = useClubSelection();
```

#### API

- **`clubs: Club[]`** - Filtered list of clubs
- **`selectedClubs: number[]`** - Array of selected club IDs
- **`loading: boolean`** - Loading state for club data
- **`searchTerm: string`** - Current search term
- **`setSearchTerm(term: string): void`** - Update search term
- **`toggleClub(clubId: number): void`** - Toggle club selection
- **`clearSelection(): void`** - Clear all selected clubs
- **`getSelectedClubNames(): string[]`** - Get names of selected clubs
- **`leagueFilter: string`** - Current league filter
- **`setLeagueFilter(league: string): void`** - Set league filter
- **`availableLeagues: string[]`** - List of available leagues

### useClubs

Fetches club data from the database.

```typescript
import { useClubs, useClub } from '@/hooks/useClubs';
```

#### Usage

```typescript
// Get all clubs
const { data: clubs, isLoading, error } = useClubs();

// Get single club by slug
const { data: club, isLoading, error } = useClub('bayern-munich');
```

### useLeagues

Fetches league data from the database.

```typescript
import { useLeagues } from '@/hooks/useLeagues';
```

#### Usage

```typescript
const { data: leagues, isLoading, error } = useLeagues();
```

### useStreamingProviders

Fetches streaming provider data from the database.

```typescript
import { useStreamingProviders } from '@/hooks/useStreamingProviders';
```

#### Usage

```typescript
const { data: providers, isLoading, error } = useStreamingProviders();
```

### useToast

Provides toast notification functionality.

```typescript
import { useToast } from '@/hooks/use-toast';
```

#### Usage

```typescript
const { toast, dismiss } = useToast();

// Show success toast
toast({
  title: "Success!",
  description: "Your optimization is complete.",
  variant: "default"
});

// Show error toast
toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive"
});
```

### useMobile

Detects if the current device is mobile.

```typescript
import { useIsMobile } from '@/hooks/use-mobile';
```

#### Usage

```typescript
const isMobile = useIsMobile();
```

## UI Components

### Core Components

#### Button

A customizable button component with multiple variants and sizes.

```typescript
import { Button } from '@/components/ui/button';
```

**Props:**
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  // Standard button HTML attributes
}
```

**Example:**
```tsx
<Button variant="outline" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

#### Card

A container component for grouping related content.

```typescript
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
```

**Example:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Optimization Results</CardTitle>
    <CardDescription>Best streaming deals for your clubs</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your optimized selection...</p>
  </CardContent>
</Card>
```

#### Input

A text input component with various styling options.

```typescript
import { Input } from '@/components/ui/input';
```

**Example:**
```tsx
<Input
  placeholder="Search clubs..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

#### Checkbox

A checkbox component for binary selections.

```typescript
import { Checkbox } from '@/components/ui/checkbox';
```

**Example:**
```tsx
<Checkbox
  id="feature1"
  checked={selectedFeatures.includes('feature1')}
  onCheckedChange={(checked) => toggleFeature('feature1', checked)}
/>
```

#### Badge

A small label component for displaying tags or statuses.

```typescript
import { Badge } from '@/components/ui/badge';
```

**Example:**
```tsx
<Badge variant="secondary">Bundesliga</Badge>
```

#### Progress

A progress bar component.

```typescript
import { Progress } from '@/components/ui/progress';
```

**Example:**
```tsx
<Progress value={75} className="h-2" />
```

### Form Components

#### Label

A label component that pairs with form inputs.

```typescript
import { Label } from '@/components/ui/label';
```

#### Select

A dropdown select component.

```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
```

#### Textarea

A multi-line text input component.

```typescript
import { Textarea } from '@/components/ui/textarea';
```

### Navigation Components

#### Navigation Menu

A navigation menu component for site navigation.

```typescript
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem } from '@/components/ui/navigation-menu';
```

#### Breadcrumb

A breadcrumb navigation component.

```typescript
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
```

### Feedback Components

#### Toast

Toast notification components.

```typescript
import { Toast, ToastAction } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
```

#### Alert Dialog

Modal dialog for important confirmations.

```typescript
import { AlertDialog, AlertDialogAction, AlertDialogContent } from '@/components/ui/alert-dialog';
```

#### Dialog

General purpose dialog/modal component.

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
```

### Data Display Components

#### Table

Table components for displaying tabular data.

```typescript
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
```

#### Avatar

Avatar component for displaying user photos or initials.

```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
```

#### Skeleton

Loading skeleton components.

```typescript
import { Skeleton } from '@/components/ui/skeleton';
```

## Page Components

### StreamingWizard

The main wizard component that guides users through the optimization process.

```typescript
import { StreamingWizard } from '@/components/StreamingWizard';
```

**Props:**
```typescript
interface StreamingWizardProps {
  embedded?: boolean; // Whether the wizard is embedded in another component
}
```

**Features:**
- **Step 1**: Club selection with search and filtering
- **Step 2**: League selection and customization
- **Step 3**: Feature preferences (4K, multi-device, etc.)
- **Step 4**: Current streaming service selection
- **Step 5**: Optimization results and recommendations

**Example:**
```tsx
<StreamingWizard embedded={false} />
```

### SavingsCalculator

A component that calculates potential savings from current streaming subscriptions.

```typescript
import { SavingsCalculator } from '@/components/SavingsCalculator';
```

**Props:**
```typescript
interface SavingsCalculatorProps {
  embedded?: boolean; // Whether the calculator is embedded
}
```

**Features:**
- Current subscription cost calculation
- Desired coverage selection (50-100%)
- Optimization recommendations
- Savings visualization

**Example:**
```tsx
<SavingsCalculator embedded={true} />
```

### ProviderComparison

A comprehensive comparison table of streaming providers.

```typescript
import { ProviderComparison } from '@/components/ProviderComparison';
```

**Features:**
- Side-by-side provider comparison
- Feature matrix
- Price comparison
- Coverage analysis

### HomePage

The main landing page component.

```typescript
import { HomePage } from '@/components/HomePage';
```

**Features:**
- Hero section with call-to-action
- Feature highlights
- Provider overview
- Testimonials section

### NewsSection

A component displaying football streaming news and deals.

```typescript
import { NewsSection } from '@/components/NewsSection';
```

**Features:**
- Latest streaming deals
- Football streaming news
- Provider announcements

## Utility Functions

### Data Transformers

Functions for transforming database data to component-friendly formats.

```typescript
import { transformClubData, transformLeagueData, transformStreamingData } from '@/utils/dataTransformers';
```

#### `transformClubData(club: any): TransformedClub`

Transforms raw club data from the database.

**Example:**
```typescript
const transformedClub = transformClubData(rawClub);
// Returns: { id, name, logo, league, competitions, colors, etc. }
```

#### `transformLeagueData(league: any): TransformedLeague`

Transforms raw league data from the database.

#### `transformStreamingData(provider: any): TransformedProvider`

Transforms raw streaming provider data from the database.

### Utility Functions

```typescript
import { cn } from '@/lib/utils';
```

#### `cn(...inputs: ClassValue[]): string`

Combines and merges CSS classes using `clsx` and `tailwind-merge`.

**Example:**
```typescript
const className = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

## Database Integration

### Supabase Client

```typescript
import { supabase } from '@/integrations/supabase/client';
```

The application uses Supabase as its backend database. The client is pre-configured and ready to use.

### Database Schema

The application uses three main tables:

#### Clubs Table

```typescript
interface Club {
  id: number;
  name: string;
  country: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  slug?: string;
  bundesliga?: boolean;
  premier_league?: boolean;
  la_liga?: boolean;
  champions_league?: boolean;
  europa_league?: boolean;
  conference_league?: boolean;
  // ... other league flags
  popularity_score?: number;
  founded_year?: number;
  stadium_name?: string;
  stadium_capacity?: number;
  website_url?: string;
  // ... social media URLs
}
```

#### Leagues Table

```typescript
interface League {
  league_id: number;
  league: string;
  league_slug?: string;
  'country code'?: string;
  'number of games'?: number;
}
```

#### Streaming Table

```typescript
interface StreamingProvider {
  streamer_id: number;
  provider_name: string;
  name?: string;
  monthly_price: string;
  yearly_price?: string;
  logo_url?: string;
  slug?: string;
  affiliate_url?: string;
  features?: Json;
  // League coverage percentages
  bundesliga?: number;
  premier_league?: number;
  la_liga?: number;
  champions_league?: number;
  europa_league?: number;
  conference_league?: number;
  // ... other leagues
}
```

## Data Types

### Core Types

```typescript
// Club data type
interface Club {
  club_id: number;
  name: string;
  country: string;
  logo_url?: string;
  league_id: number;
  league_name: string;
  popularity_score: number;
}

// League data type
interface League {
  id: number;
  name: string;
}

// Streaming provider type
interface StreamingProvider {
  streamer_id: number;
  provider_name: string;
  monthly_price: string;
  covered_league_ids: number[];
}

// Optimization request
interface OptimizationRequest {
  clubIds: number[];
  targetCoverage: number;
  maxProviders?: number;
}

// Optimization result
interface OptimizationResult {
  providers: StreamingProvider[];
  totalCost: number;
  coveragePercentage: number;
  coveredLeagues: number;
  totalLeagues: number;
  savings?: number;
}
```

### Database Types

The application includes comprehensive TypeScript types for the Supabase database schema. These are automatically generated and available at:

```typescript
import type { Database } from '@/integrations/supabase/types';
```

## Usage Examples

### Basic Optimization Workflow

```typescript
import { useStreamingOptimizer, useClubSelection } from '@/hooks';

const OptimizationExample = () => {
  const { selectedClubs, toggleClub } = useClubSelection();
  const { optimize, results, loading } = useStreamingOptimizer();

  const handleOptimize = async () => {
    if (selectedClubs.length > 0) {
      await optimize(selectedClubs);
    }
  };

  return (
    <div>
      {/* Club selection UI */}
      <button onClick={() => toggleClub(1)}>
        Select Bayern Munich
      </button>
      
      {/* Optimization trigger */}
      <button onClick={handleOptimize} disabled={loading}>
        Find Best Deals
      </button>
      
      {/* Results display */}
      {results.map((result, index) => (
        <div key={index}>
          <h3>{result.coveragePercentage}% Coverage</h3>
          <p>Monthly Cost: €{result.totalCost}</p>
          <p>Providers: {result.providers.map(p => p.provider_name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
};
```

### Custom Provider Comparison

```typescript
import { useStreamingProviders } from '@/hooks';
import { transformStreamingData } from '@/utils/dataTransformers';

const ProviderComparisonExample = () => {
  const { data: providers, isLoading } = useStreamingProviders();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {providers?.map(provider => {
        const transformed = transformStreamingData(provider);
        return (
          <div key={transformed.slug}>
            <h3>{transformed.name}</h3>
            <p>Price: €{transformed.monthlyPrice}/month</p>
            <p>Features: {Object.keys(transformed.features).join(', ')}</p>
          </div>
        );
      })}
    </div>
  );
};
```

### Integration with Forms

```typescript
import { useForm } from 'react-hook-form';
import { Button, Input, Card } from '@/components/ui';

const PreferencesForm = () => {
  const { register, handleSubmit } = useForm();
  const { optimize } = useStreamingOptimizer();

  const onSubmit = (data: any) => {
    optimize(data.clubIds, [data.targetCoverage]);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('targetCoverage')}
          type="number"
          placeholder="Target Coverage %"
        />
        <Button type="submit">
          Optimize
        </Button>
      </form>
    </Card>
  );
};
```

---

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Environment Variables

Create a `.env.local` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

This documentation covers all the public APIs, components, and functionality available in the Football Streaming Optimizer application. For additional support or feature requests, please refer to the project repository.