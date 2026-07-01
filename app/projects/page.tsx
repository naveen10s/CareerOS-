import { redirect } from "next/navigation";

// /projects redirects to /product-lab where the full interactive case study lab lives
export default function ProjectsPage() {
  redirect("/product-lab");
}
