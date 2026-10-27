function Analysis(){
    return(
        <>
        <div className="Analysis">
            <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Analysis  Home Page
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
             <div className="content grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">

      <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
        <h2>3</h2>
        <div className="info">
          <i className="fa-solid fa-user"></i>
          <h4>User</h4>
        </div>
      </div>

    

      <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
        <h2>3</h2>
        <div className="info">
          <i className="fa-solid fa-store"></i>
          <h4>Store</h4>
        </div>
      </div>

      <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
        <h2>3</h2>
        <div className="info">
          <i className="fa-solid fa-layer-group"></i>
          <h4>Category</h4>
        </div>
      </div>

      <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
        <h2>3</h2>
        <div className="info">
          <i className="fa-solid fa-box"></i>
          <h4>Product</h4>
        </div>
      </div>

      <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
        <h2>3</h2>
        <div className="info">
          <i className="fa-solid fa-cart-shopping"></i>
          <h4>Order</h4>
        </div>
      </div>

    </div>
            <div className="chart">

            </div>
        </div>
        </>
    )

}
export default  Analysis