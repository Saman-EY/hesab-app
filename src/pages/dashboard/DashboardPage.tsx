function DashboardPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
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
    <div className="border border-gray-300 mx-auto w-full rounded-lg hover:shadow transition-all p-4 ">
      <h6 className="text-sm">{title}</h6>

      <div className="w-full bg-gray-200 h-50 rounded-lg mt-2"></div>
    </div>
  );
};
