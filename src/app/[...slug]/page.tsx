import ClientPage from "@/components/client-page";

export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <ClientPage params={params} />
  );
}
