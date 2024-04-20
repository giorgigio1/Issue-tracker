import Pagination from "./components/pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <div>Hello World</div>
      <Pagination
        itemCount={100}
        pageSize={9}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
