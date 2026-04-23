import type { CSSProperties } from "react";

export type BackgroundVariant = "bold";

const variantStyles: Record<BackgroundVariant, CSSProperties> = {
  bold: {
    backgroundImage: [
      "linear-gradient(rgba(255, 255, 255, 0.95) 1px, transparent 1px)",
      "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 1px, transparent 1px)",
      "linear-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px)",
      "linear-gradient(90deg, rgba(255, 255, 255, 0.55) 1px, transparent 1px)",
      "linear-gradient(135deg, #f5f0e9 0%, #eee7de 100%)",
    ].join(", "),
    backgroundSize:
      "100px 100px, 100px 100px, 20px 20px, 20px 20px, 100% 100%",
  },
};

type BackgroundLayerProps = {
  variant: BackgroundVariant;
};

export function BackgroundLayer({ variant }: BackgroundLayerProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        ...variantStyles[variant],
      }}
    />
  );
}
