import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssuesForm from "../../_components/IssueForm";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssuesForm issue={issue} />;
};

export default EditIssuePage;
