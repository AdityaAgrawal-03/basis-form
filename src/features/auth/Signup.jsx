export function Signup() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg w-full md:w-1/2 md:p-4 mx-4 p-2">
        <h1 className="text-center text-xl mb-4"> Create Your Basis Account </h1>
        <form className="mt-2">
          <div className="flex flex-col">
            <label htmlFor="firstname" className="font-light">First Name :</label>
            <input
              id="firstname"
              className="p-2 rounded-md focus:ring-green-500 border-2 focus:ring-2 focus:outline-none my-2 text-lg font-thin"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name :</label>
            <input
              id="lastname"
              className="p-2 rounded-md focus:ring-green-500 border-2 focus:ring-2 focus:outline-none my-2 text-lg font-thin"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone :</label>
            <input
              id="phone"
              className="p-2 rounded-md focus:ring-green-500 border-2 focus:ring-2 focus:outline-none my-2 text-lg font-thin"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="referralCode">
              Referral <span className="font-thin"> (Optional) : </span>
            </label>
            <input
              id="referralCode"
              className="p-2 rounded-md focus:ring-green-500 border-2 focus:ring-2 focus:outline-none my-2 text-lg font-thin"
              type="text"
              maxLength="6"
            />
          </div>
          <button className="uppercase bg-basis w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600">Signup</button>
        </form>
      </div>
    </div>
  );
}
