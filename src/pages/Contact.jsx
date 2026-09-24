import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import StarField from "../components/StarField";

export default function Contact() {
  const formRef = useRef();
  const [state, handleSubmit] = useForm("meervdlq");
  // Prefilled when arriving from a project's "Request GitHub Access" button.
  const prefill = useLocation().state?.message ?? "";

  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();
      // reset() restores defaultValue, which would bring the prefill back.
      formRef.current.elements.message.value = "";
    }
  }, [state.succeeded]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-16">
        <img src="/images/HeroBackdrop.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative">
          <h1 className="text-3xl font-bold mb-2">Contact Me<span className="text-amber-400">.</span></h1>
          <p className="text-gray-400">Everything you need to reach out to me.</p>
        </div>
      </section>

      {/* Stars behind content */}
      <div className="relative">
        <StarField />

        <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
          <form ref={formRef} className="max-w-xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 text-gray-100 placeholder-gray-500 outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 text-gray-100 placeholder-gray-500 outline-none focus:border-amber-400 transition-colors"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Message</label>
                <textarea
                  name="message"
                  defaultValue={prefill}
                  placeholder="Write your message here"
                  rows={5}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-white/10 text-gray-100 placeholder-gray-500 outline-none focus:border-amber-400 transition-colors"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button type="submit" disabled={state.submitting}
                className="self-start w-40 py-3 rounded-lg font-medium transition-colors bg-amber-400 text-gray-950 hover:bg-amber-300 disabled:opacity-50">
                {state.submitting ? "Sending..." : "Send message"}
              </button>

              {state.succeeded && (
                <p className="text-amber-400 text-sm mt-2">Message sent! I'll get back to you soon.</p>
              )}
            </div>
          </form>
        </section>
      </div>
    </>
  );
}