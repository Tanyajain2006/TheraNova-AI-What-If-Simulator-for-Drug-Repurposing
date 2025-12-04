import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v2.35" />
      <path d="m19 5-1.4 1.4" />
      <path d="M22 12h-2.35" />
      <path d="m19 19-1.4-1.4" />
      <path d="M12 22v-2.35" />
      <path d="m5 19 1.4-1.4" />
      <path d="M2 12h2.35" />
      <path d="m5 5 1.4 1.4" />
      <path d="M12 6a6 6 0 1 0 6 6" />
      <path d="M12 10a2 2 0 1 0 2 2" />
    </svg>
  );
}
