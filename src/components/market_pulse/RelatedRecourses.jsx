import React from 'react';

export default function RelatedRecourses({ data, tag }) {
  return (
    <div class="bg-blue-light border border-gold-light_400 text-link-white rounded-lg mx-auto">
      <div className="flex justify-between pr-8">
        <h1 class="text-4xl font-bold text-gold-light_400 m-8">
          {data?.title || ''}
        </h1>
        <div class="mt-8 flex justify-end">
          <div class="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            <span class="text-blue-dark font-bold">{tag}</span>
          </div>
        </div>
      </div>

      <div className="bg-white w-fit border border-gold-light_400 rounded-e-2xl py-1 px-3">
        <p class="text-lg font-semibold text-gold-light_400">
          by: {data?.author || ''}
        </p>
      </div>
      <p class="mt-4 text-base text-gray-light m-8">
        {data?.shortdescription || ''}
      </p>
    </div>
  );
}
