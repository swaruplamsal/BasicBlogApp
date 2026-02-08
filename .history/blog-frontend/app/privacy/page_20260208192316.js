import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sectionStyle = {
	marginTop: "1.5rem",
};

export default function Privacy() {
	return (
		<div className="dark:bg-slate-950 text-gray-400">
			<Navbar />
			<main style={{ padding: "2rem", maxWidth: "880px", margin: "0 auto" }}>
				<h1>Privacy Policy</h1>
				<br />
				<p>
					This privacy policy explains what information is collected on this
					blog and how it is used. If you have any questions, feel free to
					contact me.
				</p>

				<section style={sectionStyle}>
					<h2>Information I Collect</h2>
					<br />
					<ul>
						<li>Basic account details if you create an account.</li>
						<li>Comments you post on articles.</li>
						<li>Contact form messages you choose to send.</li>
						<li>Technical data like browser type and device information.</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<h2>How I Use Your Information</h2>
					<br />
					<ul>
						<li>To provide and improve the blog experience.</li>
						<li>To respond to messages and support requests.</li>
						<li>To keep the site secure and prevent abuse.</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<h2>Cookies</h2>
					<br />
					<p>
						This site may use cookies to keep you signed in and improve the
						experience. You can disable cookies in your browser settings.
					</p>
				</section>

				<section style={sectionStyle}>
					<h2>Data Sharing</h2>
					<br />
					<p>
						I do not sell or share your personal data with third parties, except
						when required by law or to protect the site.
					</p>
				</section>

				<section style={sectionStyle}>
					<h2>Data Retention</h2>
					<br />
					<p>
						I keep your data only as long as needed to provide the service or as
						required by law.
					</p>
				</section>

				<section style={sectionStyle}>
					<h2>Contact</h2>
					<br />
					<p>
						If you have privacy questions, email me at{" "}
						<a
							href="mailto:hello@example.com"
							className="text-red-400 hover:underline"
						>
							hello@example.com
						</a>
						.
					</p>
				</section>
			</main>
			<Footer />
		</div>
	);
}
