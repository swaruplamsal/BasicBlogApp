import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sectionStyle = {
  marginTop: "1.5rem",
};

export default function Contact() {
  return (
    <div className="dark:bg-slate-950 text-gray-400">
      <Navbar />
      <main style={{ padding: "2rem", maxWidth: "880px", margin: "0 auto" }}>
        <h1>Contact</h1>
        <br />
        <p>
          Have a question, feedback, or a collaboration idea? Drop a message
          below or email me directly. I usually reply within 48 hours.
        </p>

        <section style={sectionStyle}>
          <h2>Send a Message</h2>
          <br />
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm text-slate-400">Name</span>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-400">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-400">Subject</span>
              <input
                type="text"
                placeholder="What is this about?"
                className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-400">Message</span>
              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200"
              />
            </label>

            <button
              type="button"
              className="w-fit rounded px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/50"
            >
              Send Message
            </button>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2>Email</h2>
          <br />
          <p>
            Prefer email? Reach me at{" "}
            <a
              href="mailto:lamsalswarup99@gmail.com"
              className="text-red-400 hover:underline"
            >
              lamsalswarup99@gmail.com
            </a>
            .
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>Social</h2>
          <br />
          <p>Connect with me on GitHub or LinkedIn for updates and projects.</p>
        </section>

        <section style={sectionStyle}>
          <h2>Privacy</h2>
          <br />
          <p>
            I only use your message to respond and do not share your data with
            anyone.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
