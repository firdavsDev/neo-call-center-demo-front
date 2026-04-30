import type React from 'react'
import { useState } from 'react'
import { Icon } from '../Icon'
import { Button } from '../primitives/Button'
import { Badge } from '../primitives/Badge'
import { SKIP_REASONS } from '../../data/demoTimeline'
import type { QueueEntry } from '../../data/demoTimeline'
import { useT } from '../../i18n'

export interface IncomingCallModalProps {
  queue: QueueEntry[]
  onAccept: (queueId: string) => void
  onSkip: (queueId: string, reason: string, note?: string) => void
}

function priorityTone(priority: QueueEntry['priority']): 'ai' | 'warning' | 'neutral' {
  if (priority === 'vip') return 'ai'
  if (priority === 'high') return 'warning'
  return 'neutral'
}

export function IncomingCallModal({ queue, onAccept, onSkip }: IncomingCallModalProps) {
  const { t } = useT()
  const [showSkip, setShowSkip] = useState(false)
  const [skipReason, setSkipReason] = useState(SKIP_REASONS[0])
  const [skipNote, setSkipNote] = useState('')

  function priorityLabel(priority: QueueEntry['priority']): string {
    if (priority === 'vip') return t('priority.vip')
    if (priority === 'high') return t('priority.high')
    return t('priority.normal')
  }

  function fmtWait(seconds: number): string {
    const sec = t('incomingCall.units.sec')
    const min = t('incomingCall.units.min')
    const minutes = t('incomingCall.units.minutes')
    if (seconds < 60) return `${seconds} ${sec}`
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return s > 0 ? `${m} ${min} ${s} ${sec}` : `${m} ${minutes}`
  }

  if (queue.length === 0) return null

  const first = [...queue].sort((a, b) => b.waitTime - a.waitTime)[0]

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  }

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: 440,
    background: 'var(--surface-1)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--r-xl)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    animation: 'slide-in-top 280ms var(--ease-spring) both',
  }

  const handleSkipSubmit = () => {
    onSkip(first.id, skipReason, skipNote.trim() || undefined)
    setShowSkip(false)
    setSkipNote('')
  }

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--ai-glow-soft)',
          }}
        >
          <span style={{ color: 'var(--ai-glow)' }}>
            <Icon name="phone" size={18} />
          </span>
          <span style={{ flex: 1, fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>
            {t('incomingCall.title')}
          </span>
          <Badge tone={priorityTone(first.priority)} size="sm">
            {priorityLabel(first.priority)}
          </Badge>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 20px 8px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              marginBottom: 8,
            }}
          >
            {first.maskedPhone}
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
            <span>
              <span style={{ color: 'var(--text-muted)' }}>{t('incomingCall.region')} </span>
              {first.region}
            </span>
            <span>
              <span style={{ color: 'var(--text-muted)' }}>{t('incomingCall.topic')} </span>
              {first.topic}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
            {t('incomingCall.waitTime')} <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--warning)' }}>{fmtWait(first.waitTime)}</span>
          </div>

          {/* Skip form */}
          {showSkip && (
            <div
              style={{
                background: 'var(--surface-2)',
                borderRadius: 'var(--r-md)',
                padding: 12,
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>
                {t('incomingCall.skipReasonTitle')}
              </div>
              <select
                value={skipReason}
                onChange={(e) => setSkipReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--border-default)',
                  background: 'var(--surface-1)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  marginBottom: 8,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {SKIP_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <textarea
                value={skipNote}
                onChange={(e) => setSkipNote(e.target.value)}
                placeholder={t('incomingCall.placeholder')}
                rows={2}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--border-default)',
                  background: 'var(--surface-1)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  resize: 'vertical',
                  fontFamily: 'var(--font-sans)',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <Button variant="danger" size="sm" onClick={handleSkipSubmit} style={{ flex: 1 }}>
                  {t('incomingCall.confirm')}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setShowSkip(false)}>
                  {t('incomingCall.cancel')}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        {!showSkip && (
          <div style={{ display: 'flex', gap: 10, padding: '0 20px 20px' }}>
            <Button
              variant="primary"
              size="md"
              icon="phone"
              onClick={() => onAccept(first.id)}
              style={{ flex: 1, background: 'var(--success)', border: '1px solid #15803D' }}
            >
              {t('incomingCall.accept')}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setShowSkip(true)}
            >
              {t('incomingCall.skip')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
