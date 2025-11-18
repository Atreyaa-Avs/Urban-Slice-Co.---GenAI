import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white py-12 animate-fade-in">
       <div className="container mx-auto px-6 max-w-4xl">
           <h1 className="text-4xl font-serif font-bold text-center mb-4">Contact Us</h1>
           <p className="text-center text-gray-500 mb-12">Have a custom cake request or event inquiry? We'd love to hear from you.</p>

           {submitted ? (
               <div className="bg-green-50 p-8 rounded-xl text-center">
                   <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                   <p className="text-green-700">We'll get back to you within 24 hours.</p>
               </div>
           ) : (
               <form onSubmit={handleSubmit} className="bg-urban-cream/30 p-8 rounded-2xl shadow-sm space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                           <input required className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-urban-gold/30 outline-none bg-white" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                           <input required type="email" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-urban-gold/30 outline-none bg-white" />
                       </div>
                   </div>
                   <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occasion / Inquiry Type</label>
                        <select className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-urban-gold/30 outline-none bg-white">
                            <option>Custom Cake Inquiry</option>
                            <option>Corporate Event</option>
                            <option>Wedding</option>
                            <option>Other</option>
                        </select>
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                       <textarea required rows={5} className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-urban-gold/30 outline-none bg-white"></textarea>
                   </div>
                   <button className="w-full bg-urban-charcoal text-white py-4 rounded-xl font-bold hover:bg-urban-gold transition-colors">Send Message</button>
               </form>
           )}
       </div>
    </div>
  );
};

export default Contact;