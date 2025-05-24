import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id='contact' className={`contact-section ${isLoaded ? 'loaded' : ''}`}>
      {/* Background elements similar to Services */}
      <div className="contact-background">
        <div className="contact-gradient"></div>
        <div className="contact-particle contact-particle-1"></div>
        <div className="contact-particle contact-particle-2"></div>
        <div className="contact-particle contact-particle-3"></div>
        <div className="contact-particle contact-particle-4"></div>
      </div>
      
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">CONTACT US</h2>
          <p className="contact-subtitle">Fill out the form and we'll get back to you</p>
        </div>

        <div className="contact-row">
          <div className="form-container full-width">
            {submitSuccess ? (
              <div className="success-message">
                <svg className="success-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 4 12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h4>Message sent!</h4>
                <p>We'll contact you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="floating-input">
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      required 
                    />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  
                  <div className="floating-input">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      required 
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                </div>
                
                <div className="floating-input">
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder=" "
                    required 
                  />
                  <label htmlFor="subject">Subject</label>
                </div>
                
                <div className="floating-input textarea-input">
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="3" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  ></textarea>
                  <label htmlFor="message">Your Message</label>
                </div>
                
                <button 
                  type="submit" 
                  className={`form-submit ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      Send Message
                      <svg className="submit-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;