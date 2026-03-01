import { useCallback } from 'react';
import { ArrowLeft, Clock, Hash, User, FileText } from 'lucide-react';
import { usePoll } from '../hooks/usePoll';
import { getHead } from '../api/client';
import { Spinner } from '../components/ui/Spinner';
import { CopyButton } from '../components/ui/CopyButton';
import { JsonViewer } from '../components/ui/JsonViewer';

interface Props {
  namespace: string;
  recordKey: string;
  onBack: () => void;
  onOpenHistory: (namespace: string, key: string) => void;
}

export function RecordDetailPage({ namespace, recordKey, onBack, onOpenHistory }: Props) {
  const fetcher = useCallback(
    () => getHead(namespace, recordKey),
    [namespace, recordKey],
  );
  const { data, loading, error, refresh } = usePoll(fetcher, 10_000);

  const record = data?.record;

  return (
    <div>
      <div className="breadcrumbs">
        <button onClick={onBack}><ArrowLeft size={12} /> Namespace</button>
        <span style={{ color: 'rgb(var(--muted))' }}>/</span>
        <span>{recordKey}</span>
      </div>

      <div className="page-header">
        <h2 className="page-title">{recordKey}</h2>
        <CopyButton text={recordKey} />
        <div className="page-actions">
          <button
            className="hud-button-ghost"
            onClick={() => onOpenHistory(namespace, recordKey)}
          >
            History
          </button>
          <button className="hud-button-ghost" onClick={refresh} disabled={loading}>
            {loading ? <Spinner size={12} /> : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="hud-panel" style={{ padding: '0.75rem', color: 'rgb(var(--danger))', marginBottom: '0.75rem' }}>
          Error: {error.message}
        </div>
      )}

      {loading && !record && (
        <div style={{ padding: '2rem', textAlign: 'center' }}><Spinner size={20} /></div>
      )}

      {record && (
        <>
          {/* Metadata grid */}
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            <MetaCard icon={<Hash size={13} />} label="Record ID" value={record.record_id} copyable />
            <MetaCard icon={<FileText size={13} />} label="Namespace" value={record.namespace} copyable />
            <MetaCard label="Revision" value={`r${record.revision}`} />
            <MetaCard icon={<User size={13} />} label="Actor" value={record.actor} />
            <MetaCard icon={<Clock size={13} />} label="Created" value={new Date(record.created_at).toLocaleString()} />
            <MetaCard label="Checksum" value={record.checksum} copyable />
          </div>

          {/* Payload */}
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span className="hud-label" style={{ marginBottom: 0 }}>Payload</span>
              <CopyButton text={JSON.stringify(record.payload, null, 2)} />
            </div>
            <JsonViewer data={record.payload} maxHeight="500px" />
          </div>

          {/* Metadata (if present) */}
          {record.metadata && (
            <div>
              <span className="hud-label">Metadata</span>
              <JsonViewer data={record.metadata} maxHeight="200px" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MetaCard({ icon, label, value, copyable }: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="stat-card">
      <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        {icon}
        {label}
      </div>
      <div style={{
        fontSize: '0.85rem',
        color: 'rgb(var(--text))',
        wordBreak: 'break-all',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
      }}>
        <span style={{ flex: 1 }}>{value}</span>
        {copyable && <CopyButton text={value} size={12} />}
      </div>
    </div>
  );
}
