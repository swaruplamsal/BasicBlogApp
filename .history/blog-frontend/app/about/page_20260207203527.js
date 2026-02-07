import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function about() {
  return (
    <div>
      <Navbar></Navbar>
      <main style={{ padding: "2rem" }}>
        <h1>About</h1>
        <p>
          This is a learning project where I’m practicing Next.js and building a
          simple blog.
        </p>
        <h2>What I’m learning</h2>
        <ul>
          <li>Routing with the App Router</li>
          <li>Reusable components</li>
          <li>Basic styling and layout</li>
        </ul>
      </main>
      <Footer></Footer>
    </div>
  );
}
