import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <div className="relative bg-white overflow-hidden h-screen">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg over">
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Amazing deals on bestselling books
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              The best place to get your books from,as they say:"THE MORE YOU READ THE MORE YOU LEARN".Let me lead you to the world of books.
            </p>
          </div>
            <div className="flex">
                <Link
                  to="/home"
                  className="mt-4 z-20 relative inline-block text-center bg-orange-500 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-orange-600"
                >
                  Get On Board
                </Link>
            </div>
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute left-0 transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100 hover:scale-110">
                        <img
                          src="https://i.insider.com/5e873c73dcd88c2607758a74?width=1000&format=jpeg&auto=webp"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden hover:scale-110">
                        <img
                          src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F23%2F2018%2F07%2F27%2Fgreat-books-to-read-normal-people-crop.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden hover:scale-110">
                        <img
                          src="https://img.buzzfeed.com/buzzfeed-static/static/2021-12/14/23/asset/3033330dc82c/sub-buzz-3668-1639525547-10.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden hover:scale-110">
                        <img
                          src="http://mindjoggle.com/wp-content/uploads/2019/02/as-bright-as-heaven-cover.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden hover:scale-110">
                        <img
                          src="https://cdn.lifehack.org/wp-content/uploads/2015/05/31055903/1-The-Kite-Runner-Riverhead-Edition.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden hover:scale-110">
                        <img
                          src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2020%2F12%2F10%2FThe-Last-Thing-He-Told-Me-2000.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden hover:scale-110">
                        <img
                          src="https://images-na.ssl-images-amazon.com/images/I/51sXXoOKvML.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
