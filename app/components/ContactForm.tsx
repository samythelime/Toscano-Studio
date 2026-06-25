'use client';

import { useState, FormEvent } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqevpwrp';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col justify-center h-full py-8">
        <div className="w-12 h-12 bg-[#E85D04]/10 flex items-center justify-center mb-6">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M4 11l5 5L18 6"
              stroke="#E85D04"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-[#FFF3E0] font-bold text-2xl mb-2">Got it — I&rsquo;ll be in touch.</h3>
        <p className="text-[#a08060] text-base">
          Expect a free mockup in your inbox within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-[#a08060] text-xs font-semibold uppercase tracking-widest mb-1">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="John Smith"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="business" className="block text-[#a08060] text-xs font-semibold uppercase tracking-widest mb-1">
          Business name
        </label>
        <input
          id="business"
          name="business"
          type="text"
          required
          placeholder="Smith Plumbing Co."
          className="field"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[#a08060] text-xs font-semibold uppercase tracking-widest mb-1">
          Tell me about your business
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="What do you do, where are you based, do you have an existing site?"
          className="field"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#E85D04] text-white font-bold py-4 text-base hover:bg-[#F48C06] transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
