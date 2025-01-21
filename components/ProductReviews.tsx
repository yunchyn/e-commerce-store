"use client";

import { useEffect, useState } from "react";
import { StarRating } from "./utilities";
import { fetchReviewsByProduct, IReview } from "./dataHandler";

const Review = ({ review }: { review: IReview }) => {
  return (
    <div>
      <div>User</div>
      <StarRating rating={review.rate} />
      <div className="text-body2 font-body text-neutral-5">{review.content}</div>
    </div>
  );
};

export default function ProductReviews({ id }: { id: number }) {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const data = await fetchReviewsByProduct(id);
      setReviews(data);
    }
    fetchReviews();
  }, [id]);

  return (
    <div className="flex flex-col pt-16">
      <div className="pb-6 text-headline6 font-headline">Customer Reviews</div>
      <div className="flex flex-row items-center text-caption2 font-caption gap-3">
        <StarRating rating={5} />
        {reviews.length} Reviews
      </div>
      <textarea
        className="bg-neutral-1 border-2 border-neutral-3 rounded-2xl 
      px-6 py-4 my-10"
      />
      <div>
        {reviews.map((review) => (
          <Review
            review={review}
            key={review.review_id}
          />
        ))}
      </div>
    </div>
  );
}
