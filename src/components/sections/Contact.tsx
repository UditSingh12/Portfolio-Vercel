import { useState } from 'react';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        // Reset form
        (e.target as HTMLFormElement).reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error("Error from Web3Forms", data);
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 scroll-mt-32 max-w-2xl">
      <SectionHeader title="Contact" subtitle="let's talk" />
      
      <div className="bg-surface/50 p-8 rounded-xl border border-border backdrop-blur-sm relative overflow-hidden">
        <h3 className="text-3xl font-medium text-white mb-6">Let's build something extraordinary.</h3>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-secondary uppercase">Name</label>
              <input 
                type="text" 
                name="name"
                required
                className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-white transition-colors text-white"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-secondary uppercase">Email</label>
              <input 
                type="email" 
                name="email"
                required
                className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-white transition-colors text-white"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-secondary uppercase">Message</label>
            <textarea 
              name="message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-white transition-colors text-white resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button 
            type="submit" 
            disabled={isSubmitting || isSuccess}
            className="flex items-center justify-center gap-2 w-full py-4 bg-white text-background rounded-lg font-bold hover:bg-white/90 transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Transmitting...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" /> Message Sent!
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
