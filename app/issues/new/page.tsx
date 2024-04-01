import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssuesForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuesPage = () => {
  return <IssuesForm />;
};

export default NewIssuesPage;
