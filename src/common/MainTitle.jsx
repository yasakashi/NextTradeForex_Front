import React from 'react'

const MainTitle = ({title}) => {
  return (
    <div className="mb-6 md:mb-8 lg:mb-10 flex justify-center">
      <h3 className="text-gold-light_400 font-extrabold text-2xl md:text-3xl lg:text-3xl z-10 capitalize">
        {title}
      </h3>
    </div>
  );
}

export default MainTitle
