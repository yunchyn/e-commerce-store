"use client";

import { useEffect, useRef, useState } from "react";
import { StarRating } from "../utilities";
import { fetchReviewsByProduct, IReview } from "../dataHandler";
import { supabase } from "@/supabase";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Review = ({ review }: { review: IReview }) => {
  return (
    <div
      className="border-b border-neutral-3
    max-sm:flex-col max-sm:pb-10"
    >
      <div
        className="flex flex-row gap-10 pb-10
      max-sm:gap-4 max-sm:pb-4"
      >
        <div
          className="w-[72px] h-[72px] bg-neutral-5 rounded-full
      flex-shrink-0 flex"
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
          <div className="text-body2 font-body text-neutral-5 max-sm:hidden">{review.content}</div>
        </div>
      </div>
      <div className="text-body2 font-body text-neutral-5 hidden max-sm:block">{review.content}</div>
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

export default function ProductReviews({ id: productId }: { id: number }) {
  const userSession = useSelector((state: RootState) => state.session);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    // Textarea 높이 조절
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    async function fetchReviews() {
      console.log("pId: ", productId);
      const data = await fetchReviewsByProduct(productId);
      console.log(data);
      setReviews(data);
    }

    fetchReviews();
  }, [productId]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    } else if (content.trim() === "") {
      setError("Please write your review.");
      return;
    } else if (content.length > 450) {
      setError("Review cannot exceed 450 characters.");
      return;
    }

    setIsLoading(true);
    if (userSession.userId === "") {
      alert("Please Login.");
      return;
    }
    const userId = userSession.userId;

    // 리뷰 추가
    const { data: newReview, error: insertError } = await supabase
      .from("review")
      .insert({
        member_id: userId,
        product_id: productId,
        rate: rating,
        content: content,
      })
      .select()
      .single(); // 새로 추가된 리뷰 데이터를 가져옴

    if (insertError) {
      alert("Failed to submit review.");
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
    setIsLoading(false);

    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
    }
  };

  return (
    <div className="flex flex-col pt-16 pb-20">
      <div
        className="text-headline6 font-headline
      max-sm:text-headline7"
      >
        Customer Reviews
      </div>

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
            className="bg-neutral-1 border-2 border-neutral-3 rounded-2xl px-6 py-4 resize-none pr-52 font-caption
            overflow-y-hidden
            max-sm:text-caption1 max-sm:pr-14"
            ref={textAreaRef}
            onChange={handleChange}
            value={content}
            placeholder="Write your review here."
          />
          <button
            type="submit"
            className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer bg-neutral-7 
          text-white text-buttonS font-button px-10 py-2 rounded-[80px]
            max-sm:p-1 max-sm:right-4"
          >
            <span className="max-sm:hidden">{isLoading ? "Loading..." : "Write Review"}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden max-sm:block"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0909 7.26521C14.4968 6.8906 15.1294 6.9159 15.504 7.32172L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7276 14.0344 14.3217L15.716 12.5L6 12.5C5.44771 12.5 5 12.0523 5 11.5C5 10.9477 5.44771 10.5 6 10.5L15.716 10.5L14.0344 8.67829C13.6598 8.27247 13.6851 7.63981 14.0909 7.26521Z"
                fill="#FEFEFE"
              />
            </svg>
          </button>
        </div>
        <p
          className="pt-2 pl-[3px] font-caption
        max-sm:text-caption1"
        >
          {error}
        </p>
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
