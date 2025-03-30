import type { PropsWithChildren } from "react";

import "~/styles/globals.css";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru" className="dark">
      <body>{children}</body>
    </html>
  );
}
