"use client";

import { Component, ReactNode } from "react";

interface SafeEffectProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface SafeEffectState {
  hasError: boolean;
}

/**
 * Error boundary for purely decorative effects (canvas/WebGL backgrounds,
 * holograms). If an effect throws while rendering, we swallow the error and
 * render an optional fallback instead of crashing the whole page.
 */
export class SafeEffect extends Component<SafeEffectProps, SafeEffectState> {
  state: SafeEffectState = { hasError: false };

  static getDerivedStateFromError(): SafeEffectState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("SafeEffect caught a non-fatal effect error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
