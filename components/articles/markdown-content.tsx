"use client";

import { Children, isValidElement, type ReactNode, useState } from "react";
import { Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content, className = "" }: { content: string; className?: string }) {
  return (
    <div className={`article-prose ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          a: ({ href = "", children, ...props }) => {
            const external = href.startsWith("http://") || href.startsWith("https://");
            return <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props}>{children}</a>;
          },
          img: ({ src, alt = "", ...props }) => {
            if (typeof src !== "string") return null;
            // External editorial images are validated by react-markdown's URL transform.
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={alt} loading="lazy" decoding="async" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const code = textContent(children).replace(/\n$/, "");

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="group relative my-7">
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded border border-slate-600 bg-slate-900/90 px-2 py-1 text-xs font-medium text-slate-200 opacity-100 focus-ring sm:opacity-0 sm:transition sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre>{children}</pre>
    </div>
  );
}

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textContent(node.props.children);
  return Children.toArray(node).map(textContent).join("");
}
