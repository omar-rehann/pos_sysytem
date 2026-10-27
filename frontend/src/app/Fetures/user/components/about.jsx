function About() {
  return (
   <section className="py-24">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

    {/* Content - Left */}
    <div>
      <span className="inline-flex items-center gap-2 text-blue-600 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
        <span className="w-8 h-px bg-blue-600"></span>
        About Our POS
      </span>

      <h2 className=" text-4xl md:text-5xl leading-tight text-slate-900 mb-6">
        A smarter way
        <br />
        to manage your business.
      </h2>

      <p className="text-slate-600 text-base leading-7 mb-4">
        Our POS System is designed to help businesses manage their daily
        operations faster and more efficiently. From processing sales and
        managing products to tracking inventory and customers, everything is
        organized in one simple platform.
      </p>

      <p className="text-slate-600 text-base leading-7 mb-8">
        Whether you run a retail store, restaurant, or growing business,
        our system gives you the tools you need to manage sales, monitor
        inventory, track transactions, and make better business decisions.
      </p>

      <button className="bg-blue-600 text-white px-7 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-blue-700 transition-colors duration-300">
        Explore Our System
      </button>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200">

        <div>
          <p className=" text-3xl text-blue-600 mb-1">
            100%
          </p>
          <p className="text-slate-500 text-xs leading-5">
            Easy to Use
          </p>
        </div>

        <div>
          <p className=" text-3xl text-blue-600 mb-1">
            24/7
          </p>
          <p className="text-slate-500 text-xs leading-5">
            Business Access
          </p>
        </div>

        <div>
          <p className=" text-3xl text-blue-600 mb-1">
            All-in-One
          </p>
          <p className="text-slate-500 text-xs leading-5">
            Business Management
          </p>
        </div>

      </div>
    </div>

    {/* Image - Right */}
    <div className="relative">

      <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&auto=format&fit=crop&q=80"
          alt="POS system and business management"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Accent frame */}
      <div className="hidden md:block absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-blue-600 rounded-[2rem] -z-10"></div>

      {/* Floating badge */}
      <div className="absolute -bottom-6 left-6 bg-blue-600 text-white rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3">

        <i className="fa-solid fa-cash-register text-white text-xl"></i>

        <div>
          <p className="text-sm font-semibold leading-4">
            Smart POS
          </p>

          <p className="text-xs text-blue-100 leading-4">
            Simple & efficient
          </p>
        </div>

      </div>

    </div>

  </div>
</section>
  );
}

export default About;