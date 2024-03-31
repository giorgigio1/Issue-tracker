import { Skeleton } from "@/app/components/index";
import { Box } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <Box className="max-w-lg">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default loading;
