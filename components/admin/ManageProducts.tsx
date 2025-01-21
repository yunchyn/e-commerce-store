"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "@/supabase";
import { useState } from "react";

type Category = "all rooms" | "living room" | "bedroom" | "kitchen" | "bathroom";

const categories: { id: number; name: Category }[] = [
  { id: 1, name: "living room" },
  { id: 2, name: "bedroom" },
  { id: 3, name: "kitchen" },
  { id: 4, name: "bathroom" },
];

interface IProductInput {
  product_id: number;
  name: string;
  created_at: Date;
  category_id: number;
  price: number;
  is_new: boolean;
  sale_price?: number;
  image: string;
  description?: string;
  colors?: string; // ,로 split하니까 string으로 지정
}

export default function ManageProducts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProductInput>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<IProductInput> = async (data) => {
    setLoading(true);
    setMessage("");

    const { name, category_id, price, is_new, sale_price, image, description, colors } = data;

    let imageUrls: string = "";

    // 파일 업로드
    if (image && image.length > 0) {
      const file = image[0];
      const fileName = `product_${name}_${Date.now()}`;

      try {
        const { data, error } = await supabase.storage.from("products").upload(fileName, file, { upsert: true });

        if (error) throw error;

        const { data: publicUrl } = supabase.storage.from("products").getPublicUrl(fileName);
        imageUrls = publicUrl.publicUrl;

        console.log("Image uploaded successfully:", data);
      } catch (error: any) {
        console.error("Image upload error:", error.message);
      }
    }

    // insert
    try {
      const { data, error } = await supabase
        .from("product")
        .insert([
          {
            name,
            category_id,
            price,
            is_new,
            sale_price: sale_price ? sale_price : null,
            image: imageUrls,
            description,
            colors: colors
              ? colors.split(",").map((color) => color.trim()) // 쉼표로 구분된 문자열을 배열로 변환
              : [],
            created_at: new Date().toISOString(),
          },
        ])
        .select();
      if (error) throw error;
    } catch (error) {
      setMessage(error ? `Insert Error: ${error}` : "Product added successfully!");
    }
    setLoading(false);
    reset(); // Reset the form after successful submission
  };

  return (
    <div className="max-w-[800px] mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      {message && <p className="mb-4">{message}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          {...register("name", { required: "Product name is required" })}
          className="border p-2"
        />
        {errors.name && <p>{errors.name.message}</p>}

        <select
          {...register("category_id", { required: "Category is required" })}
          className="border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category_id && <p>{errors.category_id.message}</p>}

        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: "Price is required" })}
          step="any"
          className="border p-2"
        />
        {errors.price && <p>{errors.price.message}</p>}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("is_new")}
          />
          New Product
        </label>

        <input
          type="number"
          placeholder="Sale Price (optional)"
          {...register("sale_price")}
          step="any"
          className="border p-2"
        />

        {/* 파일 첨부 */}
        <input
          type="file"
          accept="image/*"
          multiple
          {...register("image")}
          className="border p-2"
        />
        {errors.image && <p>{errors.image.message}</p>}

        <textarea
          placeholder="Description"
          {...register("description")}
          className="border p-2"
        ></textarea>

        <input
          type="text"
          placeholder="Colors (comma-separated)"
          {...register("colors")}
          className="border p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-neutral-7 text-white p-2"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
