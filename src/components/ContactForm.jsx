import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactForm() {
    const formRef = useRef();
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        // REPLACE THESE VALUES WITH YOUR EMAILJS KEYS
        // Sign up at https://www.emailjs.com/
        const SERVICE_ID = 'service_s7hvflb';
        const TEMPLATE_ID = 'template_gviwuue';
        const PUBLIC_KEY = '5eAdg9tyO2lkorXji';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
            publicKey: PUBLIC_KEY,
        })
            .then(
                () => {
                    setStatus('success');
                    formRef.current.reset();
                    setTimeout(() => setStatus('idle'), 5000);
                },
                (error) => {
                    setStatus('error');
                    setErrorMsg('Failed to send message. Please try again later.');
                    console.error('FAILED...', error.text);
                },
            );
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <div>
                    <label htmlFor="user_name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                    <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-slate-600"
                        placeholder="Your Name"
                    />
                </div>

                <div>
                    <label htmlFor="user_email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-slate-600"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        required
                        rows="5"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-slate-600 resize-none"
                        placeholder="I'd like to discuss a project..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2
            ${status === 'success'
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : 'bg-accent hover:bg-accent/90'
                        }
            ${status === 'sending' ? 'opacity-70 cursor-wait' : ''}
          `}
                >
                    {status === 'idle' && (
                        <>
                            Send Message
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </>
                    )}
                    {status === 'sending' && (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    )}
                    {status === 'success' && (
                        <>
                            Message Sent!
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </>
                    )}
                </button>

                <AnimatePresence>
                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded"
                        >
                            {errorMsg}
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}
