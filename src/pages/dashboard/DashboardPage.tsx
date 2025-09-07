function DashboardPage() {
  return (
    <section className="columns-1 md:columns-2 lg:columns-3  space-y-5 space-x-2 w-full">
      <DashCard title="بیشترین فروش" />
      <DashCard title="بستانکاران" />
      <DashCard title="بدهکاران" />
      <DashCard title="اشخاص" />
      <DashCard title="بدهکاران" />
      <DashCard title="سود یا ضرر" />
    </section>
  );
}

export default DashboardPage;

const DashCard = ({ title }: { title: string }) => {
  return (
    <div className="border border-gray-300 mx-auto break-inside-avoid rounded-lg hover:shadow transition-all p-4  h-fit">
      <h6 className="text-sm">{title}</h6>

      <div className="w-full bg-gray-200 h-50 rounded-lg mt-2"></div>
    </div>
  );
};
