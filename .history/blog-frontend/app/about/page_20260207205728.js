import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sectionStyle = {
  marginTop: "1.5rem",
};

export default function About() {
  return (
    <div className="dark:bg-sky-950">
      <Navbar />
      <main style={{ padding: "2rem", maxWidth: "880px", margin: "0 auto" }}>
        <h1>About This Blog</h1>
        <br />

        <p>
          This is a learning project where I practice Next.js and Django
          framework by building a simple Blog-App.
        </p>
        <br />
        <section style={sectionStyle}>
          <h2>Why I Built It</h2>
          <br />
          <p>
            I started with learning Django framework and queried AI on which
            project could I begin with learning Django and it suggested me a
            Blog-App. Then I decided to create the frontend using a proper
            framework instead of just using Django templates. This is how it
            came to be.
          </p>
        </section>
        <br />

        <section style={sectionStyle}>
          <h2>What It Includes</h2>
          <br />
          <ul>
            <li>Clean routing with the App Router</li>
            <li>Reusable UI components</li>
            <li>Basic auth and profile pages</li>
            <li>Post creation and reading flow</li>
            <li>Proper API using Django</li>
          </ul>
        </section>
        <br />

        <section style={sectionStyle}>
          <h2>Learning Goals</h2>
          <br />
          <ul>
            <li>Data fetching and loading states</li>
            <li>Simple forms and validation</li>
            <li>Styling with Tailwind and custom CSS</li>
            <li>Performance and accessibility basics</li>
          </ul>
        </section>
        <br />

        <section style={sectionStyle}>
          <h2>Next Steps</h2>
          <br />
          <p>
            I plan to add richer editor features, better error handling, and a
            small set of tests as I keep learning.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
