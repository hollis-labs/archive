import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Activity } from 'lucide-react'
import { WidgetShell } from './WidgetShell'

describe('WidgetShell', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders title and children', () => {
    render(
      <WidgetShell id="test-1" title="Activity" icon={Activity}>
        <div data-testid="body">hello</div>
      </WidgetShell>,
    )
    expect(screen.getByText('Activity')).toBeInTheDocument()
    expect(screen.getByTestId('body')).toBeInTheDocument()
  })

  it('hides children when collapsed', () => {
    render(
      <WidgetShell id="test-2" title="Activity" icon={Activity}>
        <div data-testid="body">hello</div>
      </WidgetShell>,
    )
    fireEvent.click(screen.getByRole('button', { name: /activity/i }))
    expect(screen.queryByTestId('body')).not.toBeInTheDocument()
  })

  it('persists collapsed state to localStorage', () => {
    render(
      <WidgetShell id="test-3" title="Activity" icon={Activity}>
        <div>x</div>
      </WidgetShell>,
    )
    fireEvent.click(screen.getByRole('button', { name: /activity/i }))
    expect(localStorage.getItem('mux-widget-test-3')).toBe('minimized')
  })

  it('restores collapsed state from localStorage on mount', () => {
    localStorage.setItem('mux-widget-test-4', 'minimized')
    render(
      <WidgetShell id="test-4" title="Activity" icon={Activity}>
        <div data-testid="body">x</div>
      </WidgetShell>,
    )
    expect(screen.queryByTestId('body')).not.toBeInTheDocument()
  })
})
