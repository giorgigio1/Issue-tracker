import Pagination from "./components/pagination";

export default function Home() {
  return (
    <>
      <div>Hello World</div>
      <Pagination itemCount={100} pageSize={9} currentPage={10} />
    </>
  );
}
