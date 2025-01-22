"use client";

import { useEffect, useState } from "react";
import { StarRating } from "./utilities";
import { fetchReviewsByProduct, IReview } from "./dataHandler";
import { supabase } from "@/supabase";

const Review = ({ review }: { review: IReview }) => {
  return (
    <div className="flex flex-row gap-10 pb-10 border-b border-neutral-3">
      <div
        className="w-[72px] h-[72px] bg-neutral-5 rounded-full
      flex-shrink-0"
      >
        {review.member_id.profile_pic && (
          <img
            src={review.member_id.profile_pic}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-body1Semi font-body-semi">{review.member_id.name}</div>
        <StarRating rating={review.rate} />
        <div className="text-body2 font-body text-neutral-5">{review.content}</div>
      </div>
    </div>
  );
};

const SelectRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
  const handleClick = (index: number) => {
    setRating(index); // 1부터 5까지의 별점 설정
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`cursor-pointer ${rating >= index ? "text-yellow-500" : "text-neutral-4"}`}
          onClick={() => handleClick(index)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.3879 2.08514C7.6195 1.54844 8.38051 1.54844 8.61211 2.08514L10.0655 5.45307C10.1635 5.68032 10.3794 5.83454 10.6262 5.85361L14.3533 6.14161C14.9513 6.18781 15.1889 6.93852 14.7264 7.32038L11.9235 9.63456C11.7258 9.79779 11.6392 10.0599 11.7008 10.3088L12.5634 13.7944C12.7053 14.3676 12.0869 14.8286 11.578 14.529L8.33822 12.6217C8.12949 12.4988 7.87053 12.4988 7.66179 12.6217L4.42197 14.529C3.9131 14.8286 3.29475 14.3676 3.43661 13.7944L4.29924 10.3088C4.36083 10.0599 4.27425 9.79779 4.07654 9.63456L1.27362 7.32038C0.811112 6.93852 1.04872 6.18781 1.64671 6.14161L5.37381 5.85361C5.62058 5.83454 5.83648 5.68032 5.93455 5.45307L7.3879 2.08514Z"
              fill={rating >= index ? "#141718" : "none"}
              stroke={rating >= index ? "none" : "#141718"}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default function ProductReviews({ id }: { id: number }) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      const data = await fetchReviewsByProduct(id);
      console.log(data);
      setReviews(data);
    }

    fetchReviews();
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    } else if (content === "") {
      setError("Please write your review.");
      return;
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      alert("Please Login.");
      return;
    }
    const userId = data.user.id;

    // 리뷰 추가
    const { data: newReview, error: insertError } = await supabase
      .from("review")
      .insert({
        member_id: userId,
        product_id: id,
        rate: rating,
        content: content,
      })
      .select()
      .single(); // 새로 추가된 리뷰 데이터를 가져옴

    if (insertError) {
      alert("리뷰 등록 실패.");
      console.log(insertError);
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from("member")
      .select("name, profile_pic")
      .eq("member_id", userId)
      .single();

    if (userError) {
      // 오류 발생 시 추가된 리뷰 삭제
      await supabase.from("review").delete().eq("review_id", newReview.review_id);
      console.log(userError);
      return;
    }

    // 새 리뷰와 사용자 정보를 합쳐서 리뷰 리스트 업데이트
    const updatedReview = { ...newReview, member_id: userData };
    setReviews((prevReviews) => [updatedReview, ...prevReviews]);
    setContent("");
    setRating(0);
    setError("");
  };

  return (
    <div className="flex flex-col pt-16">
      <div className="text-headline6 font-headline">Customer Reviews</div>

      {/* 리뷰작성란 */}
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col my-10"
      >
        <div className="pl-[3px] pb-5">
          <SelectRating
            rating={rating}
            setRating={setRating}
          />
        </div>
        <div className="relative w-full flex flex-col">
          <textarea
            className="bg-neutral-1 border-2 border-neutral-3 rounded-2xl px-6 py-4 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your review here."
          />
          <input
            type="submit"
            value="Write Review"
            className="absolute bottom-5 right-5 cursor-pointer bg-neutral-7 
            text-white text-buttonS font-button px-10 py-2 rounded-[80px]"
          />
        </div>
        <p className="pt-2 pl-[3px]">{error}</p>
      </form>

      {/* 정렬기준 추가예정 */}
      <div className="text-headline6 font-headline pb-10">{reviews.length} Reviews</div>
      <div className="flex flex-col gap-6">
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
