import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    favoriteTeam: '',
    membershipType: 'fan'
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // eslint-disable-next-line no-useless-escape
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.favoriteTeam.trim()) {
      newErrors.favoriteTeam = 'Favorite team is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          favoriteTeam: '',
          membershipType: 'fan'
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-4 mb-4 shadow-lg">
            <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              <circle cx="12" cy="12" r="1.5" fill="white"/>
              <path d="M12 8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Join Our Team
          </h1>
          <p className="text-green-100 text-lg">
            Subscribe to get exclusive updates and benefits
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to the Team!</h2>
              <p className="text-gray-600 text-lg">
                Your subscription has been confirmed. Check your email for details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Favorite Team */}
              <div>
                <label htmlFor="favoriteTeam" className="block text-sm font-semibold text-gray-700 mb-2">
                  Favorite Team *
                </label>
                <input
                  type="text"
                  id="favoriteTeam"
                  name="favoriteTeam"
                  value={formData.favoriteTeam}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.favoriteTeam ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your favorite team"
                />
                {errors.favoriteTeam && (
                  <p className="mt-1 text-sm text-red-600">{errors.favoriteTeam}</p>
                )}
              </div>

              {/* Membership Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Membership Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.membershipType === 'fan' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-300 hover:border-green-400'
                  }`}>
                    <input
                      type="radio"
                      name="membershipType"
                      value="fan"
                      checked={formData.membershipType === 'fan'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-800">Fan</div>
                      <div className="text-sm text-gray-600">Basic Access</div>
                    </div>
                  </label>

                  <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.membershipType === 'premium' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-300 hover:border-green-400'
                  }`}>
                    <input
                      type="radio"
                      name="membershipType"
                      value="premium"
                      checked={formData.membershipType === 'premium'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-800">Premium</div>
                      <div className="text-sm text-gray-600">Extra Benefits</div>
                    </div>
                  </label>

                  <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.membershipType === 'vip' 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-300 hover:border-green-400'
                  }`}>
                    <input
                      type="radio"
                      name="membershipType"
                      value="vip"
                      checked={formData.membershipType === 'vip'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-bold text-lg text-gray-800">VIP</div>
                      <div className="text-sm text-gray-600">All Access</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Subscribe Now
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                * Required fields
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white text-sm">
          <p>© 2025 Football Team Subscription. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
