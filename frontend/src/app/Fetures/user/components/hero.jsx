"use client"

function HeroSection() {
  return (
    <>
      <section>
        <div className=" p-5 w-[100%] ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">

            {/* Text Section */}
            <div>
              <div className="max-w-prose md:max-w-none mb-2">
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Manage Your Sales <span className="text-blue-700">Faster</span> & Smarter With Our Powerful <span className="text-blue-700">POS System</span>
                </h2>

                <p className="mt-4 text-black mb-3">
                  Process transactions, track inventory, and manage customers —
                  all from one easy-to-use point of sale system designed for your business.
                </p>
                <p className="mt-4 text-black mb-3">
  Sell faster, manage smarter, and grow your business —
  all with one powerful and simple point of sale system.
</p>
<p className="mt-4 text-black mb-3">
  Handle payments, control stock, and serve customers
  efficiently with our modern and reliable POS solution.
</p>
<p className="mt-4 text-black mb-3">
  Run your store with confidence — process sales, manage inventory,
  and track customers all in one simple POS system.
</p>
<p className="mt-4 text-black mb-3">
  Everything you need to run your business in one place —
  fast checkout, real-time inventory, and complete sales control.
</p>
              </div>
              <div className="explore">
                <button className="bg-blue-600 p-2 rounded mt-2 text-white hover:bg-blue-500 cursor-pointer">Explore More</button>
              </div>
            </div>

            {/* Image Section */}
            <div className="image text-center">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60"
                className="rounded w-full  "
                alt="POS System"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection