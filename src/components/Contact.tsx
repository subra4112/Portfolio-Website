import { useState, type FormEvent, type ChangeEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle2, Loader2 } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// EmailJS config (carried over from the existing site).
const SERVICE_ID = 'service_0f7d8mu'
const TEMPLATE_ID = 'template_2ij1att'
const PUBLIC_KEY = 'UGzNe5K_OvWmvd5kQ'

const CONTACT = [
  { icon: Mail, label: 'Email', value: 'rvanush3@gmail.com', href: 'mailto:rvanush3@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'San Francisco Bay Area' },
  { icon: Linkedin, label: 'LinkedIn', value: '/in/subraraj', href: 'https://www.linkedin.com/in/subraraj' },
  { icon: Github, label: 'GitHub', value: '@subra4112', href: 'https://github.com/subra4112' },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          subject: form.subject,
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          reply_to: form.email,
        },
        PUBLIC_KEY
      )
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-mist-100 placeholder-mist-400 transition-colors focus:border-pink/60 focus:outline-none focus:ring-1 focus:ring-pink/40'

  return (
    <section id="contact" className="section">
      <SectionHeading
        color="#f491c0"
        eyebrow="05 · contact"
        title="Open a"
        accent="session"
        align="center"
        subtitle="Open to full-time AI/ML Engineer, Data Scientist, Clinical AI, and Forward Deployed Engineer roles — healthcare AI, enterprise AI, and beyond."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Info column */}
        <Reveal className="lg:col-span-2">
          <div className="card h-full p-6 sm:p-7">
            <h3 className="font-display text-lg font-semibold text-mist-100">Get in touch</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">
              I'm always up for discussing clinical AI, LLM systems, research, or a role
              where I can ship real impact.
            </p>

            <div className="mt-6 space-y-3">
              {CONTACT.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-colors hover:border-pink/40">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-pink-bg text-pink-text">
                      <Icon size={17} />
                    </span>
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-mist-400">
                        {label}
                      </div>
                      <div className="text-sm text-mist-100">{value}</div>
                    </div>
                  </div>
                )
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                )
              })}
            </div>

            <div className="mt-6 flex items-center gap-2.5 rounded-xl bg-pink-bg/40 p-3.5 text-xs text-mist-300 ring-1 ring-pink/25">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Available for opportunities · responds within a day
            </div>
          </div>
        </Reveal>

        {/* Form column */}
        <Reveal delay={80} className="lg:col-span-3">
          <form onSubmit={onSubmit} className="card p-6 sm:p-7">
            {status === 'sent' ? (
              <div className="grid place-items-center py-16 text-center">
                <CheckCircle2 className="mb-4 text-white" size={48} />
                <h4 className="font-display text-xl font-semibold text-mist-100">
                  Message sent
                </h4>
                <p className="mt-1 text-sm text-mist-300">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm text-mist-200">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      className={inputCls}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm text-mist-200">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      className={inputCls}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm text-mist-200">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    required
                    className={inputCls}
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm text-mist-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell me about the role or project…"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-white">
                    Something went wrong. Email me directly at{' '}
                    <a href="mailto:rvanush3@gmail.com" className="underline">
                      rvanush3@gmail.com
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send message
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
