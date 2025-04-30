import React from "react";
import '../../assets/styles/layout/_alert.css';

export function Alert({ children, variant = "default" }) {
  const color =
    variant === "destructive"
      ? "alert-danger"
      : variant === "warning"
      ? "alert-warning"
      : "alert-default";

  return <div className={`alert-box ${color}`}>{children}</div>;
}

export function AlertTitle({ children }) {
  return <div className="alert-title">{children}</div>;
}

export function AlertDescription({ children }) {
  return <div className="alert-description">{children}</div>;
}
