const SingleMover = () => {
  return (
    <div className="px-10 h-auto flex items-center justify-center ">
      <div className="border-2 border-gold-light_400 rounded-[35px] w-[235px] h-auto bg-blue-dark text-center px-6 mx-auto my-auto">
        <div>
          <div className="rounded-full overflow-hidden size-[140px] mx-auto mt-4 mb-4">
            <img
              className="overflow-hidden object-cover aspect-square"
              src="/assets/img1.jpg"
              alt="Mover Img"
            />
          </div>

          <h3 className="text-white uppercase text-lg font-semibold mb-4">
            jonesnon rower
          </h3>

          <span className="bg-gold-light_300 px-6 py-2 rounded-full cursor-pointer text-[#030c3b] font-semibold text-[16px] mb-3">
            Trader
          </span>
 
          <p className="text-white text-left text-xs my-3 pb-2 ">
            Lorem ipsum, dolor sit amet elit. Tempora doloribus incidunt aperiam
            ut vero.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleMover;
