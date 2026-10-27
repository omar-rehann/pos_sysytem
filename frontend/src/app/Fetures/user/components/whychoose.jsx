export default function FeaturesGrid() {
  return (
    <div className="features-grid  gap-1">
       <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Why Choose Us 
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
  <div className="content grid md:grid-cols-3 m-2 gap-1">
  
<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-user-doctor"></i>
  </div>
  <h3>Verified & Trusted Doctors</h3>
  <p>
    Every doctor on our platform is carefully verified. 
    You can book with complete confidence knowing you’re in good hands.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-bolt"></i>
  </div>
  <h3>Easy & Fast Booking</h3>
  <p>
    Book your appointment in just a few clicks — anytime, anywhere. 
    No more long phone calls or waiting in lines.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-hospital"></i>
  </div>
  <h3>Wide Range of Specialties</h3>
  <p>
    From general practitioners to specialists, 
    find the right doctor for your needs in one place.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-star"></i>
  </div>
  <h3>Real Patient Reviews</h3>
  <p>
    Read honest feedback from real patients 
    to help you make the best decision.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-calendar-check"></i>
  </div>
  <h3>Flexible Scheduling</h3>
  <p>
    Choose the time that works best for you, 
    with options for both in-clinic and online consultations.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-shield-halved"></i>
  </div>
  <h3>Secure & Private</h3>
  <p>
    Your personal and medical information is fully protected 
    with advanced security measures.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-video"></i>
  </div>
  <h3>Online Video Consultations</h3>
  <p>
    Talk to your doctor from home through a secure video call, 
    without traveling or waiting in a clinic.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-bell"></i>
  </div>
  <h3>Smart Reminders</h3>
  <p>
    Get notified before your appointment so you never miss a visit, 
    and reschedule easily if plans change.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-folder-medical"></i>
  </div>
  <h3>Digital Medical Records</h3>
  <p>
    Keep your prescriptions, test results, and visit history 
    organized and available whenever you need them.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-credit-card"></i>
  </div>
  <h3>Transparent Pricing</h3>
  <p>
    See the consultation fee upfront before you book, 
    with no hidden charges or surprises.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-location-dot"></i>
  </div>
  <h3>Find Doctors Near You</h3>
  <p>
    Search by location to find clinics and hospitals 
    close to home, work, or wherever you are.
  </p>
</div>

<div className="feature-card cursor-pointer m-2 bg-white shadow-md hover:shadow-xl rounded-2xl p-3 transition-shadow duration-300 border border-gray-100">
  <div className="icon text-3xl text-blue-600 mb-3">
    <i className="fa-solid fa-headset"></i>
  </div>
  <h3>24/7 Customer Support</h3>
  <p>
    Our support team is always ready to help with booking, 
    cancellations, or any question you have.
  </p>
</div>

  </div>
   
    </div>
  );
}