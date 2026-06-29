"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-800 mb-2">Có lỗi xảy ra</h1>
            <p className="text-gray-600">Vui lòng tải lại trang</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
