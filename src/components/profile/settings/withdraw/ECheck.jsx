const ECheck = () => {
  return (
    <form>
      <div className="mb-4 mt-10">
        <label className="text-white text-sm font-semibold">
          Your Physical Address
        </label>
        <input
          type="text"
          name="accountName"
          className="mt-1 w-full p-2 border border-gray-300 rounded"
        />
        <span className="text-sm text-white py-2">
          We will send you an E-Check to this address directly.
        </span>
      </div>

      <button
        type="submit"
        className="bg-gold-light_400 block mt-8 rounded-lg font-semibold text-base shadow-lg text-blue-dark py-2 px-4 w-max"
      >
        Save Withdrawal Account
      </button>
    </form>
  );
};

export default ECheck;
