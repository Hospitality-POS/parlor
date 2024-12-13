import { useQueryClient } from "@tanstack/react-query";

function InvalidateQueries() {
  const queryClient = useQueryClient();

  function invalidate(props?: { queryKey: string[] }) {
    queryClient.invalidateQueries();
  }

  return invalidate;
}

export default InvalidateQueries;