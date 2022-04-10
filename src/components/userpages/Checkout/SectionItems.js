import React from 'react';

const SectionItems = (props) => {
    const {CartItems}=props
    const SubTotal=CartItems.reduce((SubTotal,CartItem)=>SubTotal+Number(Number(CartItem.price)*Number(CartItem.qty)),0);
    
    return (
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto mt-4">
          <div className="py-2 px-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      qty
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 pr-12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {CartItems.map((item) => (
                    <tr key={item.title}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-1/3 md:w-1/12">
                            <img src={item.url} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-600">{item.author}</div>
                            <div className="text-sm text-gray-500">{item.price}$</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.qty}</div>
                      </td>
                      <td className="px-6 py-4 pr-12 whitespace-nowrap text-center">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.price*item.qty}$
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className='h-16'>
                      <td className='px-6 py-4 whitespace-nowrap text-xl text-red-700'>Total</td>
                      <td></td>
                      <td className='px-6 whitespace-nowrap'>
                        <span className="px-8 py-2 inline-flex text-xl text-center leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {SubTotal}$
                        </span>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SectionItems;
