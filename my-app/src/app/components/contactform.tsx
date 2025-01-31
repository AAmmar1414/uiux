"use client";

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");

      setResponse("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setResponse("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-md rounded-lg p-8">
        {/* Left Side (Contact Info) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Get In Touch With Us</h2>
          <p className="text-gray-600">Contact us for any inquiries or support. We&#39;re here to help!</p>

          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">📍 Address</h4>
              <p className="text-gray-500">123 Street, New York, USA</p>
            </div>

            <div>
              <h4 className="font-semibold">📞 Phone</h4>
              <p className="text-gray-500">+1 234 567 890</p>
            </div>

            <div>
              <h4 className="font-semibold">⏰ Working Time</h4>
              <p className="text-gray-500">Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
          {response && <p className="mt-2 text-center">{response}</p>}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-bold">🏆 High Quality</h4>
          <p>Products from top-rated brands</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-bold">🛡 Warranty Protection</h4>
          <p>Covering for 2 years</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-bold">📞 24/7 Support</h4>
          <p>Dedicated team always available</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

