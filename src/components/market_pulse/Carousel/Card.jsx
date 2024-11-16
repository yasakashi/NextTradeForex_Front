import React from 'react';
import { Link } from 'react-router-dom';

export default function CarouselCard({ data }) {
  return (
    <div className="w-[300px]  bg-gray-light_100 text-white rounded-xl ">
      <div className=" rounded-t-xl overflow-hidden">
        <div className="relative p-3">
          <img
            src={
              data?.photofileurl
                ?"https://api.yasakashi.ir/api"+ data.photofileurl
                : '/dist/assets/Market-Sentiments.png'
            }
            alt="EUR/USD"
            className="w-full h-48 object-cover rounded-lg"
          />

          <div className="absolute top-6 right-3 bg-white text-gold-light_400 border border-gold-light_400 rounded-e-xl font-semibold px-3 py-1 rounded-full">
            {data?.categoryname ? data?.categoryname : 'Course'}
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <Link to={`/market-pulse/${data?.id}`}>
          <h2 className="text-xl font-bold text-gold-light_400">
            {data?.title}
          </h2>
        </Link>
      </div>
    </div>
  );
}
