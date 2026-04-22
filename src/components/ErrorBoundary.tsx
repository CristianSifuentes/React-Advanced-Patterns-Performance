import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Widget crashed:', error, info);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, message: undefined });
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="panel error-panel" role="alert">
        <h3>Widget failed safely.</h3>
        <p>{this.state.message ?? 'Unknown rendering error.'}</p>
        {this.props.fallback}
        <button onClick={this.handleReset}>Try again</button>
      </section>
    );
  }
}
