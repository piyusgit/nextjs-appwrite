/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-3xl">
        Profile Page{" "}
        <span className="p-2 border bg-orange-500 border-orange-300 rounded-lg mb-4 focus:outline-none focus:border-orange-600 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
