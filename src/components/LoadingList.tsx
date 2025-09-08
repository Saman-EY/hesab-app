function LoadingList() {
  return (
    <section className="h-[86dvh] flex flex-col gap-5 my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      {[...Array(6)].map((item, idx) => (
        <div key={idx} className="skeleton h-10 w-full"></div>
      ))}
    </section>
  );
}

export default LoadingList;
