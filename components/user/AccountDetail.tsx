import { IMember } from "@/app/auth/page";
import { useForm } from "react-hook-form";

export interface IAddress {
  recipient_name: string;
  phone: string;
  address: string;
  address_detail?: string;
  postal_code: string;
}

interface IFormData extends IAddress, IMember {}

export default function AccountDetail() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  return (
    <div className="flex flex-col gap-6">
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
    </div>
  );
}
