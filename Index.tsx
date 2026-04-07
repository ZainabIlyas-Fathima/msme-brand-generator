import { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Bot } from 'lucide-react';
import { generateNames, generateTaglines, generateLogoConcept } from '@/lib/nameGenerator';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const industries = ['Food & Beverage', 'Retail', 'Agriculture', 'Technology', 'Services', 'Education', 'Tourism', 'Beauty', 'Manufacturing'];
const audiences = ['Local community', 'Youth', 'Families', 'Professionals', 'Tourists', 'Online customers'];

interface Results {
  names: string[];
  taglines: string[];
  logoConcept: string;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

const Index = () => {
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const canGenerate = idea.trim() && industry && audience;

  const generate = () => {
    if (!canGenerate) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults({
        names: generateNames(idea, industry, audience),
        taglines: generateTaglines(idea, industry, audience),
        logoConcept: generateLogoConcept(industry, audience),
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Activity</span>
          <span className="text-border">|</span>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <span className="text-muted-foreground text-xs">Sandbox 01</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">AI Branding Task</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground gap-1">
          <Bot className="w-3 h-3" /> AI Engine: GPT-4o
        </Badge>
      </header>

      {/* Task bar */}
      <div className="px-6 py-2.5 border-b border-border bg-muted/30">
        <p className="text-xs text-muted-foreground">
          Task: Generate a business name and logo concept. Complete the branding simulation.
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left panel - Inputs */}
        <aside className="w-full md:w-80 lg:w-96 border-r border-border p-6 flex flex-col gap-5 shrink-0">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parameters</h2>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Business Idea</label>
            <input
              type="text"
              value={idea}
              onChange={e => setIdea(e.target.value)}
              placeholder="e.g. Organic tea delivery service"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Industry</label>
            <select
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition appearance-none"
            >
              <option value="">Select industry</option>
              {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Target Audience</label>
            <select
              value={audience}
              onChange={e => setAudience(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition appearance-none"
            >
              <option value="">Select audience</option>
              {audiences.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <button
            onClick={generate}
            disabled={!canGenerate || loading}
            className="w-full bg-foreground text-background font-medium rounded-lg px-4 py-2.5 text-sm transition hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                Generating…
              </span>
            ) : results ? (
              <><RefreshCw className="w-3.5 h-3.5" /> Regenerate with AI</>
            ) : (
              <><Sparkles className="w-3.5 h-3.5" /> Generate with AI</>
            )}
          </button>
        </aside>

        {/* Right panel - Output */}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">AI Output</h2>

          {!results && !loading && (
            <div className="h-full flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-5 h-5 text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground">Configure parameters and click Generate</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="h-full flex items-center justify-center min-h-[300px]">
              <div className="flex gap-1.5">
                <span className="loading-dot" />
                <span className="loading-dot" />
                <span className="loading-dot" />
              </div>
            </div>
          )}

          {results && !loading && (
            <div className="space-y-5 animate-fade-in-up">
              {/* Names */}
              <div className="rounded-lg border border-border p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Business Names</h3>
                <div className="space-y-2">
                  {results.names.map((name, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 rounded-md bg-muted/40 text-sm text-foreground">
                      <span>{name}</span>
                      <CopyButton text={name} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Taglines */}
              <div className="rounded-lg border border-border p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Tagline Ideas</h3>
                <div className="space-y-2">
                  {results.taglines.map((t, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 rounded-md bg-muted/40 text-sm text-foreground">
                      <span>{t}</span>
                      <CopyButton text={t} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo Concept */}
              <div className="rounded-lg border border-border p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Logo Concept</h3>
                <div className="flex items-start justify-between px-3 py-2 rounded-md bg-muted/40 text-sm text-foreground">
                  <span>{results.logoConcept}</span>
                  <CopyButton text={results.logoConcept} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
