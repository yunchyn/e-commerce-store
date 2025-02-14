import { IMember } from "@/app/auth/page";
import { UserSession } from "@/store/sessionSlice";
import { useForm } from "react-hook-form";
import { fetchMemberById, fetchShippingAddressByMemberId, updateMember, upsertShippingAddress } from "../dataHandler";
import { useEffect } from "react";

export interface IShippingAddress {
  recipient_name: string;
  phone: string;
  address: string;
  address_detail?: string;
  postal_code: string;
}

interface IFormData extends IShippingAddress, IMember {}

export default function AccountDetail({ userSession }: { userSession: UserSession }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  useEffect(() => {
    async function loadMemberAndShippingAddress() {
      const [memberData, addressData] = await Promise.all([
        fetchMemberById(userSession.userId),
        fetchShippingAddressByMemberId(userSession.userId),
      ]);

      if (memberData) {
        Object.entries(memberData).forEach(([key, value]) => {
          setValue(key as keyof IFormData, value);
        });
      }

      if (addressData) {
        Object.entries(addressData).forEach(([key, value]) => {
          setValue(key as keyof IFormData, value);
        });
      }
    }
    loadMemberAndShippingAddress();
  }, [userSession.userId, setValue]);

  const onSubmit = async (data: IFormData) => {
    try {
      // 회원 정보 업데이트
      await updateMember(userSession.userId, {
        name: data.name,
        email: data.email,
      });

      // 배송지 정보 업데이트
      await upsertShippingAddress(userSession.userId, data);

      alert("Member and shipping address saved successfully.");
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* 회원정보 */}
      <div className="text-body1Semi font-[32px]">Account Detail</div>
      <div>
        <p className="text-hairline2 font-hairline text-neutral-4">NAME *</p>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="text-body2 font-body text-neutral-4
            w-full rounded-md border border-neutral-4 pl-4 py-1 my-3"
        />
      </div>
      <div>
        <p className="text-hairline2 font-hairline text-neutral-4">EMAIL *</p>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="text-body2 font-body text-neutral-4
            w-full rounded-md border border-neutral-4 pl-4 py-1 my-3"
        />
      </div>

      {/* 배송지정보 */}
      <div className="text-body1Semi font-[32px]">Address Setting</div>
      <div>
        <p className="text-hairline2 font-hairline text-neutral-4">RECIPENT NAME *</p>
        <input
          {...register("recipient_name")}
          type="text"
          placeholder="Recipent name"
          className="text-body2 font-body text-neutral-4
            w-full rounded-md border border-neutral-4 pl-4 py-1 my-3"
        />
      </div>
      <div>
        <p className="text-hairline2 font-hairline text-neutral-4">PHONE *</p>
        <input
          {...register("phone")}
          type="text"
          placeholder="Phone"
          className="text-body2 font-body text-neutral-4
            w-full rounded-md border border-neutral-4 pl-4 py-1 my-3"
        />
      </div>
      <div>
        <p className="text-hairline2 font-hairline text-neutral-4">ADDRESS *</p>
        <input
          {...register("address")}
          type="text"
          placeholder="Address"
          className="text-body2 font-body text-neutral-4
            w-full rounded-md border border-neutral-4 pl-4 py-1 my-3"
        />
      </div>
      <div>
        <p className="text-hairline2 font-hairline text-neutral-4">ADDRESS DETAIL</p>
        <input
          {...register("address_detail")}
          type="text"
          placeholder="Address detail"
          className="text-body2 font-body text-neutral-4
            w-full rounded-md border border-neutral-4 pl-4 py-1 my-3"
        />
      </div>
      <div>
        <p className="text-hairline2 font-hairline text-neutral-4">POSTAL CODE *</p>
        <input
          {...register("postal_code")}
          type="text"
          placeholder="Postal code"
          className="text-body2 font-body text-neutral-4
            w-full rounded-md border border-neutral-4 pl-4 py-1 my-3"
        />
      </div>
      <button
        className="bg-neutral-7 text-white font-button text-buttonS rounded-md px-10 py-3"
        type="submit"
      >
        Save changes
      </button>
    </form>
  );
}
