import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import StarField from "../components/StarField";
import PageHero from "../components/PageHero";

const field =
  "w-full p-3 rounded-xl bg-white/[.03] border border-line text-ink placeholder-mute/70 outline-none focus:border-amber transition-colors";
const label = "font-mono text-[11px] tracking-[.12em] uppercase text-mute mb-1.5 block";

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
      <PageHero title="Contact Me" subtitle="Everything you need to reach out to me." />

      <div className="relative">
        <StarField />
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
          <form ref={formRef} className="max-w-xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="contact-name" className={label}>Name</label>
                <input id="contact-name" type="text" name="name" placeholder="Your name" className={field} />
              </div>

              <div>
                <label htmlFor="contact-email" className={label}>Email</label>
                <input id="contact-email" type="email" name="email" placeholder="Your email" className={field} />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-red-400 mt-1.5" />
              </div>

              <div>
                <label htmlFor="contact-message" className={label}>Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  defaultValue={prefill}
                  placeholder="Write your message here"
                  rows={5}
                  className={field}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-red-400 mt-1.5" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="self-start px-6 py-3 rounded-full font-medium bg-amber text-space cursor-pointer shadow-[0_0_30px_-6px_rgba(251,191,36,.5)]
                  transition-[translate,box-shadow,opacity] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-default"
              >
                {state.submitting ? "Sending..." : "Send message"}
              </button>

              {state.succeeded && (
                <p className="text-amber text-sm">Message sent! I'll get back to you soon.</p>
              )}
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
