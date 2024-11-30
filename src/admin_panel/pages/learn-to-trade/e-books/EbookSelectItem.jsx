


const EbookSelectItem = ({item}) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
      <div className="flex flex-col">
        <h5 className="text-[14px] text-[#33373a] font-semibold">3D or 2D</h5>

        <p className="text-[#999] text-xs">
          Choose the mode of display. WebGL for realistic 3d
        </p>
      </div>
      <div>
        <select className="w-[160px] text-base text-[#2c3338] border border-gray-600 py-[6px] pl-2 bg-transparent rounded-sm outline-[#0295d0]">
          <option>Global Setting</option>
          <option>WebGL 3D</option>
          <option>CSS 3D/2D</option>
        </select>
      </div>
    </div>
  );
}