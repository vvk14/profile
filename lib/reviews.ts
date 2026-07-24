import { getApprovedReviewsFromScript, type ApprovedReview } from "./apps-script";
import { testimonials as fallbackTestimonials } from "@/content/testimonials";

export type { ApprovedReview };

export async function getApprovedReviews(): Promise<ApprovedReview[]> {
  const fromScript = await getApprovedReviewsFromScript();

  if (fromScript && fromScript.length > 0) return fromScript;

  return fallbackTestimonials.map((t) => ({
    name: t.name,
    company: t.role,
    rating: t.rating,
    message: t.quote,
  }));
}
